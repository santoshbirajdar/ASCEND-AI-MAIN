import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp, Code, Server, Smartphone, Shield, Cloud, Brain, Layers, Settings, Package, Briefcase, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

const categoryIcons = {
    frontend: Code, backend: Server, fullstack: Layers, devops: Settings,
    data_science: TrendingUp, mobile: Smartphone, cybersecurity: Shield,
    cloud: Cloud, ai_ml: Brain, product: Package
};

const categoryColors = {
    frontend: "from-blue-500 to-cyan-500", backend: "from-green-500 to-emerald-500",
    fullstack: "from-violet-500 to-purple-500", devops: "from-orange-500 to-amber-500",
    data_science: "from-pink-500 to-rose-500", mobile: "from-teal-500 to-cyan-500",
    cybersecurity: "from-red-500 to-orange-500", cloud: "from-sky-500 to-blue-500",
    ai_ml: "from-fuchsia-500 to-pink-500", product: "from-indigo-500 to-violet-500"
};

const difficultyColors = {
    beginner: "bg-green-500/10 text-green-400 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    advanced: "bg-red-500/10 text-red-400 border-red-500/20"
};

export default function CareerCard({ career, index }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const Icon = categoryIcons[career.category] || Code;
    const gradientColor = categoryColors[career.category] || "from-gray-500 to-gray-600";
    
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
            <Card className="group relative overflow-hidden bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl">
                <div className={'h-1 w-full bg-gradient-to-r ' + gradientColor} />
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className={'p-3 rounded-xl bg-gradient-to-br ' + gradientColor + ' bg-opacity-20'}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex gap-2 flex-wrap justify-end">
                            <Badge variant="outline" className={difficultyColors[career.difficulty_level]}>{career.difficulty_level}</Badge>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{career.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{career.description}</p>
                    <div className="flex items-center gap-4 mb-4 text-sm flex-wrap">
                        <div className="flex items-center gap-1.5 text-emerald-400"><TrendingUp className="w-4 h-4" /><span className="font-medium">{career.salary_range}</span></div>
                    </div>
                    <Link to={createPageUrl('CareerDetail') + '?id=' + career.id}>
                        <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700">View Roadmap <ArrowRight className="ml-2 w-4 h-4" /></Button>
                    </Link>
                </div>
            </Card>
        </motion.div>
    );
}
