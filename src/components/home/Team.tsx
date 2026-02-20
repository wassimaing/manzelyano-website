"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";
import { Department } from "@/data/team";

export function Team({ initialDepartments = [] }: { initialDepartments?: Department[] }) {
    const departments = initialDepartments;
    // Flatten all members into one list of Chief Operating Officers
    const coos = departments.flatMap((dept: Department) => dept.members);

    return (
        <section id="team" className="w-full max-w-[1200px] px-6 py-24 z-20 mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center mb-16"
            >
                <span className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Users size={16} /> Leadership
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight dark:text-white text-neutral-900 mb-6 uppercase">
                    Our <span className="text-pink-500 glow-text-pink">Chief Operating Officers</span>
                </h2>
                <p className="dark:text-neutral-400 text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                    Meet the dedicated professionals leading our specialized departments and driving youth empowerment.
                </p>
            </motion.div>

            {/* Desktop View: Flattened Grid */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
            >
                {coos.map((member: any) => (
                    <motion.div
                        key={member.name}
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                        }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative glass-panel p-5 md:p-6 rounded-[2rem] flex flex-col items-center text-center dark:hover:bg-white/5 hover:bg-neutral-100 transition-all duration-300 dark:border-white/5 border-neutral-200 border dark:hover:border-pink-500/30 hover:border-pink-500/30 overflow-hidden h-full">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 border-2 dark:border-white/10 border-neutral-200 group-hover:border-pink-500 transition-all duration-500 shadow-xl shrink-0">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <h4 className="dark:text-white text-neutral-900 font-bold text-sm md:text-lg mb-1 group-hover:text-pink-200 transition-colors uppercase tracking-tight line-clamp-1">
                                {member.name}
                            </h4>
                            <span className="text-[8px] md:text-[10px] text-pink-400 font-mono font-bold tracking-widest uppercase py-1 px-3 bg-pink-500/10 rounded-full border border-pink-500/10 mt-auto">
                                {member.role}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Mobile View: Categorized by Department */}
            <div className="flex flex-col gap-12 sm:hidden mb-16">
                {departments.map((dept: Department) => (
                    <div key={dept.id} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 border-b dark:border-white/5 border-neutral-200 pb-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-pink-500 glow-pink"></span>
                            <h3 className="text-sm font-mono text-pink-500 font-bold uppercase tracking-[0.2em]">
                                {dept.name}
                            </h3>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-6">
                            {dept.members.map((member: any) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    <div className="relative glass-panel p-5 rounded-[2rem] flex items-center gap-6 dark:hover:bg-white/5 hover:bg-neutral-100 transition-all duration-300 dark:border-white/5 border-neutral-200 border">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 dark:border-white/10 border-neutral-200 shrink-0">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <h4 className="dark:text-white text-neutral-900 font-bold text-base mb-1 uppercase tracking-tight">
                                                {member.name}
                                            </h4>
                                            <span className="text-[9px] text-pink-400 font-mono font-bold tracking-widest uppercase py-1 px-3 bg-pink-500/10 rounded-full border border-pink-500/10 w-fit">
                                                {member.role}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex justify-center mt-12"
            >
                <Link
                    href="/about#departments"
                    className="group relative px-8 py-4 dark:bg-white/5 bg-neutral-100 dark:hover:bg-white/10 hover:bg-neutral-200 border dark:border-white/10 border-neutral-200 hover:border-pink-500/30 rounded-2xl transition-all duration-300 backdrop-blur-md overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative flex items-center gap-2 dark:text-white text-neutral-900 font-bold uppercase tracking-widest text-sm">
                        Explore Our Departments
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-pink-500" />
                    </span>
                </Link>
            </motion.div>
        </section>
    );
}