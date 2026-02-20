"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session && pathname !== "/admin/login") {
                router.push("/admin/login");
            } else if (session && pathname === "/admin/login") {
                router.push("/admin");
            } else {
                setAuthenticated(!!session || pathname === "/admin/login");
                setLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session && pathname !== "/admin/login") {
                router.push("/admin/login");
            } else if (session && pathname === "/admin/login") {
                router.push("/admin");
            }
        });

        return () => subscription.unsubscribe();
    }, [router, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="animate-spin text-pink-500" size={40} />
            </div>
        );
    }

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (!authenticated) return null;

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-background flex w-full overflow-hidden">
                <AdminSidebar />
                <SidebarInset className="bg-background flex flex-col min-w-0">
                    {/* Mobile Header */}
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-6 md:hidden">
                        <SidebarTrigger className="text-foreground" />
                        <Separator orientation="vertical" className="mr-2 h-4 bg-border" />
                        <div className="flex items-center gap-2">
                            <img src="/favicon.ico" alt="Logo" className="w-5 h-5 object-contain" />
                            <span className="font-display font-bold text-foreground uppercase text-sm tracking-tight">Admin</span>
                        </div>
                    </header>

                    <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                        <div className="max-w-6xl mx-auto">
                            {/* Desktop Trigger */}
                            <div className="hidden md:flex mb-8 items-center gap-4">
                                <SidebarTrigger className="text-foreground hover:bg-muted" />
                                <Separator orientation="vertical" className="h-4 bg-border" />
                                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.3em]">Dashboard</span>
                            </div>
                            {children}
                        </div>
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
