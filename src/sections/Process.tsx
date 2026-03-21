"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, Lightbulb, Monitor, PenTool, Search } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Research",
    description:
      "Understanding user needs, market context, and project goals through focused discovery.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Ideation",
    description:
      "Exploring creative directions, structure, and concepts before moving into execution.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Wireframing",
    description:
      "Planning information architecture and interaction flow with low-fidelity structure.",
  },
  {
    number: "04",
    icon: Monitor,
    title: "UI Design",
    description:
      "Crafting polished high-fidelity interfaces with clarity, consistency, and brand focus.",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Testing",
    description:
      "Validating decisions, refining details, and iterating until the final experience feels right.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const stepsElement = stepsRef.current;

    if (!section || !title || !stepsElement) return;

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

      const stepItems = stepsElement.querySelectorAll(".process-step");
      stepItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const connector = stepsElement.querySelector(".connector-line");
      if (connector) {
        gsap.fromTo(
          connector,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stepsElement,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative min-h-[80vh] w-full overflow-hidden bg-[#050505] py-10 lg:py-14"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9E83FF]/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={titleRef} className="mb-12 text-center">
          <span className="mb-4 block text-sm uppercase tracking-widest text-[#9E83FF]">
            How I Work
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Design <span className="text-white/30">Process</span>
          </h2>
          <p className="mx-auto max-w-2xl text-white/50">
            A structured process that keeps creativity aligned with user needs
            and business goals.
          </p>
        </div>

        <div ref={stepsRef} className="relative">
          <div className="connector-line absolute left-[10%] right-[10%] top-24 hidden h-px origin-left bg-gradient-to-r from-transparent via-[#9E83FF]/30 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step.number} className="process-step group relative">
                <div className="relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-500 hover:border-[#9E83FF]/30 hover:bg-white/[0.04]">
                  <div className="absolute -left-2 -top-3 select-none text-6xl font-bold text-white/[0.03]">
                    {step.number}
                  </div>

                  <div className="relative mb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#9E83FF]/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#9E83FF]/20">
                      <step.icon className="h-6 w-6 text-[#9E83FF]" />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-[#9E83FF] lg:block" />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-[#9E83FF]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="flex justify-center py-4 lg:hidden">
                    <div className="h-8 w-px bg-gradient-to-b from-[#9E83FF]/30 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="mb-6 text-white/40">Ready to start your project?</p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#9E83FF] px-8 py-4 font-medium text-black transition-all duration-300 hover:bg-[#8A6CFF] hover:text-white"
          >
            <span>Let&apos;s Work Together</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
