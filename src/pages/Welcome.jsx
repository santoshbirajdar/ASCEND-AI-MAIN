import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Bot, User, Send, Brain, Target, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Welcome() {
    const navigate = useNavigate();
    const [demoState, setDemoState] = useState(0); // 0: Idle, 1: User Typing, 2: AI Thinking, 3: AI Typing, 4: Done

    // Animation Loop for the AI Demo
    useEffect(() => {
        const sequence = async () => {
            // Wait a bit, then start user typing
            await new Promise(r => setTimeout(r, 1500));
            setDemoState(1); 
            // Simulate User Typing finished
            await new Promise(r => setTimeout(r, 2000));
            setDemoState(2); // AI Thinking
            // AI Done thinking, start typing
            await new Promise(r => setTimeout(r, 1500));
            setDemoState(3); 
            // Finished
            await new Promise(r => setTimeout(r, 3000));
            setDemoState(4);
            // Reset loop
            await new Promise(r => setTimeout(r, 4000));
            setDemoState(0);
        };
        sequence();
    }, [demoState === 0]); // Re-run when state hits 0 (reset)

    const handleGetStarted = () => {
        navigate(createPageUrl('Auth'));
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            {/* Navbar Placeholder (Just for visual balance) */}
            <div className="relative z-20 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-white text-xl">CareerLaunch</span>
                </div>
                <Button onClick={handleGetStarted} variant="ghost" className="text-slate-300 hover:text-white">Sign In</Button>
            </div>

            {/* Main Hero Content */}
            <div className="flex-1 flex items-center relative z-10">
                <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* LEFT COLUMN: Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span>
                            <span className="text-xs font-medium text-indigo-300">New: AI Career Coach 2.0</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Your Personal <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                AI Career Architect
                            </span>
                        </h1>
                        
                        <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                            Stop guessing. Get a personalized roadmap, instant interview feedback, and skill analysis—powered by Microsoft Azure AI.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button onClick={handleGetStarted} size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/25">
                                <Sparkles className="mr-2 w-5 h-5" />
                                Try AI Coach Free
                            </Button>
                            <Button onClick={handleGetStarted} variant="outline" size="lg" className="h-14 px-8 text-lg border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl">
                                Explore Paths
                            </Button>
                        </div>

                        <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <Brain className="w-4 h-4 text-indigo-400" /> <span>Real-time Analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-emerald-400" /> <span>Custom Roadmaps</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: The AI Demo Visual */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Glowing Backdrop */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-2xl opacity-20 transform rotate-3" />
                        
                        {/* Chat Interface Card */}
                        <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                            
                            {/* Window Header */}
                            <div className="bg-slate-800/50 border-b border-slate-700 p-4 flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                                </div>
                                <div className="text-xs text-slate-400 font-mono ml-2">CareerCoach_AI_Agent.exe</div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 p-6 space-y-6 font-mono text-sm">
                                
                                {/* AI Greeting (Always visible) */}
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-slate-800 p-3 rounded-r-xl rounded-bl-xl text-slate-200">
                                        Hello! I analyzed your profile. You're aiming for <strong>Frontend Developer</strong> at a top tech firm. Ready to start your prep?
                                    </div>
                                </div>

                                {/* User Message (Animated) */}
                                <AnimatePresence>
                                    {demoState >= 1 && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-4 flex-row-reverse"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center shrink-0">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="bg-indigo-600 p-3 rounded-l-xl rounded-br-xl text-white">
                                                {demoState === 1 ? (
                                                    <span className="animate-pulse">|</span> // Typing cursor
                                                ) : (
                                                    "Yes! What specific React skills should I focus on for 2026?"
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* AI Response (Animated) */}
                                <AnimatePresence>
                                    {demoState >= 2 && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-4"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="bg-slate-800 p-3 rounded-r-xl rounded-bl-xl text-slate-200 w-full">
                                                {demoState === 2 ? (
                                                    <div className="flex gap-1 h-5 items-center">
                                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}/>
                                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}/>
                                                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}/>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        Based on current market trends, focus on:
                                                        <ul className="list-disc ml-4 mt-2 space-y-1 text-indigo-300">
                                                            <li>Next.js 15 Server Components</li>
                                                            <li>React Suspense & Streaming</li>
                                                            <li>Advanced State (Zustand/Jotai)</li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Input Area Simulator */}
                            <div className="p-4 border-t border-slate-700 bg-slate-800/30">
                                <div className="flex gap-2">
                                    <div className="flex-1 h-10 bg-slate-900 rounded-lg border border-slate-600 flex items-center px-3 text-slate-500 text-sm">
                                        Ask me anything about your career...
                                    </div>
                                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                        <Send className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-8 top-20 bg-emerald-500 text-white p-3 rounded-lg shadow-xl flex items-center gap-3 z-10"
                        >
                            <div className="bg-white/20 p-1.5 rounded">
                                <Rocket className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-xs font-bold opacity-80">Success Rate</div>
                                <div className="font-bold">94% Hired</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
