"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResponsiveModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
    showClose?: boolean;
}

export function ResponsiveModal({
    isOpen,
    setIsOpen,
    title,
    children,
    maxWidth = "max-w-2xl",
    showClose = true
}: ResponsiveModalProps) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (isMobile) {
        return (
            <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
                    <Drawer.Content className="fixed bottom-0 left-0 right-0 z-40 mt-24 flex flex-col rounded-t-[2.5rem] bg-card border-t border-border outline-none">
                        <div className="flex-1 overflow-y-auto rounded-t-[2.5rem]">
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-4" />
                            <div className="px-6 pb-12 pt-2">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-display font-bold text-foreground uppercase tracking-tight">
                                        {title}
                                    </h2>
                                    {showClose && (
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                                {children}
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-40 flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={cn(
                            "relative w-full bg-card border border-border rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden",
                            maxWidth
                        )}
                    >
                        <div className="p-8 border-b border-border/50 flex items-center justify-between">
                            <h2 className="text-2xl font-display font-bold text-foreground uppercase tracking-tight">
                                {title}
                            </h2>
                            {showClose && (
                                <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                    <X size={24} />
                                </button>
                            )}
                        </div>
                        <div className="overflow-y-auto flex-1">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
