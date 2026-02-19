import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getDepartments, getTestimonials } from "@/lib/data";
import { AboutClient } from "@/components/about/AboutClient";

export default async function AboutPage() {
    const [departments, testimonials] = await Promise.all([
        getDepartments(),
        getTestimonials(),
    ]);

    return (
        <>
            <Navbar />
            <AboutClient
                initialDepartments={departments}
                initialTestimonials={testimonials}
            />
            <Footer />
        </>
    );
}
