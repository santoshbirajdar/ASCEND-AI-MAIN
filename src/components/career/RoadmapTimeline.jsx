import React from 'react';
import { CheckCircle2, Circle, Clock, BookOpen, ExternalLink, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/utils";

export default function RoadmapTimeline({ steps, completedSteps, onToggleStep }) {
    return (
        <div className="relative pb-10">
            {/* 1. THE VERTICAL LINE (Fixed Alignment) */}
            {/* We calculate height to stop at the last step center to avoid dangling lines */}
            <div 
                className="absolute left-[26px] top-6 bottom-10 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-slate-800" 
            />

            <div className="space-y-8">
                {steps?.map((step, index) => {
                    const isCompleted = completedSteps?.includes(step.step_number);
                    // Active is the first uncompleted step
                    const isActive = !isCompleted && (index === 0 || completedSteps?.includes(steps[index - 1]?.step_number));

                    return (
                        <motion.div 
                            key={step.step_number} 
                            initial={{ opacity: 0, x: -20 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ delay: index * 0.1 }} 
                            className={cn("relative pl-20 group", isCompleted && "opacity-80")}
                        >
                            {/* 2. THE CIRCLE/BUTTON (Z-Index ensures it sits ON TOP of the line) */}
                            <button 
                                onClick={() => onToggleStep(step.step_number)}
                                className={cn(
                                    "absolute left-3 top-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xl",
                                    isCompleted 
                                        ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                                        : isActive 
                                            ? "bg-indigo-600 text-white ring-4 ring-indigo-500/20 shadow-indigo-500/30 scale-110" 
                                            : "bg-slate-900 text-slate-500 border-2 border-slate-700"
                                )}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                    <span className="text-sm font-bold">{step.step_number}</span>
                                )}
                            </button>

                            {/* 3. STEP CONTENT CARD */}
                            <div className={cn(
                                "p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                                isCompleted 
                                    ? "bg-slate-900/40 border-slate-800" 
                                    : isActive 
                                        ? "bg-slate-900/90 border-indigo-500/50 shadow-lg shadow-indigo-500/10" 
                                        : "bg-slate-900/40 border-slate-800"
                            )}>
                                {/* Active Glow Effect */}
                                {isActive && <div className="absolute top-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 h-full" />}

                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                                    <div>
                                        <h4 className={cn("text-xl font-bold mb-1", isCompleted ? "text-slate-400 line-through decoration-slate-600" : "text-white")}>
                                            {step.title}
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{step.description}</p>
                                    </div>
                                    
                                    {step.duration_weeks && (
                                        <div className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                                            <Clock className="w-3.5 h-3.5 text-indigo-400" />
                                            {step.duration_weeks} Weeks
                                        </div>
                                    )}
                                </div>

                                {/* Resources Section */}
                                {step.resources && step.resources.length > 0 && (
                                    <div className="mt-5 pt-4 border-t border-slate-800/50">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                            <BookOpen className="w-3.5 h-3.5" /> Recommended Resources
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {step.resources.map((resource, idx) => (
                                                <a 
                                                    key={idx} 
                                                    href="#" 
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-indigo-600/20 hover:text-indigo-300 text-slate-300 rounded-lg border border-slate-700 hover:border-indigo-500/30 transition-colors group/link"
                                                >
                                                    {resource}
                                                    <ExternalLink className="w-3 h-3 opacity-50 group-hover/link:opacity-100" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
