"use client";

import React from "react";
import { motion } from "framer-motion";
import { Event } from "@/data/events";
import { Camera } from "lucide-react";

interface MemoriesProps {
    events: Event[];
}

export function Memories({ events }: MemoriesProps) {
    // Collect all gallery images from all events
    const allPhotos = events.flatMap((event) =>
        (event.gallery || []).map((img) => ({
            src: img,
            title: event.title,
        }))
    );

    // Also include event cover images
    const coverPhotos = events.map((event) => ({
        src: event.image,
        title: event.title,
    }));

    const combined = [...allPhotos, ...coverPhotos].filter((p) => p.src);

    // If not enough photos, don't render
    if (combined.length < 4) return null;

    // Shuffle deterministically and split into 3 rows
    const shuffled = [...combined].sort(() => 0.5 - Math.random());
    const rowSize = Math.ceil(shuffled.length / 3);
    const row1 = shuffled.slice(0, rowSize);
    const row2 = shuffled.slice(rowSize, rowSize * 2);
    const row3 = shuffled.slice(rowSize * 2);

    return (
        <section className="relative w-full py-20 md:py-32 overflow-hidden z-20">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px]" />
            </div>

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 relative z-10 px-4"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border dark:border-white/10 border-neutral-200 dark:bg-white/5 bg-neutral-50 mb-6">
                    <Camera size={14} className="text-pink-500" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] dark:text-neutral-400 text-neutral-500">
                        Gallery
                    </span>
                </div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight dark:text-white text-neutral-900 leading-[1.05]">
                    Creating Memories
                    <br />
                    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                        Since 2019
                    </span>
                </h2>
            </motion.div>

            {/* Photo Rows */}
            <div className="space-y-4 md:space-y-6 relative z-10">
                {/* Row 1 - slides right */}
                <PhotoRow photos={row1} direction="right" speed={35} />
                {/* Row 2 - slides left */}
                <PhotoRow photos={row2} direction="left" speed={40} />
                {/* Row 3 - slides right (slower) */}
                <PhotoRow photos={row3} direction="right" speed={50} />
            </div>

            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 dark:bg-gradient-to-r dark:from-[var(--background)] dark:to-transparent bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 dark:bg-gradient-to-l dark:from-[var(--background)] dark:to-transparent bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
        </section>
    );
}

function PhotoRow({
    photos,
    direction,
    speed,
}: {
    photos: { src: string; title: string }[];
    direction: "left" | "right";
    speed: number;
}) {
    // Duplicate for seamless loop
    const duplicated = [...photos, ...photos, ...photos, ...photos];
    const isLeft = direction === "left";

    return (
        <div className="relative overflow-hidden">
            <motion.div
                className="flex gap-3 md:gap-4 w-max"
                animate={{ x: isLeft ? ["0%", "-25%"] : ["-25%", "0%"] }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {duplicated.map((photo, index) => (
                    <div
                        key={index}
                        className="relative shrink-0 w-48 h-32 sm:w-56 sm:h-36 md:w-72 md:h-48 lg:w-80 lg:h-52 rounded-xl md:rounded-2xl overflow-hidden group"
                    >
                        <img
                            src={photo.src}
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                            <span className="text-white text-xs md:text-sm font-medium truncate">
                                {photo.title}
                            </span>
                        </div>
                        {/* Subtle border */}
                        <div className="absolute inset-0 rounded-xl md:rounded-2xl border dark:border-white/10 border-neutral-200/50 pointer-events-none" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
