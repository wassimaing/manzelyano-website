"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-react";

export function Testimonials() {
    return (
        <section className="relative w-full py-20 overflow-hidden dark:bg-black bg-white z-20">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-6 mb-12 text-center relative z-10"
            >
                <span className="text-pink-500 font-mono text-sm tracking-widest uppercase mb-2 block">
                    Community Voices
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold dark:text-white text-neutral-900 mb-6">
                    What Our Family Says
                </h2>
                <p className="dark:text-neutral-400 text-neutral-600 max-w-2xl mx-auto">
                    Hear from our alumni, animators, and volunteers about their journey with Manzel Yano.
                </p>
            </motion.div>

            {/* Marquee Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative w-full overflow-hidden group"
            >
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 dark:bg-gradient-to-r dark:from-black dark:to-transparent bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 dark:bg-gradient-to-l dark:from-black dark:to-transparent bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

                <motion.div
                    className="flex gap-6 items-center w-max"
                    animate={{
                        x: ["0%", "-25%"],
                    }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, index) => (
                        <div
                            key={index}
                            className="w-[300px] md:w-[400px] dark:bg-neutral-900/50 bg-neutral-100/80 dark:border-white/5 border-neutral-200 border rounded-2xl p-8 backdrop-blur-sm dark:hover:bg-neutral-800/50 hover:bg-neutral-200/80 transition-colors shrink-0 flex flex-col relative"
                        >
                            <Quote className="absolute top-6 right-6 dark:text-white/5 text-neutral-200" size={40} />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full overflow-hidden dark:border-white/10 border-neutral-200 border">
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

                            <p className="dark:text-neutral-300 text-neutral-600 leading-relaxed italic">
                                "{item.text}"
                            </p>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}

