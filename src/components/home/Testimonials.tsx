"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { testimonials as mockTestimonials, Testimonial } from "@/data/testimonials";
import { Quote } from "lucide-react";

interface TestimonialsProps {
    initialTestimonials?: Testimonial[];
}

export function Testimonials({ initialTestimonials }: TestimonialsProps) {
    const data = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : mockTestimonials;

    return (
        <section className="relative w-full py-20 overflow-hidden bg-black z-20">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-12 text-center relative z-10">
                <span className="text-pink-500 font-mono text-sm tracking-widest uppercase mb-2 block">
                    Community Voices
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                    What Our Family Says
                </h2>
                <p className="text-neutral-400 max-w-2xl mx-auto">
                    Hear from our alumni, animators, and volunteers about their journey with Manzel Yano.
                </p>
            </div>

            {/* Marquee Section */}
            <div className="relative w-full overflow-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

                <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max px-4">
                    {[...data, ...data].map((item, index) => (
                        <div
                            key={index}
                            className="w-[300px] md:w-[400px] bg-neutral-900/50 border border-white/5 rounded-2xl p-8 backdrop-blur-sm hover:bg-neutral-800/50 transition-colors shrink-0 flex flex-col relative"
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
                                    <h4 className="text-white font-bold text-lg">{item.name}</h4>
                                    <span className="text-pink-400 text-xs font-mono uppercase tracking-wider">
                                        {item.role}
                                    </span>
                                </div>
                            </div>

                            <p className="text-neutral-300 leading-relaxed italic">
                                "{item.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
