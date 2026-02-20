import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getEvents } from "@/lib/data";
import { EventsGrid } from "@/components/events/EventsGrid";

/**
 * Server Component – fetches events from Supabase, then passes them
 * as plain serialisable props to the EventsGrid Client Component so
 * framer-motion can run safely in the browser.
 */
export default async function EventsPage() {
    const events = await getEvents();

    return (
        <>
            <Navbar />
            <main className="w-full min-h-screen pt-32 pb-20 px-6 relative z-10 flex flex-col items-center">
                {/* Background */}
                <div className="fixed inset-0 dark:bg-neutral-950 bg-white -z-20" />
                <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent -z-10 pointer-events-none" />

                <div className="max-w-[1200px] w-full">
                    <EventsGrid events={events} />
                </div>
            </main>
            <Footer />
        </>
    );
}
