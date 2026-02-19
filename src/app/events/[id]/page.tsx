import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { getEventById } from "@/lib/data";
import { EventDetailsClient } from "@/components/events/EventDetailsClient";

export default async function EventDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const event = await getEventById(id);

    if (!event) {
        return notFound();
    }

    return (
        <>
            <Navbar />
            <EventDetailsClient event={event} />
            <Footer />
        </>
    );
}
