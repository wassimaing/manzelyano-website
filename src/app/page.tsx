import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Testimonials } from "@/components/home/Testimonials";
import { Events } from "@/components/home/Events";
import { Team } from "@/components/home/Team";
import { Join } from "@/components/home/Join";
import { Footer } from "@/components/layout/Footer";
import { getTestimonials, getEvents, getDepartments } from "@/lib/data";

export default async function Home() {
  const [testimonials, events, departments] = await Promise.all([
    getTestimonials(),
    getEvents(),
    getDepartments(),
  ]);

  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col items-center relative z-10">
        <Hero initialEventsCount={events.length} />
        <About />
        <Events initialEvents={events} />
        <Team initialDepartments={departments} />
        <Testimonials initialTestimonials={testimonials} />
        <Join />
      </main>
      <Footer />
    </>
  );
}
