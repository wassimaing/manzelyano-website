"use client";

import Link from "next/link";
import { Users, ChevronRight } from "lucide-react";
import { departments as mockDepartments, Department } from "@/data/team";

interface TeamProps {
    initialDepartments?: Department[];
}

export function Team({ initialDepartments }: TeamProps) {
    const data = initialDepartments && initialDepartments.length > 0 ? initialDepartments : mockDepartments;
    // Flatten all members into one list of Chief Operating Officers
    const coos = data.flatMap(dept => dept.members);

    return (
        <section id="team" className="w-full max-w-[1200px] px-6 py-24 z-20 mx-auto">
            <div className="flex flex-col items-center text-center mb-16 reveal-text reveal-visible">
                <span className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Users size={16} /> Leadership
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 uppercase">
                    Our <span className="text-pink-500 glow-text-pink">Chief Operating Officers</span>
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Meet the dedicated professionals leading our specialized departments and driving youth empowerment.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {coos.map((member, index) => (
                    <div
                        key={index}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative glass-panel p-6 rounded-[2rem] flex flex-col items-center text-center hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-pink-500/30 overflow-hidden">
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:border-pink-500 transition-all duration-500 shadow-xl">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <h4 className="text-white font-bold text-lg mb-1 group-hover:text-pink-200 transition-colors uppercase tracking-tight line-clamp-1">
                                {member.name}
                            </h4>
                            <span className="text-[10px] text-pink-400 font-mono font-bold tracking-widest uppercase py-1 px-3 bg-pink-500/10 rounded-full border border-pink-500/10">
                                {member.role}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <Link
                    href="/about#departments"
                    className="group relative px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/30 rounded-2xl transition-all duration-300 backdrop-blur-md overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm">
                        Explore Our Departments
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-pink-500" />
                    </span>
                </Link>
            </div>
        </section>
    );
}
