"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Testimonial } from "@/data/testimonials";
import { Quote, X } from "lucide-react";

export function Testimonials({ initialTestimonials = [] }: { initialTestimonials?: Testimonial[] }) {
    const testimonials = initialTestimonials;
    const [selectedTestimonial, setSelectedTestimonial] = React.useState<Testimonial | null>(null);
    const [isMobile, setIsMobile] = React.useState(false);

    // Track screen size for responsive animations
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Disable scrolling when modal is open
    React.useEffect(() => {
        if (selectedTestimonial) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedTestimonial]);

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

            {/* Scrollable Container with Auto-scroll */}
            <div className="relative w-full overflow-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 dark:bg-gradient-to-r dark:from-black dark:to-transparent bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 dark:bg-gradient-to-l dark:from-black dark:to-transparent bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

                <div
                    className="flex gap-6 items-center overflow-x-auto no-scrollbar py-4 px-6 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
                    onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
                    onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
                >
                    <div className="flex gap-6 animate-marquee-reverse hover:[animation-play-state:paused] w-max">
                        {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedTestimonial(item)}
                                className="w-[300px] md:w-[400px] dark:bg-neutral-900/50 bg-neutral-100/80 dark:border-white/5 border-neutral-200 border rounded-2xl p-8 backdrop-blur-sm dark:hover:bg-neutral-800/50 hover:bg-neutral-200/80 transition-all shrink-0 flex flex-col relative snap-center cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
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

                                <p className="dark:text-neutral-300 text-neutral-600 leading-relaxed italic line-clamp-4">
                                    "{item.text}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonial Detailed View Modal */}
            <AnimatePresence>
                {selectedTestimonial && (
                    <div className={`fixed inset-0 z-[100] flex ${isMobile ? 'items-end' : 'items-center'} justify-center p-0 sm:p-10 pointer-events-auto`}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                            onClick={() => setSelectedTestimonial(null)}
                        />
                        <motion.div
                            initial={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0, y: 30 }}
                            animate={isMobile ? { y: 0 } : { scale: 1, opacity: 1, y: 0 }}
                            exit={isMobile ? { y: "100%" } : { scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className={`relative max-w-xl w-full bg-card/90 ${isMobile ? 'rounded-t-[2rem] rounded-b-none border-x border-t' : 'rounded-[3rem] border'} overflow-hidden border-border shadow-2xl z-10 flex flex-col backdrop-blur-md ${isMobile ? 'max-h-[80vh] overflow-y-auto' : ''}`}
                        >
                            <button
                                onClick={() => setSelectedTestimonial(null)}
                                className="absolute top-6 right-6 p-2 bg-muted/40 hover:bg-muted text-foreground rounded-full backdrop-blur-md z-30 transition-all border border-border"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="p-8 md:p-12 relative">
                                <Quote className="absolute top-10 right-10 text-foreground/5" size={80} />

                                <div className="flex items-center gap-6 mb-10 relative z-10">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500/20 shadow-xl">
                                        <img
                                            src={selectedTestimonial.image}
                                            alt={selectedTestimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-1">{selectedTestimonial.name}</h3>
                                        <span className="text-pink-500 font-mono text-xs uppercase tracking-[0.2em] font-bold">
                                            {selectedTestimonial.role}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <p className="text-foreground/90 text-lg md:text-xl leading-relaxed italic font-medium">
                                        "{selectedTestimonial.text}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}