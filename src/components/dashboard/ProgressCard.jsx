import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, CheckCircle2, Clock, Target } from 'lucide-react';

export default function ProgressCard({ progress, careerPath }) {
    const completedSteps = progress?.completed_steps?.length || 0;
    const totalSteps = careerPath?.roadmap_steps?.length || 1;
    const progressPercent = Math.round((completedSteps / totalSteps) * 100);

    return (
        <Card className="p-6 bg-gradient-to-br from-slate-900 to-slate-900/50 border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your Progress</h3>
                <div className="flex items-center gap-1.5 text-emerald-400"><TrendingUp className="w-4 h-4" /><span className="text-sm font-medium">{progressPercent}%</span></div>
            </div>
            <Progress value={progressPercent} className="h-2 mb-6 bg-slate-800" />
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-slate-800/50"><CheckCircle2 className="w-5 h-5 text-green-400 mx-auto mb-2" /><p className="text-2xl font-bold text-white">{completedSteps}</p><p className="text-xs text-slate-400">Completed</p></div>
                <div className="text-center p-3 rounded-lg bg-slate-800/50"><Target className="w-5 h-5 text-indigo-400 mx-auto mb-2" /><p className="text-2xl font-bold text-white">{totalSteps - completedSteps}</p><p className="text-xs text-slate-400">Remaining</p></div>
                <div className="text-center p-3 rounded-lg bg-slate-800/50"><Clock className="w-5 h-5 text-amber-400 mx-auto mb-2" /><p className="text-2xl font-bold text-white">120</p><p className="text-xs text-slate-400">Days Left</p></div>
            </div>
        </Card>
    );
}
