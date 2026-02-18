"use client";

import React from "react";
import { ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function About() {
    return (
        <section id="about" className="w-full max-w-[1200px] px-6 py-24 md:py-32 z-20 relative mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-10">
                    <div className="reveal-text reveal-visible">
                        <span className="text-sm font-mono text-pink-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-pink-500"></span> Our Mission
                        </span>
                        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white leading-[0.95]">
                            Building Tomorrow's <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                                Leaders Today.
                            </span>
                        </h2>
                    </div>

                    <div className="space-y-8">
                        <div className="reveal-text reveal-visible delay-100 pl-6 border-l-2 border-pink-500/30">
                            <h3 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                                <ShieldCheck className="text-pink-500" size={24} /> Youth Empowerment
                            </h3>
                            <p className="text-neutral-300 leading-relaxed text-base md:text-lg">
                                Located in Menzel Bourguiba, we foster a spirit of initiative and
                                responsibility. We believe every individual holds the potential to
                                lead and inspire change.
                            </p>
                        </div>

                        <div className="reveal-text reveal-visible delay-200 pl-6 border-l-2 border-purple-500/30">
                            <h3 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                                <Heart className="text-purple-500" size={24} /> Community Service
                            </h3>
                            <p className="text-neutral-300 leading-relaxed text-base md:text-lg">
                                Through volunteering, charity drives, and educational support, we
                                connect with our community. From environmental cleanups to
                                cultural workshops.
                            </p>
                        </div>

                        <div className="reveal-text reveal-visible delay-300 pt-4">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-pink-500 font-bold hover:text-white transition-colors group"
                            >
                                Learn More About Us
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="relative h-[500px] md:h-[650px] w-full rounded-3xl overflow-hidden glass-panel reveal-text reveal-visible delay-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-900/40 z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                    <img
                        src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2649&auto=format&fit=crop"
                        alt="Youth Activities"
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />

                    {/* Overlay Info */}
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]"></div>
                            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#9333ea]"></div>
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <p className="font-mono text-xs text-pink-200 leading-relaxed">
                            &gt; project: education_for_all<br />
                            &gt; status: active<br />
                            &gt; location: Rue Ibn Abi Dhief
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
