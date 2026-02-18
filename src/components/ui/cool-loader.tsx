"use client";

import React from "react";
import { motion } from "framer-motion";

export function CoolLoader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl"
        >
            {/* Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"
            />

            <div className="relative flex flex-col items-center gap-8">
                {/* Logo Container */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-32 h-32 md:w-48 md:h-48"
                >
                    <img
                        src="/images/logo.png"
                        alt="Manzel Yano Logo"
                        className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]"
                    />
                </motion.div>

                {/* Loader Bar */}
                <div className="flex flex-col items-center gap-4 w-64">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"
                        />
                    </div>

                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xs font-mono text-pink-400 tracking-[0.2em] uppercase"
                    >
                        Loading Experience
                    </motion.span>
                </div>
            </div>
        </motion.div>
    );
}
