"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
                "fixed top-6 left-1/2 -translate-x-1/2 h-16 md:h-20 rounded-full z-50 flex items-center justify-center glass-pill px-4 transition-all duration-700 w-[95%] max-w-[800px] shadow-2xl shadow-black/50 backdrop-blur-sm",
                scrolled ? "bg-black/80 border-white/20" : ""
            )}
        >
            <div className="flex items-center justify-between w-full relative overflow-x-auto no-scrollbar md:overflow-visible md:justify-center px-2">
                <div
                    id="nav-left"
                    className="flex items-center gap-2 md:gap-4 transition-all duration-700 shrink-0"
                >
                    <Link
                        href="/about"
                        className="px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer header-link whitespace-nowrap"
                    >
                        About
                    </Link>
                    <Link
                        href="/events"
                        className="px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer header-link whitespace-nowrap"
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
                        className="px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer header-link whitespace-nowrap"
                    >
                        Team
                    </Link>
                    <Link
                        href="/join"
                        className="px-3 md:px-5 py-2 rounded-full text-sm md:text-base font-semibold text-pink-400 hover:text-white hover:bg-pink-500/20 transition-colors cursor-pointer header-link whitespace-nowrap"
                    >
                        Join
                    </Link>
                </div>
            </div>
        </header>
    );
}
