import { About } from "@/components/portfolio/about";
import { Contact } from "@/components/portfolio/contact";
import { Experience } from "@/components/portfolio/experience";
import { Hero } from "@/components/portfolio/hero";
import { Nav } from "@/components/portfolio/nav";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";

export function Site() {
  return (
    <Experience>
      <Nav />
      <main id="konten">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </Experience>
  );
}
