import React, { useState, useEffect, useRef } from 'react';
import { getAICoachResponse } from '../services/geminiClient'; // ✅ NEW: Import Gemini Service
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const suggestedPrompts = [
    "How do I prepare for a frontend interview?",
    "What projects should I build?",
    "Explain system design for beginners"
];

export default function AICoach() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
    useEffect(() => { scrollToBottom(); }, [messages]);

    const sendMessage = async (messageText) => {
        if (!messageText.trim() || isLoading) return;
        
        // 1. Add User Message to UI
        const userMessage = { role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // 2. ✅ NEW: Call Gemini API instead of base44
            const responseText = await getAICoachResponse(messageText);
            
            // 3. Add AI Response to UI
            setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 py-8 px-6 text-white">
            <div className="max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 mb-4">
                        <Sparkles className="w-4 h-4 text-indigo-400" /><span className="text-sm text-indigo-300">Powered by Gemini Pro</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">Career Coach</h1>
                    <p className="text-slate-400">Get personalized guidance for your journey</p>
                </motion.div>

                <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                    <div className="h-[500px] overflow-y-auto p-6 space-y-6">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center">
                                <Bot className="w-16 h-16 text-indigo-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
                                <div className="flex flex-wrap gap-2 justify-center max-w-lg mt-4">
                                    {suggestedPrompts.map((p, i) => (
                                        <button key={i} onClick={() => sendMessage(p)} className="px-3 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">{p}</button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((m, idx) => (
                                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={'flex gap-4 ' + (m.role === 'user' ? 'justify-end' : '')}>
                                    {m.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>}
                                    <div className={'max-w-[80%] p-4 rounded-2xl ' + (m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200')}>
                                        <ReactMarkdown className="prose prose-sm prose-invert">{m.content}</ReactMarkdown>
                                    </div>
                                    {m.role === 'user' && <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center"><User className="w-4 h-4 text-slate-300" /></div>}
                                </motion.div>
                            ))
                        )}
                        {isLoading && <div className="flex items-center gap-2 text-slate-400"><Loader2 className="animate-spin w-4 h-4" /> Thinking...</div>}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t border-slate-800 flex gap-3">
                        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about career paths..." className="bg-slate-800 border-slate-700 text-white min-h-[50px]" />
                        <Button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} className="bg-indigo-600"><Send className="w-4 h-4" /></Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}