"use client";

import React from "react";
import { MapPin, Home, Info, Calendar, Users, Mail, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer id="contact" className="w-full dark:bg-[#050505] bg-neutral-50 border-t dark:border-white/10 border-neutral-200 pt-20 pb-10 mt-12 relative z-20">
            {/* Subtle gradient glow at top of footer */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>

            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Address */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-4 mb-6">
                            {/* Small Logo Icon */}
                            <div className="w-12 h-12 rounded-xl dark:bg-white bg-neutral-100 p-1 dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] shadow-lg">
                                <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight dark:text-white text-neutral-900">
                                MANZELYANO
                            </span>
                        </div>
                        <div className="text-sm dark:text-neutral-400 text-neutral-500 space-y-3 leading-relaxed">
                            <p className="font-semibold dark:text-white text-neutral-900 flex items-center gap-2">
                                <MapPin className="text-pink-500" size={16} /> Headquarters:
                            </p>
                            <p className="pl-6">
                                École "les soeurs" menzel bourguiba,<br />
                                5Q5V+F7H rue d'amour,<br />
                                Rue Ibn Abi Dhief,<br />
                                Menzel Bourguiba, Tunisia
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block mb-6">
                            Navigation
                        </span>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 transition-colors flex items-center gap-2"
                                >
                                    <Home size={16} /> Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 transition-colors flex items-center gap-2"
                                >
                                    <Info size={16} /> About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/events"
                                    className="text-sm dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 transition-colors flex items-center gap-2"
                                >
                                    <Calendar size={16} /> Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/join"
                                    className="text-sm dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 transition-colors flex items-center gap-2"
                                >
                                    <Users size={16} /> Join Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <span className="text-xs font-bold text-pink-500 uppercase tracking-widest block mb-6">
                            Connect
                        </span>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 text-sm dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 transition-colors"
                                >
                                    <Facebook size={16} /> Facebook
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 text-sm dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 transition-colors"
                                >
                                    <Instagram size={16} /> Instagram
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 text-sm dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 transition-colors group"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-4 h-4 dark:text-neutral-400 text-neutral-500 dark:group-hover:text-white group-hover:text-neutral-900"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-1.13-.31-2.34-.25-3.41.33-.71.38-1.27 1.03-1.51 1.81-.26.78-.17 1.69.21 2.39.42.83 1.22 1.44 2.12 1.61.93.18 1.91-.01 2.69-.54.78-.54 1.24-1.44 1.3-2.39.06-2.85.03-5.7.03-8.55V0z" />
                                    </svg>
                                    TikTok
                                </a>
                            </li>

                            <li>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&to=manzelyanoboscoyouth@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 transition-colors"
                                >
                                    <Mail size={16} className="dark:text-white text-neutral-900" /> Email
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="col-span-1 h-48 rounded-2xl overflow-hidden dark:border-white/10 border-neutral-200 border relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.589884488358!2d9.855000000000001!3d37.15500000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA5JzE4LjAiTiA5wrA1MScxOC4wIkU!5e0!3m2!1sen!2stn!4v1620000000000!5m2!1sen!2stn"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                        <div className="absolute inset-0 bg-pink-500/10 pointer-events-none group-hover:bg-transparent transition-colors"></div>
                    </div>
                </div>

                <div className="pt-8 border-t dark:border-white/5 border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
                        © 2024 MANZEL YANO Bosco Youth. All rights reserved.
                    </p>
                    <div className="flex gap-4 items-center px-3 py-1 dark:bg-white/5 bg-neutral-100 rounded-full dark:border-white/5 border-neutral-200 border">
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                            <div className="relative w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                            Systems Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
