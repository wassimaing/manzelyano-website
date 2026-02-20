"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            id="main-header"
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 h-16 md:h-20 rounded-full z-50 flex items-center justify-center px-4 transition-all duration-700 w-[95%] max-w-[800px] shadow-2xl backdrop-blur-sm",
                "dark:shadow-black/50 shadow-neutral-300/50",
                "glass-pill",
                scrolled ? "dark:bg-black/80 bg-white/80 dark:border-white/20 border-neutral-300" : ""
            )}
        >
            <div className="flex items-center justify-between w-full relative overflow-x-auto no-scrollbar md:overflow-visible md:justify-center px-2">
                <div
                    id="nav-left"
                    className="flex items-center gap-2 md:gap-4 transition-all duration-700 shrink-0"
                >
                    <Link
                        href="/about"
                        className="px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-medium dark:text-neutral-300 text-neutral-600 dark:hover:text-white hover:text-neutral-900 dark:hover:bg-white/5 hover:bg-black/5 transition-colors cursor-pointer header-link whitespace-nowrap"
                    >
                        About
                    </Link>
                    <Link
                        href="/events"
                        className="px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-medium dark:text-neutral-300 text-neutral-600 dark:hover:text-white hover:text-neutral-900 dark:hover:bg-white/5 hover:bg-black/5 transition-colors cursor-pointer header-link whitespace-nowrap"
                    >
                        Events
                    </Link>
                </div>

                <div
                    id="header-logo-wrapper"
                    className="overflow-hidden transition-all duration-700 flex justify-center items-center shrink-0 mx-4 w-18 md:w-30 opacity-100"
                >
                    <Link href="/" className="block w-full h-full hover:scale-105 transition-transform">
                        <img
                            src="/images/logo.png"
                            alt="ManzelYano Logo"
                            className="w-full h-full object-contain"
                        />
                    </Link>
                </div>

                <div
                    id="nav-right"
                    className="flex items-center gap-2 md:gap-4 transition-all duration-700 shrink-0"
                >
                    <Link
                        href="/#team"
                        className="px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-medium dark:text-neutral-300 text-neutral-600 dark:hover:text-white hover:text-neutral-900 dark:hover:bg-white/5 hover:bg-black/5 transition-colors cursor-pointer header-link whitespace-nowrap"
                    >
                        Team
                    </Link>
                    <Link
                        href="/join"
                        className="px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-semibold text-pink-400 dark:hover:text-white hover:text-pink-600 dark:hover:bg-pink-500/20 hover:bg-pink-500/10 transition-colors cursor-pointer header-link whitespace-nowrap"
                    >
                        Join
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}