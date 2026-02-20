"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
} from "@/components/ui/drawer";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },
    { label: "Events", icon: Calendar, href: "/admin/events" },
    { label: "Team", icon: Users, href: "/admin/team" },
    { label: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { state } = useSidebar();
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();


    const handleLogout = async () => {
        await supabase.auth.signOut();
        setOpen(false);
    };

    const confirmContent = (
        <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-xs text-muted-foreground">You'll be redirected to the login page.</p>
        </div>
    );

    const confirmButtons = (
        <div className="flex gap-2 w-full">
            <button
                onClick={() => setOpen(false)}
                className="flex-1 h-10 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
                Cancel
            </button>
            <button
                onClick={handleLogout}
                className="flex-1 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-sm font-semibold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
            >
                Sign Out
            </button>
        </div>
    );

    return (
        <>
            <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
                <SidebarHeader className="p-6">
                    <Link
                        href="/admin"
                        className="flex items-center justify-center group-data-[state=expanded]:justify-start gap-3 group transition-all duration-300"
                    >
                        <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                            <img src="/favicon.ico" alt="Logo" className="w-6 h-6 object-contain" />
                        </div>
                        {state === "expanded" && (
                            <div className="flex flex-col animate-in fade-in slide-in-from-left-2 items-start text-left">
                                <span className="font-display font-bold text-lg text-sidebar-foreground tracking-tight uppercase leading-none">Admin</span>
                                <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest mt-1">Menzelyano</span>
                            </div>
                        )}
                    </Link>
                </SidebarHeader>

                <SidebarContent className="px-3">
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        tooltip={item.label}
                                        className={cn(
                                            "h-12 px-4 rounded-xl transition-all duration-300 group",
                                            isActive
                                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                                        )}
                                    >
                                        <Link
                                            href={item.href}
                                            className="flex items-center justify-center group-data-[state=expanded]:justify-start w-full"
                                        >
                                            <Icon className={cn(
                                                "size-5 shrink-0 transition-all duration-300",
                                                isActive ? "text-pink-500 scale-110" : "group-hover:text-pink-400"
                                            )} />
                                            {state === "expanded" && (
                                                <span className="font-semibold tracking-tight text-sm ml-3 animate-in fade-in slide-in-from-left-2">
                                                    {item.label}
                                                </span>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter className="p-4 border-t border-border">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => setOpen(true)}
                                className="h-12 px-4 text-muted-foreground hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all group flex items-center justify-center group-data-[state=expanded]:justify-start w-full"
                            >
                                <LogOut className="size-5 shrink-0 group-hover:-translate-x-1 transition-transform" />
                                {state === "expanded" && (
                                    <span className="font-semibold tracking-tight text-sm ml-3 animate-in fade-in slide-in-from-left-2">
                                        Sign Out
                                    </span>
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    {state === "expanded" && (
                        <div className="mt-4 px-4 py-3 rounded-xl bg-gradient-to-br from-pink-500/5 to-purple-500/5 border border-border text-center animate-in fade-in slide-in-from-bottom-2">
                            <p className="text-[8px] text-muted-foreground uppercase tracking-widest font-mono">Version 1.2.0-Alpha</p>
                        </div>
                    )}
                </SidebarFooter>
            </Sidebar>

            {/* Desktop: Dialog */}
            {!isMobile && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-6">
                        <DialogHeader>
                            <DialogTitle className="text-foreground text-base font-semibold">Sign out?</DialogTitle>
                            <DialogDescription asChild>
                                {confirmContent}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                            {confirmButtons}
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Mobile: Drawer */}
            {isMobile && (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent className="bg-card border-t border-border rounded-t-2xl px-6 pb-8">
                        <DrawerHeader className="text-left px-0 pt-6">
                            <DrawerTitle className="text-foreground text-base font-semibold">Sign out?</DrawerTitle>
                            <DrawerDescription asChild>
                                {confirmContent}
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className="px-0 pt-2">
                            {confirmButtons}
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    );
}