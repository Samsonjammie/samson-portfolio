"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: "Figma", level: 95, category: "Design" },
  { name: "Adobe Photoshop", level: 90, category: "Design" },
  { name: "Adobe Illustrator", level: 85, category: "Design" },
  { name: "After Effects", level: 75, category: "Motion" },
  { name: "Premiere Pro", level: 70, category: "Video" },
  { name: "Filmora", level: 100, category: "Video" },
  { name: "React", level: 65, category: "Code" },
  { name: "HTML/CSS", level: 85, category: "Code" },
];

const categories = ["All", "Design", "Motion", "Video", "Prototype", "Code"];

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const toolsElement = toolsRef.current;

    if (!section || !title || !toolsElement) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title.children,
        { opacity: 0, y: 40 },
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

      const toolItems = toolsElement.querySelectorAll(".tool-item");
      toolItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: toolsElement,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const progressBars = toolsElement.querySelectorAll(".progress-bar");
      progressBars.forEach((bar) => {
        const level = Number.parseInt(
          bar.getAttribute("data-level") || "0",
          10,
        );
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
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
      id="tools"
      className="relative min-h-[80vh] w-full overflow-hidden bg-[#050505] py-10 lg:py-14"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#7D69C5]/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#7D69C5]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={titleRef} className="mb-10 text-center">
          <span className="mb-4 block text-sm uppercase tracking-widest text-[#7D69C5]">
            My Toolkit
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Tools & <span className="text-white/30">Skills</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/50">
            Proficient in industry-standard design software and always exploring
            the next tool that sharpens the process.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`rounded-full px-5 py-2 text-sm transition-all duration-300 ${category === "All"
                  ? "bg-[#7D69C5] font-medium text-black"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          ref={toolsRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="tool-item group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-500 hover:border-[#7D69C5]/30 hover:bg-white/[0.04]"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-white transition-colors duration-300 group-hover:text-[#7D69C5]">
                    {tool.name}
                  </h4>
                  <span className="text-xs text-white/40">{tool.category}</span>
                </div>
                <span className="text-sm font-medium text-[#7D69C5]">
                  {tool.level}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="progress-bar h-full rounded-full bg-gradient-to-r from-[#7D69C5] to-[#9E83FF]"
                  data-level={tool.level}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-6 text-sm uppercase tracking-widest text-white/40">
            Additional Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "User Research",
              "Wireframing",
              "Prototyping",
              "Design Systems",
              "Typography",
              "Color Theory",
              "Accessibility",
              "Motion Design",
              "3D Modeling",
              "Illustration",
            ].map((skill) => (
              <span
                key={skill}
                className="cursor-default rounded-full bg-white/5 px-4 py-2 text-sm text-white/60 transition-all duration-300 hover:bg-[#7D69C5]/10 hover:text-[#7D69C5]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
