import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ✅ AZURE SERVICE IMPORTS
// We import the specific functions to handle the "Upload -> Parse -> Analyze" pipeline
import { uploadResumeToAzure, parseResumeWithDocIntel, extractSkillsFromText } from '../services/azureServices';

// UI Components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Sparkles, Upload, BrainCircuit, Loader2, FileText } from 'lucide-react';

// New AI Plan Component
import AIStudyPlan from '../components/dashboard/AIStudyPlan';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ NEW STATE: For Azure Resume Analysis
    const [uploading, setUploading] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    // 1. Fetch User on Load
    useEffect(() => {
        async function getUser() {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        }
        getUser();
    }, []);

    // ✅ NEW HANDLER: Connects Blob Storage + Doc Intel + AI Language
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setAnalysis(null); // Reset previous results

        try {
            // Step 1: Upload PDF to Azure Blob Storage
            console.log("Uploading to Azure Blob...");
            const blobUrl = await uploadResumeToAzure(file);
            
            // Step 2: Parse text using Azure Document Intelligence
            console.log("Parsing PDF with Document Intelligence...");
            const rawText = await parseResumeWithDocIntel(blobUrl);
            
            // Step 3: Extract Skills using Azure AI Language
            console.log("Analyzing Text with AI Language...");
            const result = await extractSkillsFromText(rawText);
            
            setAnalysis(result);
            alert(`Success! Azure found ${result.skills.length} skills in your resume.`);
            
        } catch (err) {
            console.error("Azure Pipeline Error:", err);
            alert("Analysis failed. Check console for details. (Make sure your Resume is a PDF)");
        } finally {
            setUploading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
    if (!user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Please Log In</div>;

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                
                {/* 1. Welcome Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Welcome back, {user.email?.split('@')[0]}! 👋
                        </h1>
                        <p className="text-slate-400">
                            Track your progress and achieve your career goals.
                        </p>
                    </div>
                    
                    <Link to="/aicoach">
                        <Button variant="outline" className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10">
                            <Sparkles className="w-4 h-4 mr-2" /> Ask AI Coach
                        </Button>
                    </Link>
                </motion.div>

                {/* 2. Main Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: AI Study Plans */}
                    <div className="lg:col-span-2 space-y-8">
                        <AIStudyPlan user={user} />
                    </div>

                    {/* RIGHT COLUMN: Quick Actions & Stats */}
                    <div className="space-y-6">
                        
                        {/* ✅ NEW: Azure AI Profile Booster Card */}
                        <Card className="p-6 bg-slate-900 border-slate-800 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                                <BrainCircuit className="w-24 h-24 text-blue-500" />
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center relative z-10">
                                <BrainCircuit className="w-5 h-5 mr-2 text-blue-400"/> AI Profile Booster
                            </h3>
                            
                            <div className="space-y-4 relative z-10">
                                {/* Upload Box */}
                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:bg-slate-800/50 transition cursor-pointer">
                                    <input 
                                        type="file" 
                                        accept=".pdf"
                                        onChange={handleFileUpload} 
                                        className="hidden" 
                                        id="resume-upload" 
                                        disabled={uploading}
                                    />
                                    <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center w-full h-full">
                                        {uploading ? (
                                            <div className="animate-pulse flex flex-col items-center">
                                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2"/>
                                                <span className="text-sm text-blue-400">Analyzing with Azure AI...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-slate-400 mb-2"/>
                                                <span className="text-sm text-slate-300">Upload Resume (PDF)</span>
                                                <span className="text-xs text-slate-500 mt-1">Scanned by Azure Doc Intelligence</span>
                                            </>
                                        )}
                                    </label>
                                </div>

                                {/* Results Box */}
                                {analysis && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-blue-950/30 border border-blue-900/50 p-4 rounded text-sm"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-blue-300 font-bold flex items-center">
                                                <Sparkles className="w-3 h-3 mr-1"/> AI Insights
                                            </p>
                                            <span className={`text-xs px-2 py-0.5 rounded ${
                                                analysis.tone === 'positive' ? 'bg-green-500/20 text-green-300' : 'bg-slate-700 text-slate-300'
                                            }`}>
                                                Tone: {analysis.tone.toUpperCase()}
                                            </span>
                                        </div>
                                        
                                        <p className="text-slate-400 text-xs mb-1">Top Detected Skills:</p>
                                        <div className="flex flex-wrap gap-1">
                                            {analysis.skills.slice(0, 5).map((skill, i) => (
                                                <span key={i} className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded text-xs border border-blue-800/50">
                                                    {skill}
                                                </span>
                                            ))}
                                            {analysis.skills.length > 5 && (
                                                <span className="px-2 py-1 text-slate-500 text-xs">
                                                    +{analysis.skills.length - 5} more
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </Card>

                        {/* Explore Careers Card */}
                        <Card className="p-6 bg-gradient-to-br from-indigo-900/50 to-slate-900 border-indigo-500/30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <Target className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Explore Paths</h3>
                            </div>
                            <p className="text-slate-400 text-sm mb-6">
                                Not sure where to start? Browse our curated roadmaps for Cloud, AI, and Dev roles.
                            </p>
                            <Link to="/careerpaths">
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                    View Career Paths <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </Card>

                        {/* Interview Prep Card */}
                        <Card className="p-6 bg-slate-900/50 border-slate-800">
                            <h3 className="font-bold text-white mb-2">Interview Prep</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Practice with AI-generated questions tailored to your target role.
                            </p>
                            <Link to="/interviewprep">
                                <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                                    Start Practice
                                </Button>
                            </Link>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
}