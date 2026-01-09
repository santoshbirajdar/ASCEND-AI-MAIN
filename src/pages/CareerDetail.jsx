import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Target, Award, Wrench, MessageSquare, CheckCircle2, TrendingUp, Clock, Loader2 } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

// --- EXPANDED MOCK DATA (Fallback if DB is empty) ---
const MOCK_CAREERS = {
  "1": {
    id: "1",
    title: "Cloud Architect",
    description: "Design, secure, and manage complex cloud infrastructure on Azure and AWS.",
    category: "Cloud",
    difficulty_level: "Advanced",
    salary_range: "$130k - $210k",
    required_skills: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes", "Python"],
    popular_tools: ["Terraform", "Ansible", "Jenkins"],
    top_certifications: [{ name: "AWS Solutions Architect", provider: "Amazon", difficulty: "Hard" }],
    roadmap_steps: [
       { id: 1, title: "Networking Core", description: "Master TCP/IP, DNS, VPNs." },
       { id: 2, title: "Linux Fundamentals", description: "Command line, permissions, bash scripting." },
       { id: 3, title: "AWS Basics", description: "EC2, S3, IAM roles." }
    ]
  },
  "2": {
    id: "2",
    title: "Frontend Developer",
    description: "Build responsive, interactive web applications using modern JavaScript frameworks.",
    category: "Development",
    difficulty_level: "Intermediate",
    salary_range: "$80k - $140k",
    required_skills: ["React", "JavaScript", "CSS/Tailwind", "TypeScript", "Git"],
    popular_tools: ["VS Code", "Figma", "Vite"],
    top_certifications: [{ name: "Meta Frontend Developer", provider: "Coursera", difficulty: "Medium" }],
    roadmap_steps: [
       { id: 1, title: "HTML & CSS Mastery", description: "Semantic HTML, Flexbox, Grid." },
       { id: 2, title: "JavaScript Deep Dive", description: "ES6+, Async/Await, DOM manipulation." },
       { id: 3, title: "React Fundamentals", description: "Components, Hooks, State Management." }
    ]
  },
  "3": {
    id: "3",
    title: "DevOps Engineer",
    description: "Bridge the gap between development and operations with CI/CD and automation.",
    category: "Operations",
    difficulty_level: "Hard",
    salary_range: "$110k - $180k",
    required_skills: ["Linux", "Jenkins", "Docker", "Kubernetes", "Bash"],
    popular_tools: ["GitLab CI", "Prometheus", "Grafana"],
    top_certifications: [{ name: "CKA (Kubernetes Admin)", provider: "CNCF", difficulty: "Hard" }],
    roadmap_steps: [
       { id: 1, title: "OS Internals", description: "Process management, threads, memory." },
       { id: 2, title: "CI/CD Pipelines", description: "Automating build and deploy workflows." },
       { id: 3, title: "Containerization", description: "Dockerizing apps and orchestration." }
    ]
  }
};

