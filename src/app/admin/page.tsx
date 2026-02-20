"use client";

import { motion } from "framer-motion";
import {
    Calendar,
    Users,
    MessageSquare,
    ChevronRight,
    TrendingUp,
    Zap,
    Save,
    Settings,
    RotateCcw
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteStats, updateAlumniCount, updateActiveMembersCount } from "@/lib/data";

const stats = [
    { label: "Total Events", value: "24", icon: Calendar, color: "text-purple-500", href: "/admin/events" },
    { label: "Team Members", value: "12", icon: Users, color: "text-blue-500", href: "/admin/team" },
    { label: "Testimonials", value: "18", icon: MessageSquare, color: "text-pink-500", href: "/admin/testimonials" },
];

export default function AdminDashboard() {
    const [statsData, setStatsData] = useState<any>(null);
    const [alumniCount, setAlumniCount] = useState<number>(85);
    const [activeMembersCount, setActiveMembersCount] = useState<number>(120);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await getSiteStats();
            setStatsData(data);
            setAlumniCount(data.alumniCount);
            setActiveMembersCount(data.membersCount);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const handleUpdateSettings = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            await Promise.all([
                updateAlumniCount(alumniCount),
                updateActiveMembersCount(activeMembersCount)
            ]);
            setMessage({ text: "Settings updated successfully!", type: 'success' });
            fetchStats();
        } catch (error: any) {
            setMessage({ text: `Failed to update settings: ${error.message || 'Unknown error'}`, type: 'error' });
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const dashboardStats = [
        { label: "Total Events", value: statsData?.eventsCount || "...", icon: Calendar, color: "text-purple-500", href: "/admin/events" },
        { label: "Team Members", value: statsData?.membersCount || "...", icon: Users, color: "text-blue-500", href: "/admin/team" },
        { label: "Alumni Count", value: statsData?.alumniCount || "...", icon: Settings, color: "text-pink-500", href: "#settings" },
    ];
    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-display font-bold text-foreground mb-2 uppercase tracking-tighter">Dashboard <span className="text-pink-500">Overview</span></h1>
                <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dashboardStats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 rounded-3xl border border-border hover:border-pink-500/30 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn("p-3 rounded-2xl bg-muted", stat.color)}>
                                    <Icon size={24} />
                                </div>
                            </div>
                            <h3 className="text-3xl font-display font-bold text-foreground mb-1">{stat.value}</h3>
                            <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>

                            <Link
                                href={stat.href}
                                className="mt-6 flex items-center justify-between text-xs font-bold text-muted-foreground group-hover:text-pink-500 transition-colors uppercase tracking-[0.2em]"
                            >
                                {stat.label.includes('Count') ? 'Settings' : `Manage ${stat.label.split(' ')[1]}`}
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="glass-panel p-8 rounded-[2rem] border border-border">
                    <div className="flex items-center gap-2 mb-8">
                        <Zap className="text-yellow-500" size={20} />
                        <h2 className="text-xl font-bold text-foreground uppercase tracking-tight">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/events" className="p-4 rounded-2xl bg-muted border border-border hover:bg-muted/80 hover:border-pink-500/30 transition-all text-center">
                            <Calendar className="mx-auto mb-2 text-pink-500" size={24} />
                            <span className="text-xs font-bold text-foreground uppercase">Add Event</span>
                        </Link>
                        <Link href="/admin/team" className="p-4 rounded-2xl bg-muted border border-border hover:bg-muted/80 hover:border-purple-500/30 transition-all text-center">
                            <Users className="mx-auto mb-2 text-purple-500" size={24} />
                            <span className="text-xs font-bold text-foreground uppercase">Add Member</span>
                        </Link>
                    </div>
                </div>

                {/* System Status */}
                <div className="glass-panel p-8 rounded-[2rem] border border-border">
                    <h2 className="text-xl font-bold text-foreground uppercase tracking-tight mb-8">System Status</h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">Supabase Connection</span>
                            <span className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Operational
                            </span>
                        </div>
                    </div>
                </div>

                {/* Site Settings */}
                <div id="settings" className="lg:col-span-2 glass-panel p-8 rounded-[2rem] border border-border">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <Settings className="text-pink-500" size={20} />
                            <h2 className="text-xl font-bold text-foreground uppercase tracking-tight">Site Settings</h2>
                        </div>
                        {message && (
                            <p className={`text-xs font-bold uppercase tracking-widest ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message.text}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">
                        <div className="space-y-3">
                            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Alumni Members Count</label>
                            <input
                                type="number"
                                value={alumniCount}
                                onChange={(e) => setAlumniCount(parseInt(e.target.value))}
                                className="w-full bg-muted border border-border rounded-2xl p-4 text-foreground focus:border-pink-500/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] ml-1">Active Members Count</label>
                            <input
                                type="number"
                                value={activeMembersCount}
                                onChange={(e) => setActiveMembersCount(parseInt(e.target.value))}
                                className="w-full bg-muted border border-border rounded-2xl p-4 text-foreground focus:border-pink-500/50 outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={handleUpdateSettings}
                            disabled={isSaving}
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-all uppercase tracking-[0.1em] text-xs shadow-lg disabled:opacity-50"
                        >
                            {isSaving ? <RotateCcw className="animate-spin" size={18} /> : <Save size={18} />}
                            Save All Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Utility function used in the component
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
