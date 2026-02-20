"use client";

import React from "react";
import {
    Users,
    Sparkles,
    GraduationCap,
    Megaphone,
    Palette,
    Truck,
    Smile,
    Facebook,
    Instagram,
    Quote,
    Mail,
    Briefcase,
    X,
    ChevronRight,
    Star,
    Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Department, TeamMember } from "@/data/team";
import { Testimonial } from "@/data/testimonials";
import { StatCounter } from "../ui/StatCounter";

const iconMap: { [key: string]: any } = {
    GraduationCap,
    Megaphone,
    Palette,
    Truck,
    Smile
};

interface AboutClientProps {
    initialDepartments: Department[];
    initialTestimonials: Testimonial[];
    stats: {
        eventsCount: number;
        deptsCount: number;
        membersCount: number;
        alumniCount: number;
    };
}

export function AboutClient({ initialDepartments, initialTestimonials, stats }: AboutClientProps) {
    const [selectedDept, setSelectedDept] = React.useState<Department | null>(null);
    const [selectedMember, setSelectedMember] = React.useState<TeamMember | null>(null);

    const yearsOfImpact = new Date().getFullYear() - 2019;

    return (
        <main className="min-h-screen bg-background pt-32 relative overflow-hidden">
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
                    className="text-6xl md:text-8xl font-display font-bold text-foreground mb-8 tracking-tighter"
                >
                    The Heart of <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">About Us.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                >
                    Menzel Yano Bosco Youth is more than a club; it's a family dedicated to youth development, community service, and creative expression in Menzel Bourguiba.
                </motion.p>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-muted/30 border-y border-border relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="space-y-2">
                            <h3 className="text-5xl font-display font-bold text-foreground">
                                <StatCounter to={stats.membersCount} suffix="+" />
                            </h3>
                            <p className="text-pink-500 font-mono tracking-widest uppercase text-sm">Active Members</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-5xl font-display font-bold text-foreground">
                                <StatCounter to={stats.eventsCount} />
                            </h3>
                            <p className="text-purple-500 font-mono tracking-widest uppercase text-sm">Major Activities</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-5xl font-display font-bold text-foreground">
                                <StatCounter to={stats.deptsCount} />
                            </h3>
                            <p className="text-blue-500 font-mono tracking-widest uppercase text-sm">Departments</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="container mx-auto px-6 py-32 relative z-10 border-b border-border">
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
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-[1.1]">
                            Empowering the Youth of <span className="text-pink-500">Menzel Bourguiba.</span>
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Founded with a vision to create a sustainable impact, Menzelyano Bosco Youth serves as a bridge between potential and achievement. We provide a space where creativity meets discipline, and where every member is encouraged to take the lead in community service and personal development.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            <div>
                                <h4 className="text-foreground font-bold text-3xl mb-1">
                                    <StatCounter to={yearsOfImpact} suffix="+" />
                                </h4>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider">Years of Impact</p>
                            </div>
                            <div>
                                <h4 className="text-foreground font-bold text-3xl mb-1">
                                    <StatCounter to={stats.alumniCount} suffix="+" />
                                </h4>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider">Alumni Members</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1.0, scale: 1.1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
                    >
                        <img
                            src="images/about.jpeg"
                            alt="Our Community"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                        <div className="absolute bottom-10 left-10">
                            <span className="text-foreground font-bold text-lg">Since 2019.</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Departments Section */}
            <section id="departments" className="container mx-auto px-6 py-32 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 uppercase tracking-tighter">Our Departments</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        Our organization is built on specialized departments. Click on a department to meet its members.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {initialDepartments.map((dept, i) => {
                        const IconComponent = iconMap[dept.icon];
                        const isActive = selectedDept?.id === dept.id;

                        return (
                            <motion.div
                                key={i}
                                layoutId={`dept-${dept.id}`}
                                onClick={() => setSelectedDept(isActive ? null : dept)}
                                whileHover={{ y: -5 }}
                                className={`p-8 rounded-[2.5rem] bg-gradient-to-br ${dept.color} border ${isActive ? "border-pink-500" : "border-white/10"} hover:border-white/20 transition-all group cursor-pointer relative overflow-hidden`}
                            >
                                <div className={`p-4 rounded-2xl bg-foreground/10 ${dept.iconColor} w-fit mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                                    <IconComponent size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-tight">{dept.name}</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm mb-6">
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
                                className="absolute inset-0 bg-background/90 backdrop-blur-md"
                                onClick={() => setSelectedDept(null)}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                className="relative max-w-4xl w-full bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl z-10 p-8 md:p-12 overflow-y-auto max-h-[90vh]"
                            >
                                <button
                                    onClick={() => setSelectedDept(null)}
                                    className="absolute top-6 right-6 p-2 bg-muted/50 hover:bg-muted text-foreground rounded-full backdrop-blur-md z-20 transition-all border border-border"
                                >
                                    <X size={24} />
                                </button>

                                <div className="flex items-center gap-4 mb-10">
                                    <div className={`p-3 rounded-xl bg-muted ${selectedDept.iconColor}`}>
                                        {React.createElement(iconMap[selectedDept.icon], { size: 24 })}
                                    </div>
                                    <h3 className="text-3xl font-bold text-foreground uppercase tracking-tighter">
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
                                            className="group glass-panel p-6 rounded-3xl flex flex-col items-center text-center hover:bg-muted/50 transition-all cursor-pointer border border-border hover:border-pink-500/30"
                                        >
                                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-border group-hover:border-pink-500 transition-colors shadow-lg">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            </div>
                                            <h4 className="text-foreground font-bold text-lg mb-1 uppercase tracking-tight">{member.name}</h4>
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
                            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                            onClick={() => setSelectedMember(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative max-w-xl w-full bg-card/90 rounded-[2rem] overflow-hidden border border-border shadow-[0_0_80px_rgba(0,0,0,0.1)] z-10 flex flex-col backdrop-blur-md"
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-6 right-6 p-2 bg-muted/40 hover:bg-muted text-foreground rounded-full backdrop-blur-md z-30 transition-all border border-border"
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
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                                <div className="absolute bottom-6 left-8">
                                    <motion.h2
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl md:text-4xl font-bold text-foreground mb-1 uppercase tracking-tight"
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
                                <Quote className="absolute top-8 right-8 text-foreground/5" size={60} />

                                <div className="space-y-8 relative z-10">
                                    <div>
                                        <p className="text-muted-foreground leading-relaxed italic text-lg md:text-xl">
                                            "{selectedMember.experience}"
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-0.5">Contact Email</p>
                                                <a
                                                    href={`mailto:${selectedMember.email}`}
                                                    className="text-foreground hover:text-pink-500 transition-colors text-sm font-semibold border-b border-transparent hover:border-pink-500/30 font-mono"
                                                >
                                                    {selectedMember.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground text-xs font-mono uppercase tracking-widest">
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
            <section className="py-32 bg-background relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 mb-16 text-center">
                    <span className="text-pink-500 font-mono text-sm tracking-widest uppercase mb-4 block">Feedback</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">What our family says</h2>
                </div>

                <div className="relative w-full overflow-hidden group">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none"></div>

                    <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max px-4">
                        {[...initialTestimonials, ...initialTestimonials].map((item, index) => (
                            <div
                                key={index}
                                className="w-[300px] md:w-[400px] bg-card/50 border border-border rounded-[2rem] p-8 backdrop-blur-sm hover:bg-card/80 transition-colors shrink-0 flex flex-col relative"
                            >
                                <Quote className="absolute top-6 right-6 text-foreground/5" size={40} />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border border-border">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-foreground font-bold text-lg">{item.name}</h4>
                                        <span className="text-pink-400 text-xs font-mono uppercase tracking-wider">
                                            {item.role}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed italic text-sm">
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
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-16 px-4">
                        FOLLOW US IN <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">SOCIAL MEDIA</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <a
                            href="https://www.facebook.com/profile.php?id=61572948599465"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-10 rounded-[2.5rem] bg-[#1877F2]/10 border border-[#1877F2]/20 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all flex flex-col items-center gap-6"
                        >
                            <div className="p-6 bg-[#1877F2] rounded-[1.5rem] text-white shadow-[0_0_30px_rgba(24,119,242,0.4)] group-hover:scale-110 transition-transform">
                                <Facebook size={40} />
                            </div>
                            <span className="text-foreground font-bold text-xl tracking-widest group-hover:text-[#1877F2] transition-colors uppercase">Facebook</span>
                        </a>

                        <a
                            href="https://www.instagram.com/manzelyano.bosco.youth?igsh=MXcyaDRmb2xzaGZ3YQ%3D%3D&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-10 rounded-[2.5rem] bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all flex flex-col items-center gap-6"
                        >
                            <div className="p-6 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-[1.5rem] text-white shadow-[0_0_30px_rgba(253,29,29,0.3)] group-hover:scale-110 transition-transform">
                                <Instagram size={40} />
                            </div>
                            <span className="text-foreground font-bold text-xl tracking-widest group-hover:text-pink-500 transition-colors uppercase">Instagram</span>
                        </a>

                        <a
                            href="https://www.tiktok.com/@manzelyan0?_r=1&_t=ZS-9450Lgka4sj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group p-10 rounded-[2.5rem] bg-[#ff0050]/10 border border-[#ff0050]/20 hover:border-[#00f2ea]/40 transition-all flex flex-col items-center gap-6"
                        >
                            <div className="p-6 bg-[#010101] rounded-[1.5rem] text-white shadow-[0_0_30px_rgba(255,0,80,0.3)] group-hover:shadow-[0_0_30px_rgba(0,242,234,0.3)] group-hover:scale-110 transition-all relative overflow-hidden">
                                {/* TikTok cyan shadow layer */}
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="#00f2ea"
                                    className="w-10 h-10 absolute top-[calc(50%-20px+2px)] left-[calc(50%-20px-2px)]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-1.13-.31-2.34-.25-3.41.33-.71.38-1.27 1.03-1.51 1.81-.26.78-.17 1.69.21 2.39.42.83 1.22 1.44 2.12 1.61.93.18 1.91-.01 2.69-.54.78-.54 1.24-1.44 1.3-2.39.06-2.85.03-5.7.03-8.55V0z" />
                                </svg>
                                {/* TikTok red shadow layer */}
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="#ff0050"
                                    className="w-10 h-10 absolute top-[calc(50%-20px-2px)] left-[calc(50%-20px+2px)]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-1.13-.31-2.34-.25-3.41.33-.71.38-1.27 1.03-1.51 1.81-.26.78-.17 1.69.21 2.39.42.83 1.22 1.44 2.12 1.61.93.18 1.91-.01 2.69-.54.78-.54 1.24-1.44 1.3-2.39.06-2.85.03-5.7.03-8.55V0z" />
                                </svg>
                                {/* Main white icon on top */}
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    className="w-10 h-10 relative z-10"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-1.13-.31-2.34-.25-3.41.33-.71.38-1.27 1.03-1.51 1.81-.26.78-.17 1.69.21 2.39.42.83 1.22 1.44 2.12 1.61.93.18 1.91-.01 2.69-.54.78-.54 1.24-1.44 1.3-2.39.06-2.85.03-5.7.03-8.55V0z" />
                                </svg>
                            </div>
                            <span className="text-foreground font-bold text-xl tracking-widest group-hover:text-[#ff0050] transition-colors uppercase">TikTok</span>
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