export default function CareerDetail() {
    const [searchParams] = useSearchParams();
    const careerId = searchParams.get('id') || "1"; 
    const navigate = useNavigate();
    
    const [career, setCareer] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [user, setUser] = useState(null);

    // 1. Load Data
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                // Get Current User
                const { data: { session } } = await supabase.auth.getSession();
                const currentUser = session?.user;
                setUser(currentUser);

                // A. Try fetching Career from Supabase first
                const { data: dbCareer, error: careerError } = await supabase
                    .from('career_paths')
                    .select('*')
                    .eq('id', careerId)
                    .single();

                if (dbCareer && !careerError) {
                    setCareer(dbCareer);
                } else {
                    // Fallback to Mock Data if DB is empty or ID not found
                    setCareer(MOCK_CAREERS[careerId] || MOCK_CAREERS["1"]);
                }

                // B. Check if user already started this path
                if (currentUser) {
                    const { data: progressData } = await supabase
                        .from('user_progress')
                        .select('id, status')
                        .eq('user_id', currentUser.id)
                        .eq('career_path_id', careerId)
                        .maybeSingle(); // Prevents error if no rows found
                    
                    if (progressData) setHasStarted(true);
                }
            } catch (error) {
                console.error("Error loading page:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [careerId]);

    // 2. Button Action (Start Career)
    const handleStartPath = async () => {
        if (!user) {
            navigate('/auth'); 
            return;
        }

        setButtonLoading(true);
        try {
            // Using "upsert" is safer - it creates if new, updates if exists
            const { error } = await supabase
                .from('user_progress')
                .upsert([
                    { 
                        user_id: user.id, 
                        career_path_id: careerId,
                        status: 'started',
                        // Initialize with empty array if null
                        completed_steps: [] 
                    }
                ], { onConflict: 'user_id, career_path_id' }); // Ensures no duplicates

            if (error) {
                throw error;
            }

            setHasStarted(true);
            // Optional: Redirect to dashboard to see progress
            // navigate('/dashboard'); 

        } catch (error) {
            console.error("Supabase Error:", error.message);
            // Fallback for UI if DB fails (so demo still feels responsive)
            if (error.code === '42501' || error.message.includes("policy")) {
                 alert("Database permission error. Please run the RLS policies SQL script in Supabase.");
            } else {
                 // Even if it fails, set started for the UI session
                 setHasStarted(true);
            }
        } finally {
            setButtonLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white"><Loader2 className="animate-spin mr-2"/> Loading Career...</div>;
    if (!career) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Career path not found.</div>;

    // Safety checks for arrays (handles both DB data and Mock data structures)
    const tools = career.popular_tools || [];
    const certs = career.top_certifications || [];
    const steps = career.roadmap_steps || [];

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/careerpaths">
                    <Button variant="ghost" className="text-slate-400 mb-6 hover:text-white"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Paths</Button>
                </Link>
                
                <div className="flex flex-col lg:flex-row gap-8 justify-between items-start mb-10">
                    <div>
                        <div className="flex gap-2 mb-4">
                            <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1 uppercase">{career.category || "Tech"}</Badge>
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1">{career.difficulty_level || "Medium"}</Badge>
                        </div>
                        <h1 className="text-5xl font-bold text-white mb-4">{career.title}</h1>
                        <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">{career.description}</p>
                    </div>

                    {/* --- ACTION BUTTON --- */}
                    <div className="flex flex-col gap-3 min-w-[200px]">
                        {!hasStarted ? (
                            <Button 
                                onClick={handleStartPath} 
                                size="lg" 
                                disabled={buttonLoading}
                                className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all"
                            >
                                {buttonLoading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                ) : (
                                    <><Target className="w-4 h-4 mr-2" /> Start Career Path</>
                                )}
                            </Button>
                        ) : (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg text-center font-bold flex items-center justify-center gap-2 animate-in fade-in zoom-in">
                                <CheckCircle2 className="w-5 h-5" /> Path Active
                            </div>
                        )}
                        <Link to="/interviewprep">
                            <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                                <MessageSquare className="w-4 h-4 mr-2" /> Interview Prep
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* INFO STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                     <Card className="p-4 bg-slate-900/50 border-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg"><TrendingUp className="w-5 h-5 text-green-400"/></div>
                        <div><div className="text-white font-bold">{career.salary_range || "Market Rate"}</div><div className="text-xs text-slate-500">Avg. Salary</div></div>
                     </Card>
                     <Card className="p-4 bg-slate-900/50 border-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg"><Clock className="w-5 h-5 text-blue-400"/></div>
                        <div><div className="text-white font-bold">{steps.length} Steps</div><div className="text-xs text-slate-500">Curriculum</div></div>
                     </Card>
                     <Card className="p-4 bg-slate-900/50 border-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg"><Award className="w-5 h-5 text-purple-400"/></div>
                        <div><div className="text-white font-bold">{certs.length} Certs</div><div className="text-xs text-slate-500">Recommended</div></div>
                     </Card>
                     <Card className="p-4 bg-slate-900/50 border-slate-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-500/10 rounded-lg"><Wrench className="w-5 h-5 text-orange-400"/></div>
                        <div><div className="text-white font-bold">{tools.length} Tools</div><div className="text-xs text-slate-500">Industry Standard</div></div>
                     </Card>
                </div>

                <Tabs defaultValue="roadmap" className="w-full">
                    <TabsList className="bg-slate-900/80 border border-slate-800 p-1 mb-6">
                        <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                        <TabsTrigger value="skills">Skills & Tools</TabsTrigger>
                        <TabsTrigger value="certs">Certifications</TabsTrigger>
                    </TabsList>

                    <TabsContent value="roadmap">
                        <Card className="p-6 bg-slate-900/50 border-slate-800">
                             <ul className="space-y-4">
                                {steps.map((step, idx) => (
                                    <li key={step.id || idx} className="text-slate-300 bg-slate-800/50 p-4 rounded border border-slate-700 flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <strong className="text-white block mb-1">{step.title}</strong>
                                            <p className="text-sm text-slate-500">{step.description}</p>
                                        </div>
                                    </li>
                                ))}
                             </ul>
                        </Card>
                    </TabsContent>

                    <TabsContent value="skills">
                         <Card className="p-6 bg-slate-900/50 border-slate-800">
                            <h3 className="text-white font-bold mb-4">Required Skills</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {career.required_skills?.map(skill => (
                                    <Badge key={skill} className="bg-slate-800 text-slate-200 border-slate-700">{skill}</Badge>
                                ))}
                            </div>
                            <h3 className="text-white font-bold mb-4">Popular Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                {tools.map(tool => (
                                    <div key={tool} className="flex items-center gap-2 px-3 py-2 rounded bg-slate-800/50 border border-slate-700 text-slate-300 text-sm">
                                        <Wrench className="w-3 h-3" /> {tool}
                                    </div>
                                ))}
                            </div>
                         </Card>
                    </TabsContent>

                    <TabsContent value="certs">
                        <div className="grid gap-4">
                            {certs.map((cert, i) => (
                                <Card key={i} className="p-5 bg-slate-900/50 border-slate-800">
                                    <h4 className="text-lg font-bold text-white mb-1">{cert.name}</h4>
                                    <p className="text-slate-400 text-sm">{cert.provider} • <span className="text-indigo-400">{cert.difficulty}</span></p>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}