import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Building2, Zap } from 'lucide-react';

export const SkillsTrends = () => (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-xl font-semibold text-white mb-4">In-Demand Skills</h3>
        <div className="space-y-4">
            {[{n:'Python', v:95}, {n:'React', v:88}, {n:'AI/ML', v:85}].map((s,i)=>(
                <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-white">{s.n}</span><span className="text-indigo-400">{s.v}% Demand</span></div>
                    <div className="h-2 bg-slate-800 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{width: s.v+'%'}}></div></div>
                </div>
            ))}
        </div>
    </Card>
);

export const SalaryByRegion = () => (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-xl font-semibold text-white mb-4">Salary Insights (USA)</h3>
        <div className="grid gap-4">
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded"><span className="text-slate-300">Frontend Dev</span><span className="text-emerald-400"></span></div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded"><span className="text-slate-300">Backend Dev</span><span className="text-emerald-400"></span></div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded"><span className="text-slate-300">AI Engineer</span><span className="text-emerald-400"></span></div>
        </div>
    </Card>
);

export const TopCompanies = () => (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-xl font-semibold text-white mb-4">Top Hiring Companies</h3>
        <div className="space-y-3">
             {[{n:'Google', o:2500}, {n:'Microsoft', o:2200}, {n:'Amazon', o:3000}].map((c,i)=>(
                 <div key={i} className="flex justify-between p-3 border border-slate-700 rounded-lg">
                     <div><div className="text-white font-bold">{c.n}</div><Badge variant="outline" className="text-xs mt-1 text-slate-400">{c.o} openings</Badge></div>
                 </div>
             ))}
        </div>
    </Card>
);

export const JobGrowthChart = () => (
    <Card className="p-6 bg-slate-900/50 border-slate-800">
        <h3 className="text-xl font-semibold text-white mb-4">Projected Growth (2026)</h3>
        <div className="flex items-center gap-4 p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/20">
            <TrendingUp className="w-8 h-8 text-indigo-400" />
            <div>
                <div className="text-2xl font-bold text-white">+23%</div>
                <div className="text-sm text-slate-400">Tech Sector Growth</div>
            </div>
        </div>
    </Card>
);
