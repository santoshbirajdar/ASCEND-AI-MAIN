import { createClient } from '@supabase/supabase-js';
import { careerPaths, interviewQuestions } from './mockData';

// 1. Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const isLive = () => !!supabase;

// --- LOCAL STORAGE HELPERS (FOR DEMO MODE) ---
const LOCAL_DB_KEY = 'cl_local_db_v1';
const getLocalDB = () => {
    const data = localStorage.getItem(LOCAL_DB_KEY);
    return data ? JSON.parse(data) : { progress: [] };
};
const saveLocalDB = (data) => localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(data));

export const base44 = {
    auth: {
        me: async () => {
            if (!isLive()) return JSON.parse(localStorage.getItem('cl_user'));
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return null;
            return {
                id: session.user.id,
                email: session.user.email,
                full_name: session.user.user_metadata?.full_name || session.user.email.split('@')[0]
            };
        },
        login: async (email) => {
            if (!isLive()) {
                const user = { email, full_name: 'Demo User', id: '123' };
                localStorage.setItem('cl_user', JSON.stringify(user));
                window.location.href = '/dashboard';
                return;
            }
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;
            alert('Check your email for the login link!');
        },
        logout: async () => {
            if (isLive()) await supabase.auth.signOut();
            localStorage.removeItem('cl_user');
            window.location.href = '/auth';
        },
        redirectToLogin: () => {
            window.location.href = '/auth';
        }
    },
    entities: {
        CareerPath: {
            list: async () => careerPaths,
            filter: async ({ id }) => careerPaths.filter(c => c.id === id)
        },
        InterviewQuestion: {
            list: async () => interviewQuestions
        },
        UserProgress: {
            filter: async ({ user_email }) => {
                if (!isLive()) {
                    // Return from Local Storage
                    const db = getLocalDB();
                    return db.progress.filter(p => p.user_email === user_email) || [];
                }
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return [];
                const { data, error } = await supabase.from('user_progress').select('*').eq('user_id', user.id);
                return data || [];
            },
            create: async (data) => {
                if (!isLive()) {
                    // Save to Local Storage
                    const db = getLocalDB();
                    const newEntry = { ...data, id: 'prog_' + Date.now() }; // Fake ID
                    db.progress.push(newEntry);
                    saveLocalDB(db);
                    return newEntry;
                }
                const { data: { user } } = await supabase.auth.getUser();
                const realData = { ...data, user_id: user.id, user_email: user.email };
                const { data: result, error } = await supabase.from('user_progress').insert([realData]).select();
                if (error) throw error;
                return result[0];
            },
            update: async (id, data) => {
                if (!isLive()) {
                    // Update Local Storage
                    const db = getLocalDB();
                    const index = db.progress.findIndex(p => p.id === id);
                    if (index !== -1) {
                        db.progress[index] = { ...db.progress[index], ...data };
                        saveLocalDB(db);
                        return db.progress[index];
                    }
                    return null;
                }
                const { data: result, error } = await supabase.from('user_progress').update(data).eq('id', id).select();
                if (error) throw error;
                return result[0];
            }
        }
    },
    integrations: {
        Core: {
            InvokeLLM: async ({ prompt }) => {
                const azureKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
                const azureEndpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;

                if (!azureKey || !azureEndpoint) {
                    await new Promise(r => setTimeout(r, 1500));
                    return "## Simulated AI Response\n\nI am running in **Demo Mode** because Azure Keys are missing.\n\nTo make me real, add your Azure OpenAI keys to .env.local.";
                }

                try {
                    const url = azureEndpoint + '/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-05-15';
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'api-key': azureKey },
                        body: JSON.stringify({
                            messages: [
                                { role: "system", content: "You are a helpful career coach." },
                                { role: "user", content: prompt }
                            ],
                            max_tokens: 800
                        })
                    });
                    const data = await response.json();
                    return data.choices[0].message.content;
                } catch (error) {
                    return "Error connecting to Azure AI.";
                }
            }
        }
    }
};
