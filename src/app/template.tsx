"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CoolLoader } from "@/components/ui/cool-loader";

export default function Template({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Ensure loader shows for at least 1s
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && <CoolLoader />}
            </AnimatePresence>
            {children}
        </>
    );
}
