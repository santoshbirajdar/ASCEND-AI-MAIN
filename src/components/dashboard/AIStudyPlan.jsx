import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { generateStructuredPlan } from '../../services/geminiClient';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Loader2, Plus, Calendar } from 'lucide-react';

export default function AIStudyPlan({ user }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  // Form Inputs
  const [goal, setGoal] = useState("");
  const [hours, setHours] = useState("10");
  const [level, setLevel] = useState("Beginner");

  useEffect(() => {
    if (user) fetchPlans();
  }, [user]);

  async function fetchPlans() {
    setLoading(true);
    // Fetch Plan Metadata
    const { data: plansData } = await supabase
      .from('ai_study_plans')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (plansData?.length > 0) {
      // For each plan, fetch its tasks
      const fullPlans = await Promise.all(plansData.map(async (plan) => {
        const { data: tasks } = await supabase
          .from('study_tasks')
          .select('*')
          .eq('plan_id', plan.id)
          .order('week_number', { ascending: true });
        return { ...plan, tasks };
      }));
      setPlans(fullPlans);
    }
    setLoading(false);
  }

  const handleCreatePlan = async () => {
    if (!goal) return;
    setGenerating(true);

    try {
      // 1. Get JSON from Gemini
      const planJSON = await generateStructuredPlan(goal, hours, level);
      
      if (!planJSON) throw new Error("AI failed to generate plan");

      // 2. Save Plan Header to DB
      const { data: planData, error: planError } = await supabase
        .from('ai_study_plans')
        .insert([{ 
          user_id: user.id, 
          title: planJSON.plan_title, 
          goal: goal 
        }])
        .select()
        .single();

      if (planError) throw planError;

      // 3. Save Tasks to DB
      const allTasks = [];
      planJSON.weeks.forEach(week => {
        week.tasks.forEach(t => {
          allTasks.push({
            plan_id: planData.id,
            week_number: week.week_number,
            day_number: t.day || 1,
            task_description: t.task,
            is_completed: false
          });
        });
      });

      await supabase.from('study_tasks').insert(allTasks);

      // 4. Refresh UI
      await fetchPlans();
      setShowCreate(false);
      setGoal("");

    } catch (error) {
      alert("Error creating plan: " + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const toggleTask = async (taskId, currentStatus) => {
    // Optimistic UI Update (Update screen instantly)
    setPlans(prevPlans => prevPlans.map(p => ({
        ...p,
        tasks: p.tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t)
    })));

    // Update DB
    await supabase.from('study_tasks').update({ is_completed: !currentStatus }).eq('id', taskId);
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER & NEW PLAN BUTTON */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My AI Study Plans</h2>
        <Button onClick={() => setShowCreate(!showCreate)} className="bg-indigo-600">
          <Plus className="w-4 h-4 mr-2" /> New Plan
        </Button>
      </div>

      {/* CREATE PLAN FORM */}
      {showCreate && (
        <Card className="p-6 bg-slate-900 border-indigo-500/50 border mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Generate Custom Roadmap</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <input 
              placeholder="Target Role (e.g. React Developer)" 
              className="p-2 rounded bg-slate-800 text-white border border-slate-700"
              value={goal} onChange={e => setGoal(e.target.value)}
            />
            <select 
              className="p-2 rounded bg-slate-800 text-white border border-slate-700"
              value={level} onChange={e => setLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <Button onClick={handleCreatePlan} disabled={generating} className="bg-green-600 hover:bg-green-700">
              {generating ? <><Loader2 className="w-4 h-4 animate-spin mr-2"/> Generating...</> : "Generate AI Plan"}
            </Button>
          </div>
        </Card>
      )}

      {/* PLANS LIST */}
      {loading ? <div className="text-slate-400">Loading plans...</div> : plans.length === 0 ? (
        <div className="text-center p-10 border border-dashed border-slate-800 rounded-lg text-slate-500">
          No active plans. Click "New Plan" to start your journey!
        </div>
      ) : (
        plans.map(plan => {
           const totalTasks = plan.tasks.length;
           const completedTasks = plan.tasks.filter(t => t.is_completed).length;
           const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

           return (
            <Card key={plan.id} className="bg-slate-900/50 border-slate-800 overflow-hidden">
              {/* Plan Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                 <div>
                    <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                    <p className="text-sm text-slate-400">Goal: {plan.goal}</p>
                 </div>
                 <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-400">{progress}%</div>
                    <div className="text-xs text-slate-500">Completed</div>
                 </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-2">
                 <div className="bg-indigo-600 h-2 transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>

              {/* Tasks List Grouped by Week */}
              <div className="p-6 grid gap-6 md:grid-cols-2">
                 {[...new Set(plan.tasks.map(t => t.week_number))].sort().map(weekNum => (
                    <div key={weekNum} className="bg-slate-950/50 p-4 rounded-lg border border-slate-800/50">
                       <h4 className="text-indigo-300 font-semibold mb-3 flex items-center">
                          <Calendar className="w-4 h-4 mr-2"/> Week {weekNum}
                       </h4>
                       <div className="space-y-3">
                          {plan.tasks.filter(t => t.week_number === weekNum).map(task => (
                             <div 
                               key={task.id} 
                               onClick={() => toggleTask(task.id, task.is_completed)}
                               className={`flex items-start gap-3 p-2 rounded cursor-pointer transition-colors ${
                                 task.is_completed ? "bg-green-900/10 text-slate-500 line-through" : "hover:bg-slate-800 text-slate-300"
                               }`}
                             >
                                {task.is_completed 
                                  ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> 
                                  : <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                                }
                                <span className="text-sm">{task.task_description}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
            </Card>
           );
        })
      )}
    </div>
  );
}