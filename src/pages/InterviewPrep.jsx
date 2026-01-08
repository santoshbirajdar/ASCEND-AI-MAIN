import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/services/base44Client';
import { Input } from "@/components/ui/input";
import { Search, Brain } from 'lucide-react';
import QuestionCard from '@/components/interview/QuestionCard';
import { motion } from 'framer-motion';

export default function InterviewPrep() {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: questions } = useQuery({
        queryKey: ['interviewQuestions'],
        queryFn: () => base44.entities.InterviewQuestion.list(),
        initialData: []
    });

    const filtered = questions.filter(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="min-h-screen bg-slate-950 py-12 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Interview Prep</h1>
                    <p className="text-slate-400">Master your interviews with curated questions.</p>
                </div>
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search questions..." className="pl-12 bg-slate-900 border-slate-800 text-white" />
                </div>
                <div className="space-y-4">
                    {filtered.map((q, i) => (
                        <QuestionCard key={q.id} question={q} index={i} isBookmarked={false} onToggleBookmark={()=>{}} />
                    ))}
                </div>
            </div>
        </div>
    );
}
