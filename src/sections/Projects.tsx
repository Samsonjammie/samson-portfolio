"use client";

/* eslint-disable @next/next/no-img-element */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "../types/project";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

// ── Video Modal (for video-only projects) ─────────────────────────────────────
function VideoModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = project.caseStudy.find((s) => s.type === "video")?.src;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-5xl flex-col items-center px-4 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-5 text-center">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
          <p className="mt-1 text-sm text-white/50">{project.description}</p>
        </div>

        {/* Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            loop
            playsInline
            className="w-full rounded-2xl shadow-2xl"
            style={{ maxHeight: "75vh" }}
          />
        )}

        {/* Tags */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slideshow Modal (only for isSlideshow projects) ───────────────────────────
function SlideshowModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const images = project.caseStudy.filter((s) => s.type === "image");
  const total = images.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + dir + total) % total);
        setAnimating(false);
      }, 220);
    },
    [animating, total],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 py-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
          <p className="mt-1 text-sm text-white/50">
            {current + 1} / {total}
          </p>
        </div>

        <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden">
          <button
            onClick={() => go(-1)}
            className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#9E83FF]/70 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            className="mx-14 flex h-full max-h-[72vh] w-full items-center justify-center"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "scale(0.97)" : "scale(1)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}
          >
            <img
              src={images[current].src}
              alt={`${project.title} — slide ${current + 1}`}
              className="max-h-[72vh] w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          <button
            onClick={() => go(1)}
            className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#9E83FF]/70 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "6px",
                background:
                  i === current ? "#9E83FF" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Projects component ───────────────────────────────────────────────────
export default function Projects({ projects, onProjectClick }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [slideshowProject, setSlideshowProject] = useState<Project | null>(null);
  const [videoProject, setVideoProject] = useState<Project | null>(null);

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

  const handleCardClick = (project: Project) => {
    if (project.isSlideshow) {
      setSlideshowProject(project);
    } else if (
      project.caseStudy.length === 1 &&
      project.caseStudy[0].type === "video"
    ) {
      // Single video project → open VideoModal
      setVideoProject(project);
    } else {
      onProjectClick(project);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative min-h-[80vh] w-full bg-[#050505] py-10 lg:py-14"
      >
        <div ref={titleRef} className="mx-auto mb-10 max-w-7xl px-6">
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
              A curated collection of my best work across UI/UX design,
              branding, and digital experiences.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card group relative cursor-pointer ${
                  index === 0 || index === 3
                    ? "md:col-span-2 lg:col-span-2"
                    : ""
                }`}
                onClick={() => handleCardClick(project)}
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

                    {/* Play icon overlay for video projects */}
                    {project.caseStudy.length === 1 &&
                      project.caseStudy[0].type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#9E83FF]/80 group-hover:scale-110">
                            <svg
                              className="h-7 w-7 translate-x-0.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}

                    {/* NEW badge */}
                    {project.isNew && (
                      <div className="absolute left-4 top-4 z-10">
                        <span
                          className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #9E83FF 0%, #6C4FD4 100%)",
                            boxShadow:
                              "0 0 12px 3px rgba(158,131,255,0.6), 0 0 30px 6px rgba(158,131,255,0.25)",
                          }}
                        >
                          <span
                            className="absolute inset-0 rounded-full"
                            style={{
                              animation: "badgePulse 2s ease-in-out infinite",
                              background:
                                "linear-gradient(135deg, #9E83FF 0%, #6C4FD4 100%)",
                              opacity: 0.5,
                            }}
                          />
                          <span
                            className="relative h-1.5 w-1.5 rounded-full bg-white"
                            style={{
                              boxShadow: "0 0 4px 2px rgba(255,255,255,0.8)",
                              animation: "dotBlink 1.4s ease-in-out infinite",
                            }}
                          />
                          <span className="relative">Just Dropped</span>
                        </span>
                      </div>
                    )}
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

      {/* Slideshow modal */}
      {slideshowProject && (
        <SlideshowModal
          project={slideshowProject}
          onClose={() => setSlideshowProject(null)}
        />
      )}

      {/* Video modal */}
      {videoProject && (
        <VideoModal
          project={videoProject}
          onClose={() => setVideoProject(null)}
        />
      )}

      <style>{`
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.18); opacity: 0; }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}