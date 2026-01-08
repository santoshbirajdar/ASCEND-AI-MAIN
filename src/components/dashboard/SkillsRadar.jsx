import React from 'react';
import { Card } from "@/components/ui/card";
import { Star } from 'lucide-react';

export default function SkillsRadar({ skills, requiredSkills }) {
    const getSkillLevel = (skillName) => skills?.[skillName] || 0;
    const renderStars = (level) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<Star key={i} className={'w-4 h-4 ' + (i <= level ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600')} />);
        }
        return stars;
    };

    return (
        <Card className="p-6 bg-slate-900/50 border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4">Skills Assessment</h3>
            {requiredSkills && requiredSkills.length > 0 ? (
                <div className="space-y-4">
                    {requiredSkills.map((skill, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                            <p className="text-white font-medium">{skill}</p>
                            <div className="flex items-center gap-0.5">{renderStars(getSkillLevel(skill))}</div>
                        </div>
                    ))}
                </div>
            ) : <div className="text-center text-slate-400">Select a career path first.</div>}
        </Card>
    );
}
