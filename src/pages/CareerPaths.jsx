import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/services/base44Client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import CareerCard from '@/components/career/CareerCard';
import { motion } from 'framer-motion';

export default function CareerPaths() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: careers, isLoading } = useQuery({
        queryKey: ['careerPaths'],
        queryFn: () => base44.entities.CareerPath.list(),
        initialData: []
    });

    const filteredCareers = careers.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Explore Career Paths</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">Discover tech careers with detailed insights.</p>
                </motion.div>
                <div className="relative mb-8 max-w-md mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input placeholder="Search paths..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 bg-slate-900 border-slate-800 text-white" />
                </div>
                {isLoading ? <div className="text-white">Loading...</div> : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCareers.map((career, index) => (
                            <CareerCard key={career.id} career={career} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
