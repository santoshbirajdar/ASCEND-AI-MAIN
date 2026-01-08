import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import { Card } from "@/components/ui/card";
import { Users, BookOpen, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-950">
            <HeroSection />
            <section className="py-20 px-6 bg-slate-900/50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[{l:"Students",v:"10K+"}, {l:"Paths",v:"50+"}, {l:"Questions",v:"500+"}].map((s,i)=>(
                        <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                            <p className="text-3xl font-bold text-white">{s.v}</p>
                            <p className="text-slate-400">{s.l}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
