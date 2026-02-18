"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <button className="p-2 rounded-full bg-white/5 border border-white/10 w-9 h-9" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-white/10 dark:bg-white/10 border border-neutral-300 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300 cursor-pointer"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
            ) : (
                <Moon size={18} className="text-neutral-700" />
            )}
        </button>
    );
}
