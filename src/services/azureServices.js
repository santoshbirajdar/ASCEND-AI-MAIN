import { BlobServiceClient } from "@azure/storage-blob";
import { TextAnalysisClient, AzureKeyCredential as TextKeyCredential } from "@azure/ai-language-text";
import { DocumentAnalysisClient, AzureKeyCredential as FormKeyCredential } from "@azure/ai-form-recognizer";
import ContentSafetyClient, { isUnexpected } from "@azure-rest/ai-content-safety";

// --- CONFIGURATION ---
const creds = {
    blobSas: import.meta.env.VITE_AZURE_BLOB_SAS_URL,
    container: import.meta.env.VITE_AZURE_BLOB_CONTAINER,
    langEndpoint: import.meta.env.VITE_AZURE_LANGUAGE_ENDPOINT,
    langKey: import.meta.env.VITE_AZURE_LANGUAGE_KEY,
    docEndpoint: import.meta.env.VITE_AZURE_DOC_INTEL_ENDPOINT,
    docKey: import.meta.env.VITE_AZURE_DOC_INTEL_KEY,
    safetyEndpoint: import.meta.env.VITE_AZURE_CONTENT_SAFETY_ENDPOINT,
    safetyKey: import.meta.env.VITE_AZURE_CONTENT_SAFETY_KEY
};

// 1️⃣ AZURE BLOB STORAGE (Upload Resume)
export const uploadResumeToAzure = async (file) => {
    try {
        const blobServiceClient = new BlobServiceClient(creds.blobSas);
        const containerClient = blobServiceClient.getContainerClient(creds.container);
        const blobName = `resume-${Date.now()}-${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadData(file, { blobContentType: file.type });
        return blockBlobClient.url; 
    } catch (error) {
        console.error("Blob Upload Error:", error);
        throw new Error("Failed to upload resume.");
    }
};

// 2️⃣ AZURE CONTENT SAFETY (Protect the App)
export const checkContentSafety = async (text) => {
    try {
        const client = ContentSafetyClient(creds.safetyEndpoint, { key: creds.safetyKey });
        const result = await client.path("/text:analyze").post({
            body: { text: text, categories: ["Hate", "SelfHarm", "Sexual", "Violence"] }
        });

        if (isUnexpected(result)) throw result;

        const unsafe = result.body.categoriesAnalysis.some(c => c.severity > 0); 
        return { safe: !unsafe, details: result.body.categoriesAnalysis };
    } catch (error) {
        console.error("Content Safety Error:", error);
        return { safe: true }; 
    }
};

// 3️⃣ AZURE DOCUMENT INTELLIGENCE (Parse PDF/Images)
export const parseResumeWithDocIntel = async (fileUrl) => {
    try {
        // ✅ FIX: Use the correct Client Class
        const client = new DocumentAnalysisClient(creds.docEndpoint, new FormKeyCredential(creds.docKey));
        
        // ✅ FIX: Use the correct method for URLs (Model ID: "prebuilt-read")
        const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-read", fileUrl);
        const result = await poller.pollUntilDone();

        // Combine all pages and lines into one text string
        if (!result.content) return "";
        return result.content;
    } catch (error) {
        console.error("Doc Intelligence Error:", error);
        throw new Error("Could not read document. Ensure your Blob container allows public access or use a SAS URL.");
    }
};

// 4️⃣ AZURE AI LANGUAGE (Extract Skills from Parsed Text)
export const extractSkillsFromText = async (text) => {
    try {
        const client = new TextAnalysisClient(creds.langEndpoint, new TextKeyCredential(creds.langKey));
        
        // Limit text length if it's too huge (Azure limit is ~5000 chars per document usually)
        const safeText = text.substring(0, 5000);

        const keyPhrases = await client.analyze("KeyPhraseExtraction", [safeText]);
        const sentiment = await client.analyze("SentimentAnalysis", [safeText]);

        return {
            skills: keyPhrases[0].keyPhrases || [],
            tone: sentiment[0].sentiment || 'neutral'
        };
    } catch (error) {
        console.error("AI Language Error:", error);
        return { skills: ["Could not extract skills"], tone: 'neutral' };
    }
};