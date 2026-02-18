import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Testimonials } from "@/components/home/Testimonials";
import { Events } from "@/components/home/Events";
import { Team } from "@/components/home/Team";
import { Join } from "@/components/home/Join";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full flex flex-col items-center relative z-10">
        <Hero />
        <About />
        <Events />
        <Team />
        <Testimonials />
        <Join />
      </main>
      <Footer />
    </>
  );
}
