"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Info, Trash2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'danger' | 'warning' | 'info' | 'success';
    type?: 'confirm' | 'alert';
}

export function ConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = 'info',
    type = 'confirm'
}: ConfirmationDialogProps) {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const getIcon = () => {
        switch (variant) {
            case 'danger': return <Trash2 className="text-red-500" size={32} />;
            case 'warning': return <AlertTriangle className="text-yellow-500" size={32} />;
            case 'success': return <CheckCircle2 className="text-green-500" size={32} />;
            default: return <Info className="text-blue-500" size={32} />;
        }
    };

    const getColors = () => {
        switch (variant) {
            case 'danger': return "bg-red-500 hover:bg-red-600 shadow-red-500/20";
            case 'warning': return "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/20 text-black";
            case 'success': return "bg-green-500 hover:bg-green-600 shadow-green-500/20";
            default: return "bg-pink-500 hover:bg-pink-600 shadow-pink-500/20";
        }
    };

    const content = (
        <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border border-border shadow-inner">
                {getIcon()}
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-foreground uppercase tracking-tight">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{message}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
                {type === 'confirm' && (
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-4 rounded-2xl bg-muted border border-border text-muted-foreground font-bold uppercase tracking-widest text-[10px] hover:bg-muted/80 transition-all"
                    >
                        {cancelLabel}
                    </button>
                )}
                <button
                    onClick={() => {
                        onConfirm?.();
                        onClose();
                    }}
                    className={cn(
                        "flex-1 px-6 py-4 rounded-2xl text-white font-bold uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg",
                        getColors()
                    )}
                >
                    {confirmLabel}
                </button>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <Drawer.Root open={isOpen} onOpenChange={onClose}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
                    <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[100] mt-24 flex flex-col rounded-t-[2.5rem] bg-card border-t border-border outline-none">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-4" />
                        <div className="p-8 pb-12">
                            {content}
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-card border border-border rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={20} />
                        </button>
                        {content}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
