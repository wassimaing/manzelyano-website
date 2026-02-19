"use client";

import React from "react";
import { ArrowRight, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { Event, events } from "@/data/events";

interface EventsProps {
    initialEvents?: Event[];
}

export function Events({ initialEvents }: EventsProps) {
    const data = initialEvents && initialEvents.length > 0 ? initialEvents : events;
    const featuredEvent = data[0];

    if (!featuredEvent) return null;

    return (
        <section id="events" className="relative w-full py-16 md:py-24 px-4 md:px-8 z-20">
            <div className="max-w-7xl mx-auto">

                {/* Featured Event Card */}
                <div className="relative w-full rounded-2xl bg-[#0a0a0a] border border-white/8 overflow-hidden mb-4 shadow-2xl shadow-black/50">

                    {/* Event Background Image (Blurry Ambient Effect) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                        <img
                            src={featuredEvent.image}
                            alt=""
                            className="w-full h-full object-cover opacity-[0.75] blur-[4px] scale-150 rotate-3"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a]" />
                    </div>

                    {/* Ambient glow */}
                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none z-[1]" />
                    <div className="absolute -bottom-10 right-10 w-56 h-56 bg-pink-600/5 rounded-full blur-[60px] pointer-events-none z-[1]" />

                    <div className="relative z-10 p-6 sm:p-8 md:p-12">

                        {/* Top meta row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/15 text-pink-400 text-[10px] font-bold tracking-[0.15em] uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                                Featured Event
                            </span>
                            <span className="text-neutral-500 font-mono text-xs">{featuredEvent.date}</span>
                        </div>

                        {/* Content grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">

                            {/* Left: Title + description */}
                            <div>
                                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-5">
                                    {featuredEvent.title}
                                </h2>
                                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl line-clamp-3">
                                    {featuredEvent.overview}
                                </p>
                                {featuredEvent.location && (
                                    <p className="mt-4 text-neutral-500 text-xs flex items-center gap-1.5">
                                        <MapPin size={12} className="text-pink-500" />
                                        {featuredEvent.location}
                                    </p>
                                )}
                            </div>

                            {/* Right: Single CTA */}
                            <div className="w-full lg:w-auto">
                                <Link href={`/events/${featuredEvent.id}`}>
                                    <button className="group flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-black rounded-xl font-semibold text-sm hover:bg-neutral-100 transition-all w-full shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] lg:min-w-[200px]">
                                        View Details
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-pink-600" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Calendar strip */}
                <div className="relative w-full rounded-2xl bg-[#0a0a0a] border border-white/8 overflow-hidden">

                    {/* Calendar header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold flex items-center gap-2">
                            <Calendar size={13} className="text-neutral-400" />
                            Activity Calendar
                        </span>
                        <Link href="/events" className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                            View all
                            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Marquee row */}
                    <div className="relative overflow-hidden py-5">
                        {/* Edge fade overlays */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused] items-center px-4">
                            {data.map((event, index) => (
                                <Link key={index} href={`/events/${event.id}`} className="shrink-0">
                                    <div
                                        className={cn(
                                            "w-64 sm:w-72 p-5 bg-white/3 border border-white/6 rounded-xl flex flex-col justify-between hover:bg-white/6 transition-all cursor-pointer group/card relative overflow-hidden",
                                            event.color === "pink" && "hover:border-pink-500/30",
                                            event.color === "purple" && "hover:border-purple-500/30",
                                            event.color === "blue" && "hover:border-blue-500/30",
                                            event.color === "yellow" && "hover:border-yellow-500/30"
                                        )}
                                    >
                                        <div className="absolute top-3 right-3 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                            <ArrowUpRight size={14} className="text-neutral-400" />
                                        </div>

                                        <span
                                            className={cn(
                                                "inline-block text-[10px] font-mono px-2 py-0.5 rounded border mb-3 w-fit",
                                                event.color === "pink" && "text-pink-300 bg-pink-500/10 border-pink-500/20",
                                                event.color === "purple" && "text-purple-300 bg-purple-500/10 border-purple-500/20",
                                                event.color === "blue" && "text-blue-300 bg-blue-500/10 border-blue-500/20",
                                                event.color === "yellow" && "text-yellow-300 bg-yellow-500/10 border-yellow-500/20"
                                            )}
                                        >
                                            {event.date}
                                        </span>

                                        <h4
                                            className={cn(
                                                "text-white font-medium text-base leading-snug mb-2 line-clamp-2 transition-colors",
                                                event.color === "pink" && "group-hover/card:text-pink-200",
                                                event.color === "purple" && "group-hover/card:text-purple-200",
                                                event.color === "blue" && "group-hover/card:text-blue-200",
                                                event.color === "yellow" && "group-hover/card:text-yellow-200"
                                            )}
                                        >
                                            {event.title}
                                        </h4>

                                        <p className="text-neutral-600 text-[11px] flex items-center gap-1 mt-auto">
                                            <MapPin size={10} />
                                            {event.location}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
