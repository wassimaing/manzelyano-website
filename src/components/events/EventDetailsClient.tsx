"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, MapPin, Clock, ArrowLeft, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { cn, formatEventDate, formatEventTime } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Event } from "@/data/events";

interface EventDetailsClientProps {
    event: Event;
}

export function EventDetailsClient({ event }: EventDetailsClientProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const displayDate = formatEventDate(event.startDate, event.endDate, event.date);
    const displayTime = formatEventTime(event.timeline);

    return (
        <>
            <main className="w-full min-h-screen bg-black relative z-10">
                {/* Banner/Hero Section */}
                <div className="relative h-[60vh] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-6 pb-12">
                        <Link
                            href="/events"
                            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" /> Back to Events
                        </Link>
                        <div className="flex flex-wrap gap-4 mb-4">
                            <Badge
                                variant="outline"
                                className={cn(
                                    "bg-black/40 backdrop-blur-md border px-3 py-1 text-sm",
                                    event.color === "pink" && "border-pink-500/50 text-pink-300",
                                    event.color === "purple" && "border-purple-500/50 text-purple-300",
                                    event.color === "blue" && "border-blue-500/50 text-blue-300",
                                    event.color === "yellow" && "border-yellow-500/50 text-yellow-300"
                                )}
                            >
                                {event.category}
                            </Badge>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            {event.title}
                        </h1>
                        <div className="flex flex-col md:flex-row gap-6 text-neutral-300 text-lg">
                            <div className="flex items-center gap-2">
                                <Calendar size={20} className="text-pink-500" />
                                {displayDate}
                                {displayTime && ` • ${displayTime}`}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={20} className="text-purple-500" />
                                {event.location}
                            </div>
                            {event.durationDays && (
                                <div className="flex items-center gap-2">
                                    <Clock size={20} className="text-blue-500" />
                                    {event.durationDays} {event.durationDays === 1 ? 'Day' : 'Days'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                <div className="container mx-auto px-6 py-12 max-w-5xl">
                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="bg-neutral-900/50 border border-white/10 p-1 rounded-full mb-12 w-full md:w-auto inline-flex h-auto">
                            <TabsTrigger
                                value="overview"
                                className="rounded-full px-8 py-3 text-base data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(236,72,153,0.3)] text-neutral-400 transition-all"
                            >
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="timeline"
                                className="rounded-full px-8 py-3 text-base data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(147,51,234,0.3)] text-neutral-400 transition-all"
                            >
                                Timeline
                            </TabsTrigger>
                            <TabsTrigger
                                value="gallery"
                                className="rounded-full px-8 py-3 text-base data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(37,99,235,0.3)] text-neutral-400 transition-all"
                            >
                                Gallery
                            </TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="md:col-span-2">
                                    <h3 className="text-2xl font-bold text-white mb-6">About the Event</h3>
                                    <div className="prose prose-invert prose-lg text-neutral-300 leading-relaxed whitespace-pre-line">
                                        {event.overview}
                                    </div>
                                </div>

                                <div className="md:col-span-1 space-y-6">
                                    <div className="p-6 bg-neutral-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
                                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                            <Clock size={18} className="text-pink-500" /> Date & Time
                                        </h4>
                                        <p className="text-neutral-300 font-bold">{displayDate}</p>
                                        {displayTime && (
                                            <p className="text-neutral-400 font-medium mt-1">
                                                {displayTime}
                                            </p>
                                        )}
                                    </div>

                                    <div className="p-6 bg-neutral-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
                                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                            <MapPin size={18} className="text-purple-500" /> Location
                                        </h4>
                                        <p className="text-neutral-300">{event.location}</p>
                                        <div className="mt-4 h-32 rounded-lg overflow-hidden bg-neutral-800 relative">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.589884488358!2d9.855000000000001!3d37.15500000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA5JzE4LjAiTiA5wrA1MScxOC4wIkU!5e0!3m2!1sen!2stn!4v1620000000000!5m2!1sen!2stn"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
                                                loading="lazy"
                                                title="Event Location"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Timeline Tab */}
                        <TabsContent value="timeline" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="max-w-3xl">
                                <h3 className="text-2xl font-bold text-white mb-8">Event Schedule</h3>
                                <div className="relative border-l border-white/10 pl-8 ml-4 space-y-12">
                                    {(event.timeline || []).map((item, index) => (
                                        <div key={index} className="relative group">
                                            <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-neutral-900 border-2 border-white/20 group-hover:border-pink-500 group-hover:bg-pink-500/20 transition-all"></div>
                                            <span className="text-pink-400 font-mono text-sm mb-1 block">{item.time}</span>
                                            <h4 className="text-xl font-semibold text-white group-hover:text-pink-200 transition-colors">{item.activity}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        {/* Gallery Tab */}
                        <TabsContent value="gallery" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-2xl font-bold text-white mb-8">Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(event.gallery || []).map((img, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer"
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Gallery ${index}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-md">View</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Image Lightbox Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                                onClick={() => setSelectedImage(null)}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative max-w-5xl w-full max-h-[85vh] bg-neutral-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-10 flex items-center justify-center"
                            >
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md z-20 transition-all border border-white/10"
                                >
                                    <X size={24} />
                                </button>
                                <img
                                    src={selectedImage}
                                    alt="Gallery Preview"
                                    className="max-w-full max-h-full object-contain p-2"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main >
        </>
    );
}
