"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { events } from "@/data/events";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function EventsPage() {
    return (
        <>
            <Navbar />
            <main className="w-full min-h-screen pt-32 pb-20 px-6 relative z-10 flex flex-col items-center">
                {/* Background Elements */}
                <div className="fixed inset-0 bg-neutral-950 -z-20"></div>
                <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent -z-10 pointer-events-none"></div>

                <div className="max-w-[1200px] w-full">
                    {/* Header */}
                    <div className="text-center mb-16 reveal-text reveal-visible">
                        <span className="text-sm font-mono text-pink-500 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                            <span className="w-8 h-[1px] bg-pink-500"></span> Upcoming Activities
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-6">
                            Events <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Calendar</span>
                        </h1>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                            Join us in our journey of impact. Browse our upcoming events and be part of the change in Menzel Bourguiba.
                        </p>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <Link href={`/events/${event.id}`} key={event.id} className="group">
                                <div className="bg-neutral-900/50 border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-900/20 h-full flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute top-4 left-4 z-10">
                                            <Badge variant="secondary" className="bg-black/60 backdrop-blur-md text-white border-white/10 hover:bg-black/80">
                                                {event.category}
                                            </Badge>
                                        </div>
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-mono text-pink-400 bg-pink-500/10 px-2 py-1 rounded border border-pink-500/20">
                                                {event.date}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-200 transition-colors">
                                            {event.title}
                                        </h3>

                                        <div className="text-neutral-400 text-sm flex items-center gap-2 mb-6">
                                            <MapPin size={16} className="text-neutral-500" />
                                            {event.location}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-sm font-medium">
                                            <span className="text-white group-hover:text-pink-400 transition-colors">View Details</span>
                                            <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
