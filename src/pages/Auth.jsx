import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { createPageUrl } from '@/lib/utils'; // Keep this if you need it elsewhere
import { supabase } from "../lib/supabaseClient"; // Make sure this path points to where you created the file
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming you have this, otherwise standard <input> works
import { Sparkles, ArrowLeft, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Auth() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Check if user is already logged in
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) navigate('/dashboard'); // Update this path to where you want them to go
        });
    }, [navigate]);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { 
                    // Make sure this matches your URL (localhost:5173 for Vite)
                    redirectTo: `${window.location.origin}/dashboard` 
                }
            });
            if (error) throw error;
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            alert(error.message);
        } else {
            navigate('/dashboard'); // Redirect to your custom app/dashboard
        }
        setLoading(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({ 
            email, 
            password,
            options: { emailRedirectTo: `${window.location.origin}/dashboard` }
        });
        
        if (error) alert(error.message);
        else alert('Success! Check your email for the confirmation link.');
        setLoading(false);
    };

    const handleBack = () => { navigate('/'); };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
            <Button variant="ghost" onClick={handleBack} className="absolute top-6 left-6 text-slate-400 hover:text-white z-20">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* LEFT SIDE TEXT */}
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block">
                    <h1 className="text-5xl font-bold text-white mb-6">Transform Your <br /><span className="text-indigo-400">Career Journey</span></h1>
                    <p className="text-slate-400 text-lg mb-8">Join thousands of students who've landed their dream jobs.</p>
                </motion.div>

                {/* RIGHT SIDE CARD */}
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}>
                    <Card className="p-10 bg-slate-900/80 backdrop-blur-xl border-slate-800 shadow-2xl">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-white mb-3">Ready to Start?</h2>
                            <p className="text-slate-400">Sign in to continue your journey</p>
                        </div>

                        {/* GOOGLE BUTTON */}
                        <Button onClick={handleGoogleLogin} disabled={loading} variant="outline" className="w-full bg-white text-black hover:bg-gray-200 mb-6 py-6 text-md border-0">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-2" alt="Google" />
                            Sign in with Google
                        </Button>

                        <div className="flex items-center mb-6">
                            <div className="flex-grow border-t border-gray-700"></div>
                            <span className="px-4 text-gray-500 text-sm">OR EMAIL</span>
                            <div className="flex-grow border-t border-gray-700"></div>
                        </div>

                        {/* EMAIL FORM */}
                        <form className="space-y-4">
                            <input 
                                type="email" 
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input 
                                type="password" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <div className="flex gap-3 mt-4">
                                <Button onClick={handleEmailLogin} disabled={loading} className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-6">
                                    Sign In
                                </Button>
                                <Button onClick={handleSignUp} disabled={loading} variant="outline" className="flex-1 border-indigo-600 text-indigo-400 hover:bg-indigo-950 py-6">
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}