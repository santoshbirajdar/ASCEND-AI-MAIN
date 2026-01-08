import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Zap, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
            {/* Animated background elements (Unchanged) */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/5 to-violet-500/5 rounded-full blur-3xl" />
            </div>

            {/* Grid pattern overlay (Unchanged) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-sm text-slate-300">Your journey to dream job starts here</span>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                >
                    <span className="text-white">From Zero to</span>
                    <br />
                    <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                        Interview Ready
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Personalized roadmaps, curated resources, and AI-powered interview prep 
                    designed for technical students to land their dream roles.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {/* 1. Dashboard Button (Standard) */}
                    <Link to={createPageUrl('Dashboard')}>
                        <Button size="lg" className="bg-slate-800 text-white hover:bg-slate-700 px-8 py-6 text-lg rounded-xl border border-slate-700">
                            Dashboard
                        </Button>
                    </Link>

                    {/* 2. NEW HIGHLIGHTED AI COACH BUTTON */}
                    <Link to={createPageUrl('AICoach')}>
                        <Button size="lg" className="relative bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-indigo-500/50 hover:scale-105 transition-all group overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                            <MessageSquare className="mr-2 w-5 h-5 animate-pulse" />
                            Ask AI Coach
                        </Button>
                    </Link>

                    {/* 3. Explore Button (Standard) */}
                    <Link to={createPageUrl('CareerPaths')}>
                        <Button size="lg" variant="outline" className="border-white/20 text-black bg-white hover:bg-white/90 px-8 py-6 text-lg rounded-xl backdrop-blur-sm">
                            Explore Paths
                        </Button>
                    </Link>
                </motion.div>

                {/* Feature highlights (Unchanged) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {[
                        { icon: Target, title: "Clear Roadmaps", desc: "Step-by-step guides for every role" },
                        { icon: Zap, title: "AI Interview Coach", desc: "Practice with smart feedback" },
                        { icon: Sparkles, title: "Skill Assessment", desc: "Know where you stand" }
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white/20"
                        >
                            <feature.icon className="w-10 h-10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
