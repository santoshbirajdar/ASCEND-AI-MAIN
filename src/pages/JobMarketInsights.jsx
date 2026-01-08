import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillsTrends, SalaryByRegion, TopCompanies, JobGrowthChart } from '@/components/insights/InsightsBundle';

export default function JobMarketInsights() {
    return (
        <div className="min-h-screen bg-slate-950 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Job Market Insights</h1>
                    <p className="text-slate-400">Real-time data on tech job market trends.</p>
                </div>
                <Tabs defaultValue="skills" className="space-y-6">
                    <TabsList className="bg-slate-900 border border-slate-800"><TabsTrigger value="skills">Skills</TabsTrigger><TabsTrigger value="salary">Salary</TabsTrigger><TabsTrigger value="companies">Companies</TabsTrigger></TabsList>
                    <TabsContent value="skills"><SkillsTrends /></TabsContent>
                    <TabsContent value="salary"><SalaryByRegion /></TabsContent>
                    <TabsContent value="companies"><TopCompanies /></TabsContent>
                </Tabs>
                <div className="mt-8">
                    <JobGrowthChart />
                </div>
            </div>
        </div>
    );
}
