"use client";

import React from "react";
import { ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export function About() {
    return (
        <section id="about" className="w-full max-w-[1200px] px-6 py-24 md:py-32 z-20 relative mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-sm font-mono text-pink-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-pink-500"></span> Our Mission
                        </span>
                        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight dark:text-white text-neutral-900 leading-[0.95]">
                            Building Tomorrow's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                Leaders Today.
                            </span>
                        </h2>
                    </motion.div>

                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="pl-6 border-l-2 border-pink-500/30"
                        >
                            <h3 className="text-2xl font-semibold dark:text-white text-neutral-900 mb-3 flex items-center gap-2">
                                <ShieldCheck className="text-pink-500" size={24} /> Youth Empowerment
                            </h3>
                            <p className="dark:text-neutral-300 text-neutral-600 leading-relaxed text-base md:text-lg">
                                Located in Menzel Bourguiba, we foster a spirit of initiative and
                                responsibility. We believe every individual holds the potential to
                                lead and inspire change.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="pl-6 border-l-2 border-purple-500/30"
                        >
                            <h3 className="text-2xl font-semibold dark:text-white text-neutral-900 mb-3 flex items-center gap-2">
                                <Heart className="text-purple-500" size={24} /> Community Service
                            </h3>
                            <p className="dark:text-neutral-300 text-neutral-600 leading-relaxed text-base md:text-lg">
                                Through volunteering, charity drives, and educational support, we
                                connect with our community. From environmental cleanups to
                                cultural workshops.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="pt-4"
                        >
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-pink-500 font-bold dark:hover:text-white hover:text-neutral-900 transition-colors group"
                            >
                                Learn More About Us
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative h-[300px] md:h-[650px] md:w-[700px] w-full rounded-3xl overflow-hidden glass-panel group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-900/40 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                    <img
                        src="images/photo1.jpeg"
                        alt="Youth Activities"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />

                    {/* Overlay Info */}
                    <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 p-3 md:p-6 dark:bg-black/70 bg-white/70 backdrop-blur-xl dark:border-white/10 border-neutral-200 border rounded-xl md:rounded-2xl z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]"></div>
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#9333ea]"></div>
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full dark:bg-white bg-neutral-900"></div>
                        </div>
                        <p className="font-mono text-[10px] md:text-xs dark:text-pink-200 text-pink-700 leading-relaxed font-bold">
                            &gt; project: education_for_all<br />
                            &gt; status: active<br />
                            &gt; location: école "Les Soeurs" Menzel Bourguiba
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}