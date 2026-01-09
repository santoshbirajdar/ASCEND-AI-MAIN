import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// UI Components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Sparkles } from 'lucide-react';

// New AI Plan Component
import AIStudyPlan from '../components/dashboard/AIStudyPlan';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Fetch User on Load
    useEffect(() => {
        async function getUser() {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        }
        getUser();
    }, []);

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
                    
                    <Link to="/aic oach">
                        <Button variant="outline" className="border-indigo-500/50 text-indigo-300 hover:bg-indigo-500/10">
                            <Sparkles className="w-4 h-4 mr-2" /> Ask AI Coach
                        </Button>
                    </Link>
                </motion.div>

                {/* 2. Main Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: AI Study Plans (The new feature!) */}
                    <div className="lg:col-span-2 space-y-8">
                        <AIStudyPlan user={user} />
                    </div>

                    {/* RIGHT COLUMN: Quick Actions & Stats */}
                    <div className="space-y-6">
                        
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