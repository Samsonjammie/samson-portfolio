"use client";

/* eslint-disable @next/next/no-img-element */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "../types/project";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function Projects({ projects, onProjectClick }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const cards = grid.querySelectorAll(".project-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full bg-[#050505] py-16 lg:py-20"
    >
      <div ref={titleRef} className="mx-auto mb-16 max-w-7xl px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-4 block text-sm uppercase tracking-widest text-[#9E83FF]">
              Selected Works
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Featured
              <br />
              <span className="text-white/30">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/50 lg:text-right">
            A curated collection of my best work across UI/UX design, branding,
            and digital experiences.
          </p>
        </div>
      </div>

      <div ref={gridRef} className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative cursor-pointer ${index === 0 || index === 3 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              onClick={() => onProjectClick(project)}
              data-cursor-hover
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 group-hover:border-[#9E83FF]/30 group-hover:bg-white/[0.04]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-[#9E83FF]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#9E83FF]">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-[#9E83FF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-6 text-center">
        <button className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-white transition-all duration-300 hover:border-[#9E83FF]/50 hover:bg-white/5">
          <span>View All Projects</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
