"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValue, useTransform, animate, useInView } from "framer-motion";

interface StatCounterProps {
    from?: number;
    to: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export function StatCounter({ from = 0, to, duration = 2, suffix = "", className = "" }: StatCounterProps) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, to, {
                duration: duration,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [isInView, to, count, duration]);

    return (
        <span ref={ref} className={className}>
            <MotionValueDisplay value={rounded} />
            {suffix}
        </span>
    );
}

function MotionValueDisplay({ value }: { value: any }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        // Use value.on("change", ...) for Framer Motion 10+
        // For older versions it might be value.onChange(...)
        const unsubscribe = value.on("change", (latest: number) => {
            setDisplayValue(latest);
        });
        return () => unsubscribe();
    }, [value]);

    return <>{displayValue}</>;
}
