import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDepartments, getTestimonials, getSiteStats } from "@/lib/data";
import { AboutClient } from "@/components/about/AboutClient";

export default async function AboutPage() {
    const [departments, testimonials, stats] = await Promise.all([
        getDepartments(),
        getTestimonials(),
        getSiteStats(),
    ]);

    return (
        <>
            <Navbar />
            <AboutClient
                initialDepartments={departments}
                initialTestimonials={testimonials}
                stats={stats}
            />
            <Footer />
        </>
    );
}
