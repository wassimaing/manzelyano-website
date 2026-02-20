import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Testimonials } from "@/components/home/Testimonials";
import { Events } from "@/components/home/Events";
import { Memories } from "@/components/home/Memories";
import { Team } from "@/components/home/Team";
import { Join } from "@/components/home/Join";
import { Footer } from "@/components/layout/Footer";
import { getTestimonials, getEvents, getDepartments, getSiteStats } from "@/lib/data";

export default async function Home() {
  const [testimonials, events, departments, stats] = await Promise.all([
    getTestimonials(),
    getEvents(),
    getDepartments(),
    getSiteStats(),
  ]);

  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col items-center relative z-10">
        <Hero
          initialEventsCount={stats.eventsCount}
          activeMembersCount={stats.membersCount}
        />
        <About />
        <Events initialEvents={events} />
        <Memories events={events} />
        <Team initialDepartments={departments} />
        <Testimonials initialTestimonials={testimonials} />
        <Join />
      </main>
      <Footer />
    </>
  );
}
