import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Bookmark, BookmarkCheck, Lightbulb, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionCard({ question, isBookmarked, onToggleBookmark, index }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card className="overflow-hidden bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all">
                <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">{question.question_type}</Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">{question.topic}</Badge>
                        </div>
                        <button onClick={() => onToggleBookmark(question.id)} className="text-slate-400 hover:text-yellow-400">{isBookmarked ? <BookmarkCheck className="w-5 h-5 text-yellow-400 fill-yellow-400" /> : <Bookmark className="w-5 h-5" />}</button>
                    </div>
                    <h3 className="text-white font-medium mb-4 leading-relaxed">{question.question}</h3>
                    <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="w-full justify-between text-slate-400 hover:text-white hover:bg-slate-800">
                        <span className="text-sm">{isExpanded ? 'Hide Answer Guide' : 'Show Answer Guide'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="pt-4 space-y-4">
                                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                                        <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 mb-2"><CheckCircle className="w-4 h-4" /> Answer Guide</div>
                                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{question.answer_guide}</p>
                                    </div>
                                    {question.tips && <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20"><div className="flex items-center gap-2 text-sm font-medium text-amber-400 mb-3"><Lightbulb className="w-4 h-4" /> Pro Tips</div><ul className="space-y-2">{question.tips.map((tip, i) => <li key={i} className="text-slate-300 text-sm flex items-start gap-2"><span className="text-amber-400">•</span> {tip}</li>)}</ul></div>}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        </motion.div>
    );
}
