"use client";

import React from "react";
import { MessageCircle, Mail, Send, CheckCircle2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitApplication } from "@/lib/actions";
import { ResponsiveModal } from "@/components/admin/ResponsiveModal";

export function Join() {
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
        <section id="join" className="w-full max-w-[1200px] px-6 py-32 z-20 mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="glass-panel rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl dark:shadow-pink-900/10 shadow-pink-200/30 dark:border-white/10 border-neutral-200 border"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-600/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="flex flex-col md:flex-row gap-16 relative z-10">
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight dark:text-white text-neutral-900 mb-6 leading-none">
                                Become a <br />
                                <span className="text-pink-500">Changemaker.</span>
                            </h2>
                            <p className="dark:text-neutral-200 text-neutral-600 leading-relaxed mb-10 text-lg">
                                Whether you want to develop leadership skills, make new friends,
                                or give back to Menzel Bourguiba, there is a place for you in our
                                family.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    className="px-8 py-6 rounded-full font-bold text-sm dark:bg-white dark:text-black bg-neutral-900 text-white dark:hover:bg-pink-100 hover:bg-neutral-800 dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] shadow-lg"
                                    asChild
                                >
                                    <a href="mailto:contact@manzelyano.tn">
                                        <Mail className="mr-2" size={20} /> Email Us
                                    </a>
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="md:w-1/2 dark:bg-black/60 bg-white/60 dark:border-white/10 border-neutral-200 border rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl"
                    >
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider dark:text-neutral-400 text-neutral-500 font-bold ml-1">
                                    Full Name
                                </label>
                                <Input
                                    required
                                    type="text"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-600 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider dark:text-neutral-400 text-neutral-500 font-bold ml-1">
                                        Date of Birth
                                    </label>
                                    <Input
                                        required
                                        type="date"
                                        value={formData.dob}
                                        onChange={e => setFormData({ ...formData, dob: e.target.value })}
                                        className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-600 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider dark:text-neutral-400 text-neutral-500 font-bold ml-1 text-nowrap">
                                        Institute / University
                                    </label>
                                    <Input
                                        required
                                        type="text"
                                        value={formData.institute}
                                        onChange={e => setFormData({ ...formData, institute: e.target.value })}
                                        placeholder="Where do you study?"
                                        className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-600 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider dark:text-neutral-400 text-neutral-500 font-bold ml-1">
                                    Email Address
                                </label>
                                <Input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                    className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-600 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider dark:text-neutral-400 text-neutral-500 font-bold ml-1">
                                    Social Media / Portfolio (Optional)
                                </label>
                                <Input
                                    type="text"
                                    value={formData.portfolio}
                                    onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                                    placeholder="Link to your work or profile"
                                    className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-600 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-sm py-6 rounded-xl"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold ml-1">
                                    Tell us about yourself
                                </label>
                                <Textarea
                                    required
                                    rows={3}
                                    value={formData.aboutMe}
                                    onChange={e => setFormData({ ...formData, aboutMe: e.target.value })}
                                    placeholder="What motivates you to join Manzelyano?"
                                    className="dark:bg-white/5 bg-neutral-50 dark:border-white/10 border-neutral-200 dark:text-white text-neutral-900 dark:placeholder:text-neutral-600 placeholder:text-neutral-400 dark:focus-visible:bg-white/10 focus-visible:bg-neutral-100 focus-visible:ring-pink-500 text-sm rounded-xl"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-6 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-xl text-sm font-bold shadow-[0_0_25px_rgba(236,72,153,0.4)] mt-4 group disabled:opacity-50"
                            >
                                {submitting ? (
                                    <>
                                        Processing...
                                        <RotateCcw className="ml-2 animate-spin" size={20} />
                                    </>
                                ) : (
                                    <>
                                        Submit Application
                                        <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                    </>
                                )}
                            </Button>
                        </form>

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
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}