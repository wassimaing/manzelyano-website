"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, Users, PartyPopper, Sparkles, Tent, MessagesSquare, Bus, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { events } from "@/data/events";

function Counter({ from, to }: { from: number; to: number }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, to, { duration: 2, ease: "easeOut" });
        return controls.stop;
    }, [to, count]);

    return <motion.span>{rounded}</motion.span>;
}

class TextScramble {
    el: HTMLElement;
    chars: string;
    queue: { from: string; to: string; start: number; end: number; char?: string }[];
    frame: number;
    frameRequest: number;
    resolve: (value?: unknown) => void;

    constructor(el: HTMLElement) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.queue = [];
        this.frame = 0;
        this.frameRequest = 0;
        this.resolve = () => { };
        this.update = this.update.bind(this);
    }

    setText(newText: string) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || "";
            const to = newText[i] || "";
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

export function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const title1Ref = useRef<HTMLSpanElement>(null);

    // Canvas Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width: number, height: number;
        let particles: Particle[] = [];
        const particleCount = 60;
        const connectionDistance = 180;
        const mouseDistance = 250;
        let mouse = { x: -1000, y: -1000 };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            baseColor: string;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 2 + 0.5;
                const colors = [
                    "rgba(236, 72, 153,", // Pink
                    "rgba(147, 51, 234,", // Purple
                    "rgba(255, 255, 255,", // White
                ];
                this.baseColor = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 2;
                    const directionY = forceDirectionY * force * 2;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.baseColor + "0.8)";
                ctx.fill();
            }
        }

        const initCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animateCanvas = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - distance / connectionDistance;
                        ctx.strokeStyle =
                            "rgba(236, 72, 153," + opacity * 0.15 + ")";
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        };

        const handleResize = () => initCanvas();
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        initCanvas();
        animateCanvas();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // 3D Parallax Effect
    useEffect(() => {
        const hero = heroRef.current;
        const content = contentRef.current;
        if (!hero || !content) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (window.innerWidth > 768) {
                const x = (window.innerWidth / 2 - e.clientX) / 50;
                const y = (window.innerHeight / 2 - e.clientY) / 50;
                content.style.transform = `rotateY(${x * -0.5}deg) rotateX(${y * 0.5
                    }deg)`;
            }
        };

        const handleMouseLeave = () => {
            if (window.innerWidth > 768) {
                content.style.transform = `rotateY(0deg) rotateX(0deg)`;
            }
        };

        hero.addEventListener("mousemove", handleMouseMove);
        hero.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            hero.removeEventListener("mousemove", handleMouseMove);
            hero.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Text Scramble Effect
    useEffect(() => {
        if (title1Ref.current) {
            const fx = new TextScramble(title1Ref.current);
            // Wait for initial render
            setTimeout(() => fx.setText("MANZELYANO"), 500);
        }

    }, []);

    return (
        <>
            <canvas id="hero-canvas" ref={canvasRef} className="hero-canvas"></canvas>
            <section
                id="hero"
                ref={heroRef}
                className="relative w-full min-h-screen md:h-[130vh] overflow-hidden flex flex-col items-center justify-center pt-20 perspective-container"
            >
                {/* Vignette & Gradient Overlay */}
                <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black/40 dark:via-black/30 dark:to-[#020202] bg-gradient-to-b from-white/40 via-white/30 to-neutral-50 z-[2] pointer-events-none"></div>
                <div className="absolute inset-0 bg-radial-gradient from-transparent dark:via-black/20 via-white/20 dark:to-black to-white z-[1] pointer-events-none mix-blend-multiply"></div>

                {/* Ambient Glow Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob z-[2]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 z-[2]"></div>

                {/* Parallax Content Container */}
                <div
                    id="hero-content"
                    ref={contentRef}
                    className="relative z-30 flex flex-col items-center text-center w-full px-4 transform-style-3d"
                >
                    {/* CLUB LOGO */}
                    <div
                        className="mb-10 hero-layer relative z-30 animate-float"
                        style={{ transform: "translateZ(60px)" }}
                    >
                        <div className="w-48 h-48 md:w-64 md:h-64 relative group">
                            <div className="absolute inset-0 bg-pink-500/30 blur-[60px] rounded-full group-hover:bg-purple-500/40 transition-all duration-700 animate-pulse-glow"></div>
                            <img
                                src="/images/logo.png"
                                alt="Manzel Yano Bosco Youth Logo"
                                className="relative w-full h-full object-contain glow-logo rounded-3xl drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"
                            />
                        </div>
                    </div>

                    {/* Main Title with Scramble Effect */}
                    <div
                        id="hero-title-group"
                        className="relative mb-8 hero-layer z-30"
                        style={{ transform: "translateZ(80px)" }}
                    >
                        <h1 className="font-display font-bold text-[12vw] md:text-[140px] leading-[0.85] tracking-tighter dark:text-white text-neutral-900 drop-shadow-2xl">
                            <span
                                ref={title1Ref}
                                className="block scramble-text text-transparent bg-clip-text dark:bg-gradient-to-br dark:from-white dark:via-white dark:to-pink-300 bg-gradient-to-br from-neutral-900 via-neutral-800 to-pink-600 drop-shadow-lg"
                            ></span>

                        </h1>
                        <p className="font-display font-semibold text-2xl md:text-4xl tracking-[0.2em] dark:text-white text-neutral-900 mt-4 uppercase glow-text-pink opacity-90">
                            Bosco Youth
                        </p>
                    </div>

                    {/* Subtext */}
                    <div
                        className="relative max-w-2xl mx-auto hero-layer z-30 mt-2"
                        style={{ transform: "translateZ(40px)" }}
                    >
                        <div className="absolute inset-0 dark:bg-black/40 bg-white/40 blur-xl -z-10 rounded-full"></div>
                        <p className="font-sans text-base md:text-xl dark:text-neutral-200 text-neutral-700 leading-relaxed opacity-0 animate-[fadeInUp_1s_ease-out_1.2s_forwards] drop-shadow-md">
                            Empowering Youth in{" "}
                            <span className="text-pink-400 font-semibold">
                                Menzel Bourguiba
                            </span>{" "}
                            through leadership, service, and community excellence.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div
                        className="mt-12 flex flex-col sm:flex-row justify-center gap-5 opacity-0 animate-[fadeInUp_1s_ease-out_1.4s_forwards] hero-layer z-40 w-full sm:w-auto"
                        style={{ transform: "translateZ(70px)" }}
                    >
                        <Link href="/join">
                            <button className="group relative px-8 py-4 dark:bg-white dark:text-black bg-neutral-900 text-white rounded-full text-sm font-bold dark:hover:bg-pink-50 hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 overflow-hidden dark:shadow-[0_0_30px_rgba(236,72,153,0.4)] shadow-[0_0_30px_rgba(236,72,153,0.3)] dark:ring-2 dark:ring-white ring-2 ring-neutral-900">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Join Our Family
                                    <ArrowRight
                                        size={20}
                                        className="transition-transform group-hover:translate-x-1 text-pink-600"
                                    />
                                </span>
                            </button>
                        </Link>
                        <button className="px-8 py-4 dark:bg-white/5 bg-black/5 dark:border-white/10 border-neutral-300 border dark:text-white text-neutral-900 rounded-full text-sm font-semibold dark:hover:bg-white/10 hover:bg-black/10 transition-all dark:hover:border-pink-500/50 hover:border-pink-500/50 backdrop-blur-md flex items-center justify-center gap-2">
                            <Calendar size={20} className="text-purple-400" />
                            Our Activities
                        </button>
                    </div>

                    {/* Floating Elements (Desktop Only) */}
                    {/* Floating Elements (Desktop Only) - Individual Pop-ups */}

                    {/* 1. Active Members - Top Left */}
                    <div
                        className="absolute left-[8%] top-[15%] hidden xl:block hero-layer"
                        style={{ transform: "translateZ(50px) rotateY(5deg)" }}
                    >
                        <div className="dark:bg-[#0a0a0a]/90 bg-white/90 backdrop-blur-md dark:border-white/10 border-neutral-200 border p-5 rounded-2xl w-52 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-3 text-[10px] font-bold dark:text-neutral-400 text-neutral-500 tracking-widest uppercase">
                                <Users size={14} className="text-purple-400" />
                                Community
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-display font-bold dark:text-white text-neutral-900 tracking-tighter">120+</span>
                                <div className="flex items-center gap-1 text-[10px] text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">+15%</div>
                            </div>
                            <p className="text-[11px] dark:text-neutral-500 text-neutral-400 font-bold mt-1 uppercase tracking-wider">Active Members</p>
                        </div>
                    </div>

                    {/* 2. Total Achievements - Top Right */}
                    <div
                        className="absolute right-[8%] top-[20%] hidden xl:block hero-layer"
                        style={{ transform: "translateZ(65px) rotateY(-5deg)" }}
                    >
                        <div className="dark:bg-[#0a0a0a]/90 bg-white/90 backdrop-blur-md dark:border-white/10 border-neutral-200 border p-5 rounded-2xl w-52 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="flex items-center gap-2 mb-3 text-[10px] font-bold dark:text-neutral-400 text-neutral-500 tracking-widest uppercase">
                                <Award size={14} className="text-pink-400" />
                                Achievement
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-display font-bold dark:text-white text-neutral-900 tracking-tighter">
                                    <Counter from={0} to={events.length} />
                                </span>
                                <span className="text-[10px] text-pink-500 font-bold px-2 py-0.5 bg-pink-500/10 rounded-full">DONE</span>
                            </div>
                            <p className="text-[11px] dark:text-neutral-500 text-neutral-400 font-bold mt-1 uppercase tracking-wider">Events Done</p>
                        </div>
                    </div>

                    {/* 3. Workshops - Middle Left */}
                    <div
                        className="absolute left-[5%] top-[45%] hidden xl:block hero-layer"
                        style={{ transform: "translateZ(40px) rotateY(12deg)" }}
                    >
                        <div className="dark:bg-[#0a0a0a]/90 bg-white/90 backdrop-blur-md dark:border-white/10 border-neutral-200 border p-4 rounded-xl w-48 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-pink-500/20 rounded-xl text-pink-400 shadow-lg shadow-pink-500/10">
                                    <Sparkles size={18} />
                                </div>
                                <span className="text-[11px] font-bold dark:text-white text-neutral-900 tracking-[0.25em]">WORKSHOPS</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Summer Camps - Middle Right */}
                    <div
                        className="absolute right-[5%] top-[50%] hidden xl:block hero-layer"
                        style={{ transform: "translateZ(75px) rotateY(-12deg)" }}
                    >
                        <div className="dark:bg-[#0a0a0a]/90 bg-white/90 backdrop-blur-md dark:border-white/10 border-neutral-200 border p-4 rounded-xl w-48 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-400 shadow-lg shadow-purple-500/10">
                                    <Tent size={18} />
                                </div>
                                <span className="text-[11px] font-bold dark:text-white text-neutral-900 tracking-[0.25em]">SUMMERCAMPS</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Meetings - Bottom Left */}
                    <div
                        className="absolute left-[10%] bottom-[15%] hidden xl:block hero-layer"
                        style={{ transform: "translateZ(35px) rotateY(8deg)" }}
                    >
                        <div className="dark:bg-[#0a0a0a]/90 bg-white/90 backdrop-blur-md dark:border-white/10 border-neutral-200 border p-4 rounded-xl w-48 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400 shadow-lg shadow-blue-500/10">
                                    <MessagesSquare size={18} />
                                </div>
                                <span className="text-[11px] font-bold dark:text-white text-neutral-900 tracking-[0.25em]">MEETINGS</span>
                            </div>
                        </div>
                    </div>

                    {/* 6. Trips - Bottom Right */}
                    <div
                        className="absolute right-[12%] bottom-[18%] hidden xl:block hero-layer"
                        style={{ transform: "translateZ(55px) rotateY(-8deg)" }}
                    >
                        <div className="dark:bg-[#0a0a0a]/90 bg-white/90 backdrop-blur-md dark:border-white/10 border-neutral-200 border p-4 rounded-xl w-48 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-yellow-500/20 rounded-xl text-yellow-400 shadow-lg shadow-yellow-500/10">
                                    <Bus size={18} />
                                </div>
                                <span className="text-[11px] font-bold dark:text-white text-neutral-900 tracking-[0.25em]">TRIPS</span>
                            </div>
                        </div>
                    </div>


                    {/* GROUP PHOTO (Background Layer) */}
                    <div
                        className="absolute top-0 left-0 w-full h-full z-0 hero-layer mask-gradient-top pointer-events-none"
                        style={{ transform: "translateZ(0px)" }}
                    >
                        <img
                            src="/images/image.png"
                            alt="Youth Group ManzelYano"
                            className="w-full h-full object-cover opacity-30 dark:opacity-20 grayscale-[20%] scale-105"
                        />
                    </div>
                </div>
            </section>
        </>
    );

}
