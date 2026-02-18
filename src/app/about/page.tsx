"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
    Users,
    Sparkles,
    GraduationCap,
    Megaphone,
    Palette,
    Truck,
    Smile,
    ArrowRight,
    Facebook,
    Instagram,
    Quote,
    Heart,
    Star,
    Mail,
    Briefcase,
    X,
    ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { testimonials } from "@/data/testimonials";
import { departments, TeamMember, Department } from "@/data/team";

const iconMap: { [key: string]: any } = {
    GraduationCap,
    Megaphone,
    Palette,
    Truck,
    Smile
};

export default function AboutPage() {
    const [selectedDept, setSelectedDept] = React.useState<Department | null>(null);
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);

    return (
        <>
            <Navbar />
            <main className="min-h-screen dark:bg-black bg-white pt-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-pink-500/10 to-transparent pointer-events-none"></div>

                {/* Hero Section */}
                <section className="container mx-auto px-6 py-20 text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-pink-500 font-mono text-sm tracking-[0.3em] uppercase mb-4 block"
                    >
                        Learn More
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display font-bold dark:text-white text-neutral-900 mb-8 tracking-tighter"
                    >
                        The Heart of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">About Us.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl dark:text-neutral-400 text-neutral-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Menzel Yano Bosco Youth is more than a club; it's a family dedicated to youth development, community service, and creative expression in Menzel Bourguiba.
                    </motion.p>
                </section>

                {/* Stats Section */}
                <section className="py-20 dark:bg-neutral-900/30 bg-neutral-100/50 border-y dark:border-white/5 border-neutral-200 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            <div className="space-y-2">
                                <h3 className="text-5xl font-display font-bold dark:text-white text-neutral-900">120+</h3>
                                <p className="text-pink-500 font-mono tracking-widest uppercase text-sm">Active Members</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-5xl font-display font-bold dark:text-white text-neutral-900">4</h3>
                                <p className="text-purple-500 font-mono tracking-widest uppercase text-sm">Major Activities</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-5xl font-display font-bold dark:text-white text-neutral-900">5</h3>
                                <p className="text-blue-500 font-mono tracking-widest uppercase text-sm">Departments</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="container mx-auto px-6 py-32 relative z-10 border-b dark:border-white/5 border-neutral-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-bold tracking-widest uppercase">
                                <Sparkles size={12} />
                                Our Identity
                            </div>
                            <h2 className="text-4xl md:text-6xl font-display font-bold dark:text-white text-neutral-900 leading-[1.1]">
                                Empowering the Youth of <span className="text-pink-500">Menzel Bourguiba.</span>
                            </h2>
                            <p className="text-lg dark:text-neutral-400 text-neutral-600 leading-relaxed">
                                Founded with a vision to create a sustainable impact, Menzel Yano Bosco Youth serves as a bridge between potential and achievement. We provide a space where creativity meets discipline, and where every member is encouraged to take the lead in community service and personal development.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div>
                                    <h4 className="dark:text-white text-neutral-900 font-bold text-3xl mb-1">10+</h4>
                                    <p className="dark:text-neutral-500 text-neutral-400 text-sm uppercase tracking-wider">Years of Impact</p>
                                </div>
                                <div>
                                    <h4 className="dark:text-white text-neutral-900 font-bold text-3xl mb-1">500+</h4>
                                    <p className="dark:text-neutral-500 text-neutral-400 text-sm uppercase tracking-wider">Alumni Members</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden dark:border-white/10 border-neutral-200 border shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop"
                                alt="Our Community"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-black dark:via-transparent dark:to-transparent bg-gradient-to-t from-white via-transparent to-transparent"></div>
                            <div className="absolute bottom-10 left-10">
                                <span className="dark:text-white text-neutral-900 font-bold text-lg">Since 2014.</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Departments Section */}
                <section id="departments" className="container mx-auto px-6 py-32 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white text-neutral-900 mb-6 uppercase tracking-tighter">Our Departments</h2>
                        <p className="dark:text-neutral-400 text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            Our organization is built on specialized departments. Click on a department to meet its members.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departments.map((dept, i) => {
                            const IconComponent = iconMap[dept.icon];
                            const isActive = selectedDept?.id === dept.id;

                            return (
                                <motion.div
                                    key={i}
                                    layoutId={`dept-${dept.id}`}
                                    onClick={() => setSelectedDept(isActive ? null : dept)}
                                    whileHover={{ y: -5 }}
                                    className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${dept.color} border ${isActive ? "border-pink-500" : "dark:border-white/10 border-neutral-200"} dark:hover:border-white/20 hover:border-neutral-300 transition-all group cursor-pointer relative overflow-hidden`}
                                >
                                    <div className={`p-4 rounded-2xl dark:bg-black/40 bg-white/40 ${dept.iconColor} w-fit mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold dark:text-white text-neutral-900 mb-4 uppercase tracking-tight">{dept.name}</h3>
                                    <p className="dark:text-neutral-400 text-neutral-600 leading-relaxed text-sm mb-6">
                                        {dept.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-pink-500 text-xs font-bold font-mono tracking-widest uppercase">
                                        {isActive ? "Close Officers List" : "View Chief Operating Officers"}
                                        <ChevronRight size={14} className={isActive ? "rotate-90 transition-transform" : ""} />
                                    </div>

                                    {/* Decorative ambient light */}
                                    <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-${dept.iconColor.split("-")[1]}-500/10 blur-[50px] pointer-events-none`}></div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Chief Operating Officers Modal */}
                    <AnimatePresence>
                        {selectedDept && (
                            <div className="fixed inset-0 z-[80] flex items-center justify-center p-6 sm:p-10 pointer-events-auto">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 dark:bg-black/90 bg-black/70 backdrop-blur-md"
                                    onClick={() => setSelectedDept(null)}
                                />
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                    className="relative max-w-4xl w-full dark:bg-neutral-900 bg-white dark:border-white/10 border-neutral-200 border rounded-[2.5rem] overflow-hidden shadow-2xl z-10 p-8 md:p-12 overflow-y-auto max-h-[90vh]"
                                >
                                    <button
                                        onClick={() => setSelectedDept(null)}
                                        className="absolute top-6 right-6 p-2 dark:bg-white/5 bg-neutral-100 dark:hover:bg-white/10 hover:bg-neutral-200 dark:text-white text-neutral-900 rounded-full backdrop-blur-md z-20 transition-all dark:border-white/5 border-neutral-200 border"
                                    >
                                        <X size={24} />
                                    </button>

                                    <div className="flex items-center gap-4 mb-10">
                                        <div className={`p-3 rounded-xl dark:bg-black/40 bg-neutral-100 ${selectedDept.iconColor}`}>
                                            {React.createElement(iconMap[selectedDept.icon], { size: 24 })}
                                        </div>
                                        <h3 className="text-3xl font-bold dark:text-white text-neutral-900 uppercase tracking-tighter">
                                            {selectedDept.name} <span className="text-pink-500">Chief Operating Officers</span>
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {selectedDept.members.map((member, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                onClick={() => setSelectedMember(member)}
                                                className="group glass-panel p-6 rounded-3xl flex flex-col items-center text-center dark:hover:bg-white/5 hover:bg-neutral-100 transition-all cursor-pointer dark:border-white/5 border-neutral-200 border dark:hover:border-pink-500/30 hover:border-pink-500/30"
                                            >
                                                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 dark:border-white/10 border-neutral-200 group-hover:border-pink-500 transition-colors shadow-lg">
                                                    <img
                                                        src={member.image}
                                                        alt={member.name}
                                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    />
                                                </div>
                                                <h4 className="dark:text-white text-neutral-900 font-bold text-lg mb-1 uppercase tracking-tight">{member.name}</h4>
                                                <span className="text-xs text-pink-400 font-mono tracking-widest uppercase font-bold">{member.role}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </section>

                {/* Member Details Modal */}
                <AnimatePresence>
                    {selectedMember && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10 pointer-events-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 dark:bg-black/95 bg-black/70 backdrop-blur-xl"
                                onClick={() => setSelectedMember(null)}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                className="relative max-w-xl w-full dark:bg-neutral-900/90 bg-white/95 rounded-[2rem] overflow-hidden dark:border-white/10 border-neutral-200 border shadow-[0_0_80px_rgba(0,0,0,0.5)] z-10 flex flex-col backdrop-blur-md"
                            >
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="absolute top-6 right-6 p-2 dark:bg-black/40 bg-neutral-100 dark:hover:bg-white/10 hover:bg-neutral-200 dark:text-white text-neutral-900 rounded-full backdrop-blur-md z-30 transition-all dark:border-white/10 border-neutral-200 border"
                                >
                                    <X size={20} />
                                </button>

                                {/* Photo Top Section */}
                                <div className="h-48 md:h-64 relative overflow-hidden group">
                                    <img
                                        src={selectedMember.image}
                                        alt={selectedMember.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-neutral-900 dark:via-neutral-900/40 dark:to-transparent bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                                    <div className="absolute bottom-6 left-8">
                                        <motion.h2
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-3xl md:text-4xl font-bold dark:text-white text-neutral-900 mb-1 uppercase tracking-tight"
                                        >
                                            {selectedMember.name}
                                        </motion.h2>
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-sm text-pink-500 font-mono font-bold tracking-[0.2em] uppercase"
                                        >
                                            {selectedMember.role}
                                        </motion.span>
                                    </div>
                                </div>

                                {/* Content Section - Testimonials Style */}
                                <div className="p-8 md:p-10 relative">
                                    <Quote className="absolute top-8 right-8 text-white/5" size={60} />

                                    <div className="space-y-8 relative z-10">
                                        <div>
                                            <p className="dark:text-neutral-300 text-neutral-600 leading-relaxed italic text-lg md:text-xl">
                                                "{selectedMember.experience}"
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t dark:border-white/5 border-neutral-200">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20">
                                                    <Mail size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-0.5">Contact Email</p>
                                                    <a
                                                        href={`mailto:${selectedMember.email}`}
                                                        className="dark:text-white text-neutral-900 hover:text-pink-500 transition-colors text-sm font-semibold border-b border-transparent hover:border-pink-500/30 font-mono"
                                                    >
                                                        {selectedMember.email}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 px-4 py-2 rounded-full dark:bg-white/5 bg-neutral-100 dark:border-white/10 border-neutral-200 border dark:text-neutral-400 text-neutral-600 text-xs font-mono uppercase tracking-widest">
                                                <Briefcase size={14} className="text-purple-500" />
                                                {selectedMember.department}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Testimonials Marquee Section */}
                <section className="py-32 dark:bg-black bg-white relative overflow-hidden">
                    <div className="container mx-auto px-6 relative z-10 mb-16 text-center">
                        <span className="text-pink-500 font-mono text-sm tracking-widest uppercase mb-4 block">Feedback</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold dark:text-white text-neutral-900 mb-6">What our family says</h2>
                    </div>

                    <div className="relative w-full overflow-hidden group">
                        {/* Gradient Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 dark:bg-gradient-to-r dark:from-black dark:to-transparent bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 dark:bg-gradient-to-l dark:from-black dark:to-transparent bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

                        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max px-4">
                            {[...testimonials, ...testimonials].map((item, index) => (
                                <div
                                    key={index}
                                    className="w-[300px] md:w-[400px] dark:bg-neutral-900/50 bg-neutral-50 border dark:border-white/5 border-neutral-200 rounded-[2rem] p-8 backdrop-blur-sm dark:hover:bg-neutral-800/50 hover:bg-neutral-100 transition-colors shrink-0 flex flex-col relative"
                                >
                                    <Quote className="absolute top-6 right-6 text-white/5" size={40} />

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="dark:text-white text-neutral-900 font-bold text-lg">{item.name}</h4>
                                            <span className="text-pink-400 text-xs font-mono uppercase tracking-wider">
                                                {item.role}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="dark:text-neutral-300 text-neutral-600 leading-relaxed italic text-sm">
                                        "{item.text}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Social Media Section */}
                <section className="container mx-auto px-6 py-40 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-display font-bold dark:text-white text-neutral-900 mb-16 px-4">
                            FOLLOW US IN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">SOCIAL MEDIA</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-10 rounded-[2.5rem] bg-[#1877F2]/10 border border-[#1877F2]/20 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all flex flex-col items-center gap-6"
                            >
                                <div className="p-6 bg-[#1877F2] rounded-[1.5rem] text-white shadow-[0_0_30px_rgba(24,119,242,0.4)] group-hover:scale-110 transition-transform">
                                    <Facebook size={40} />
                                </div>
                                <span className="dark:text-white text-neutral-900 font-bold text-xl tracking-widest group-hover:text-[#1877F2] transition-colors uppercase">Facebook</span>
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-10 rounded-[2.5rem] bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all flex flex-col items-center gap-6"
                            >
                                <div className="p-6 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-[1.5rem] text-white shadow-[0_0_30px_rgba(253,29,29,0.3)] group-hover:scale-110 transition-transform">
                                    <Instagram size={40} />
                                </div>
                                <span className="dark:text-white text-neutral-900 font-bold text-xl tracking-widest group-hover:text-pink-500 transition-colors uppercase">Instagram</span>
                            </a>

                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-10 rounded-[2.5rem] dark:bg-white/5 bg-neutral-100 dark:border-white/10 border-neutral-200 border dark:hover:bg-neutral-800/50 hover:bg-neutral-200 transition-all flex flex-col items-center gap-6"
                            >
                                <div className="p-6 bg-black rounded-[1.5rem] text-white shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff0050]/20 to-[#00f2ea]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-10 h-10 relative z-10"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-1.13-.31-2.34-.25-3.41.33-.71.38-1.27 1.03-1.51 1.81-.26.78-.17 1.69.21 2.39.42.83 1.22 1.44 2.12 1.61.93.18 1.91-.01 2.69-.54.78-.54 1.24-1.44 1.3-2.39.06-2.85.03-5.7.03-8.55V0z" />
                                    </svg>
                                </div>
                                <span className="dark:text-white text-neutral-900 font-bold text-xl tracking-widest group-hover:text-[#00f2ea] transition-colors uppercase">TikTok</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
