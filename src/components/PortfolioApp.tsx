"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { projects } from "../data/projects";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Experience from "../sections/Experience";
import Footer from "../sections/Footer";
import Hero from "../sections/Hero";
import Navigation from "../sections/Navigation";
import Process from "../sections/Process";
import Projects from "../sections/Projects";
import Tools from "../sections/Tools";
import type { Project } from "../types/project";
import CustomCursor from "./CustomCursor";
import ProjectModal from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioApp() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] transition-all duration-700 ${
          isLoading
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#9E83FF]"
              style={{ animation: "loading 1.5s ease-out forwards" }}
            />
          </div>
          <span className="text-sm uppercase tracking-widest text-white/60">
            Loading
          </span>
        </div>
        <style jsx>{`
          @keyframes loading {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
        `}</style>
      </div>

      <CustomCursor />
      <Navigation />

      <main
        ref={mainRef}
        className="noise-overlay relative min-h-screen bg-[#050505]"
      >
        <Hero />
        <Projects projects={projects} onProjectClick={setSelectedProject} />
        <About />
        <Experience />
        <Tools />
        <Process />
        <Contact />
        <Footer />
      </main>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
