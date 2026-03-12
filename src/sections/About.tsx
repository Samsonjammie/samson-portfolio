"use client";

/* eslint-disable @next/next/no-img-element */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Layout, Palette, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: Palette,
    label: "Visual Design",
    description: "Creating strong and memorable visual systems",
  },
  {
    icon: Layout,
    label: "UI/UX Design",
    description: "Designing intuitive, user-first product experiences",
  },
  {
    icon: Code,
    label: "Prototyping",
    description: "Turning ideas into interactive design flows",
  },
  {
    icon: Sparkles,
    label: "Motion Design",
    description: "Adding polish through purposeful motion",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skillsElement = skillsRef.current;

    if (!section || !image || !content || !skillsElement) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.9, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        content.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: content,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const skillItems = skillsElement.querySelectorAll(".skill-item");
      gsap.fromTo(
        skillItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: skillsElement,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B6EF4]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <img
                src="/profile.jpg"
                alt="Joseph Samson portrait"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
            </div>

            <div className="glass absolute -bottom-6 -right-6 rounded-2xl p-6 lg:bottom-8 lg:-right-8">
              <div className="text-4xl font-bold text-[#FFFFFF]">4+</div>
              <div className="text-sm text-white/60">Years Experience</div>
            </div>

            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border border-[#8B6EF4]/30" />
            <div className="absolute -left-8 top-1/2 h-4 w-4 rounded-full bg-[#8B6EF4]/50" />
          </div>

          <div ref={contentRef}>
            <span className="mb-4 block text-sm uppercase tracking-widest text-[#8B6EF4]">
              About Me
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Designing Digital
              <br />
              <span className="text-white/30">Experiences With Intent</span>
            </h2>

            <div className="mb-8 space-y-4 leading-relaxed text-white/60">
              <p>
                I&apos;m Joseph Samson, a UI/UX and graphic designer focused on
                creating clean, purposeful, and engaging digital products. My
                work blends strong visual design with practical user thinking.
              </p>
              <p>
                Over the last few years, I&apos;ve worked across product design,
                branding, motion, and marketing visuals for startups, agencies,
                and growing businesses.
              </p>
              <p>
                I enjoy shaping ideas from research and wireframes through
                polished interfaces that feel modern, intuitive, and memorable.
              </p>
            </div>

            <div className="mb-10 grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm text-white/40">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">10+</div>
                <div className="text-sm text-white/40">Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">4+</div>
                <div className="text-sm text-white/40">Years</div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={skillsRef}
          className="mt-24 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {skills.map((skill) => (
            <div
              key={skill.label}
              className="skill-item group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-500 hover:border-[#8B6EF4]/30 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B6EF4]/10 transition-colors duration-300 group-hover:bg-[#8B6EF4]/20">
                <skill.icon className="h-6 w-6 text-[#8B6EF4]" />
              </div>
              <h4 className="mb-1 font-semibold text-white">{skill.label}</h4>
              <p className="text-sm text-white/40">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
