import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/lib/utils';
import { base44 } from '@/services/base44Client';
import { Button } from "@/components/ui/button";
import {
    Home, Compass, Brain, MessageSquare, LayoutDashboard, Menu, X, LogOut, Sparkles, TrendingUp
} from 'lucide-react';
import { cn } from "@/lib/utils";

const navItems = [
    { name: 'Home', icon: Home, page: 'Home' },
    { name: 'Career Paths', icon: Compass, page: 'CareerPaths' },
    { name: 'Market Insights', icon: TrendingUp, page: 'JobMarketInsights' },
    { name: 'Interview Prep', icon: Brain, page: 'InterviewPrep' },
    { name: 'AI Coach', icon: MessageSquare, page: 'AICoach' },
    { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' }
];

export default function Layout({ children, currentPageName }) {
    const [user, setUser] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        base44.auth.me().then(setUser).catch(() => {});
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    if (currentPageName === 'Welcome' || currentPageName === 'Auth') {
        return children;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white hidden sm:block">CareerLaunch</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = currentPageName === item.page;
                                return (
                                    <Link key={item.page} to={createPageUrl(item.page)}>
                                        <Button variant="ghost" className={cn("text-slate-400 hover:text-white hover:bg-slate-800", isActive && "text-white bg-slate-800")}>
                                            <item.icon className="w-4 h-4 mr-2" />
                                            {item.name}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-3">
                            {user ? (
                                <div className="hidden sm:flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-medium">
                                            {user.full_name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="text-slate-300 text-sm hidden lg:block">{user.full_name}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => base44.auth.logout()} className="text-slate-400 hover:text-white">
                                        <LogOut className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={() => base44.auth.redirectToLogin()} className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-sm">
                                    Sign In
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" className="md:hidden text-slate-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className="md:hidden bg-slate-900 border-t border-slate-800">
                        <div className="px-4 py-4 space-y-2">
                            {navItems.map((item) => (
                                <Link key={item.page} to={createPageUrl(item.page)}>
                                    <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800">
                                        <item.icon className="w-4 h-4 mr-3" />
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
            <main className="pt-16">{children}</main>
        </div>
    );
}
