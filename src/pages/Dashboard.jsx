import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/services/base44Client';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    useEffect(() => { base44.auth.me().then(setUser).catch(() => {}); }, []);

    const { data: userProgress } = useQuery({
        queryKey: ['userProgress', user?.email],
        queryFn: () => base44.entities.UserProgress.filter({ user_email: user?.email }),
        enabled: !!user?.email,
        initialData: []
    });

    const { data: careers } = useQuery({
        queryKey: ['careerPaths'],
        queryFn: () => base44.entities.CareerPath.list(),
        initialData: []
    });

    const activeProgress = userProgress[0];
    const activeCareer = activeProgress ? careers.find(c => c.id === activeProgress.selected_career_path) : null;
    const progressPercent = activeCareer ? Math.round((activeProgress.completed_steps.length / activeCareer.roadmap_steps.length) * 100) : 0;

    if (!user) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading User...</div>;

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user.full_name?.split(' ')[0]}! ??</h1>
                    <p className="text-slate-400">
                        {activeCareer 
                            ? `You're ${progressPercent}% through your ${activeCareer.title} journey` 
                            : 'Ready to start your journey?'}
                    </p>
                </motion.div>

                {activeCareer ? (
                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="p-6 bg-gradient-to-br from-indigo-600 to-violet-600 border-0 relative overflow-hidden">
                                <div className="relative z-10">
                                    <Badge className="bg-white/20 text-white border-0 mb-4">Current Path</Badge>
                                    <h2 className="text-2xl font-bold text-white mb-2">{activeCareer.title}</h2>
                                    <p className="text-indigo-100 mb-6">{activeCareer.description}</p>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm"><span className="text-indigo-200">Progress</span><span className="text-white font-medium">{progressPercent}%</span></div>
                                        <Progress value={progressPercent} className="h-2 bg-white/20" />
                                    </div>
                                    <Link to={`/careerdetail?id=${activeCareer.id}`}>
                                        <Button className="bg-white text-indigo-600 hover:bg-indigo-50">Continue Learning <ArrowRight className="ml-2 w-4 h-4" /></Button>
                                    </Link>
                                </div>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold text-white mb-4">Start Your Career Journey</h2>
                        <Link to={createPageUrl('CareerPaths')}>
                            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-violet-500">Explore Paths <ArrowRight className="ml-2" /></Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
