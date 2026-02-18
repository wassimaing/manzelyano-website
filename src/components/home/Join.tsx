"use client";

import React from "react";
import { MessageCircle, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Join() {
    return (
        <section id="join" className="w-full max-w-[1200px] px-6 py-32 z-20 mx-auto">
            <div className="glass-panel rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-pink-900/10 border border-white/10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="flex flex-col md:flex-row gap-16 relative z-10">
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <div className="reveal-text reveal-visible">
                            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-none">
                                Become a <br />
                                <span className="text-pink-500">Changemaker.</span>
                            </h2>
                            <p className="text-neutral-200 leading-relaxed mb-10 text-lg">
                                Whether you want to develop leadership skills, make new friends,
                                or give back to Menzel Bourguiba, there is a place for you in our
                                family.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    className="px-8 py-6 rounded-full font-bold text-sm bg-white text-black hover:bg-pink-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    asChild
                                >
                                    <a href="mailto:contact@manzelyano.tn">
                                        <Mail className="mr-2" size={20} /> Email Us
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 bg-black/60 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl reveal-text reveal-visible delay-200 shadow-2xl">
                        <form className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold ml-1">
                                    Full Name
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:bg-white/10 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold ml-1">
                                        Date of Birth
                                    </label>
                                    <Input
                                        type="date"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:bg-white/10 focus-visible:ring-pink-500 text-sm py-6 rounded-xl block"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold ml-1">
                                        Institute / University
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Where do you study?"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:bg-white/10 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold ml-1">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:bg-white/10 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold ml-1">
                                    Social Media / Portfolio (Optional)
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Link to your work or profile"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:bg-white/10 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold ml-1">
                                    Tell us about yourself
                                </label>
                                <Textarea
                                    rows={3}
                                    placeholder="What motivates you to join Manzelyano?"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 focus-visible:bg-white/10 focus-visible:ring-pink-500 text-sm rounded-xl"
                                />
                            </div>

                            <Button
                                type="button"
                                className="w-full py-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold shadow-[0_0_25px_rgba(236,72,153,0.4)] mt-4 group"
                            >
                                Submit Application
                                <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
