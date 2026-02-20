"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Send, ArrowLeft, Sparkles, Heart, Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { submitApplication } from "@/lib/actions";
import { ResponsiveModal } from "@/components/admin/ResponsiveModal";
import { CheckCircle2, RotateCcw } from "lucide-react";

export default function JoinPage() {
    const [submitting, setSubmitting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
        fullName: "",
        dob: "",
        institute: "",
        email: "",
        portfolio: "",
        aboutMe: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const result = await submitApplication(formData);
            if (result.success) {
                setSuccess(true);
                setFormData({
                    fullName: "",
                    dob: "",
                    institute: "",
                    email: "",
                    portfolio: "",
                    aboutMe: ""
                });
            } else {
                alert(`Application Error: ${result.error || "Unknown error occurred."}`);
            }
        } catch (error) {
            console.error(error);
            alert("Application failed. Please check your connection.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen dark:bg-black bg-white pt-32 pb-20 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>
                </div>

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center dark:text-neutral-400 text-neutral-500 dark:hover:text-white hover:text-neutral-900 mb-12 transition-colors group"
                    >
                        <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                        Back to Home
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Side: Text & Perks */}
                        <div className="space-y-10">
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="font-display text-6xl md:text-8xl font-bold tracking-tight dark:text-white text-neutral-900 mb-8 leading-[0.9]"
                                >
                                    Join the <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Family.</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl dark:text-neutral-400 text-neutral-600 leading-relaxed max-w-lg"
                                >
                                    Start your journey with Manzelyano Bosco Youth. Develop your talents, serve your community, and build memories that last a lifetime.
                                </motion.p>
                            </div>

                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.15
                                        }
                                    }
                                }}
                                className="space-y-6"
                            >
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="flex gap-4 p-5 rounded-2xl dark:bg-white/5 bg-neutral-50 border dark:border-white/10 border-neutral-200 dark:hover:border-pink-500/30 hover:border-pink-500/30 transition-colors group"
                                >
                                    <div className="p-3 bg-pink-500/10 rounded-xl text-pink-500 group-hover:scale-110 transition-transform">
                                        <Heart size={24} />
                                    </div>
                                    <div>
                                        <h3 className="dark:text-white text-neutral-900 font-bold mb-1">Passionate Community</h3>
                                        <p className="text-sm dark:text-neutral-400 text-neutral-500">Join 120+ members who share the same values and drive.</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="flex gap-4 p-5 rounded-2xl dark:bg-white/5 bg-neutral-50 border dark:border-white/10 border-neutral-200 dark:hover:border-purple-500/30 hover:border-purple-500/30 transition-colors group"
                                >
                                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 group-hover:scale-110 transition-transform">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h3 className="dark:text-white text-neutral-900 font-bold mb-1">Personal Growth</h3>
                                        <p className="text-sm dark:text-neutral-400 text-neutral-500">Workshops and trainings to help you become a better leader.</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="flex gap-4 p-5 rounded-2xl dark:bg-white/5 bg-neutral-50 border dark:border-white/10 border-neutral-200 dark:hover:border-blue-500/30 hover:border-blue-500/30 transition-colors group"
                                >
                                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h3 className="dark:text-white text-neutral-900 font-bold mb-1">Meaningful Impact</h3>
                                        <p className="text-sm dark:text-neutral-400 text-neutral-500">Participate in projects that actually help Menzel Bourguiba.</p>
                                    </div>
                                </motion.div>
                            </motion.div>

                        </div>

                        {/* Right Side: Large Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="dark:bg-[#0a0a0a] bg-white dark:border-white/10 border-neutral-200 border rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                            <h2 className="text-3xl font-bold dark:text-white text-neutral-900 mb-10 relative z-10 flex items-center gap-3">
                                Application Form
                                <span className="h-[2px] w-12 bg-pink-500 rounded-full"></span>
                            </h2>

                            <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                                <div className="space-y-2.5">
                                    <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1">
                                        Full Name
                                    </label>
                                    <Input
                                        required
                                        type="text"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        placeholder="Enter your full name"
                                        className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-700 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-base py-7 rounded-2xl"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                    <div className="space-y-2.5">
                                        <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1">
                                            Date of Birth
                                        </label>
                                        <Input
                                            required
                                            type="date"
                                            value={formData.dob}
                                            onChange={e => setFormData({ ...formData, dob: e.target.value })}
                                            className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-base py-7 rounded-2xl"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1 text-nowrap">
                                            Institute / University
                                        </label>
                                        <Input
                                            required
                                            type="text"
                                            value={formData.institute}
                                            onChange={e => setFormData({ ...formData, institute: e.target.value })}
                                            placeholder="Where do you study?"
                                            className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-700 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-base py-7 rounded-2xl"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1">
                                        Email Address
                                    </label>
                                    <Input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                        className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-700 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-base py-7 rounded-2xl"
                                    />
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1">
                                        Portfolio / Social Media (Optional)
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.portfolio}
                                        onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                                        placeholder="Link to your work or profile"
                                        className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-700 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-base py-7 rounded-2xl"
                                    />
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-bold ml-1">
                                        Tell us about yourself
                                    </label>
                                    <Textarea
                                        required
                                        rows={5}
                                        value={formData.aboutMe}
                                        onChange={e => setFormData({ ...formData, aboutMe: e.target.value })}
                                        placeholder="What motivates you to join Manzelyano? What are your talents or interests?"
                                        className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-700 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-base rounded-2xl p-5"
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-8 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-2xl text-lg font-bold shadow-[0_0_40px_rgba(236,72,153,0.3)] transition-all transform hover:scale-[1.02] active:scale-[0.98] group disabled:opacity-50"
                                    >
                                        {submitting ? (
                                            <>
                                                Processing Application...
                                                <RotateCcw className="ml-3 animate-spin" size={24} />
                                            </>
                                        ) : (
                                            <>
                                                Submit My Application
                                                <Send className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-center text-neutral-500 text-xs mt-6">
                                        By submitting, you agree to our community guidelines and terms.
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>

                {/* Success Modal */}
                <ResponsiveModal isOpen={success} setIsOpen={setSuccess} title="Application Sent!" maxWidth="max-w-md">
                    <div className="p-10 text-center space-y-6">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto animate-bounce">
                            <CheckCircle2 size={48} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-foreground">Success!</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Your application has been sent successfully to the club. We'll review it and get back to you soon!
                            </p>
                        </div>
                        <Button
                            onClick={() => setSuccess(false)}
                            className="w-full py-6 bg-foreground text-background font-bold rounded-xl"
                        >
                            Awesome
                        </Button>
                    </div>
                </ResponsiveModal>
            </main>
            <Footer />
        </>
    );
}
