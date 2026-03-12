"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "Senior UI/UX & Graphic Designer",
    company: "Althi Solutions",
    location: "Azhgappapuram, Kanyakumari",
    period: "2023 - Present",
    description:
      "Leading design initiatives for client products, shaping interfaces, and building design systems for scalable digital experiences.",
    skills: ["Design Systems", "Team Leadership", "Strategy"],
  },
  {
    id: 2,
    role: "Freelance Graphic Designer",
    company: "Athanas Creative Studio",
    location: "Panagudi, Tirunelveli",
    period: "2021 - 2023",
    description:
      "Created brand identities, marketing materials, and digital assets for clients across multiple industries and formats.",
    skills: ["Branding", "Print Design", "Motion Graphics"],
  },
  {
    id: 3,
    role: "UI/UX Design Intern",
    company: "Instamedz",
    location: "Indore, Madhya Pradesh",
    period: "2022",
    description:
      "Contributed to website redesign concepts in Figma and Photoshop, helping improve clarity, usability, and visual consistency.",
    skills: ["Web Design", "App Design", "Design Systems"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;

    if (!section || !title || !timeline) return;

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

      const items = timeline.querySelectorAll(".timeline-item");
      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        gsap.fromTo(
          item,
          { opacity: 0, x: isEven ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const line = timeline.querySelector(".timeline-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timeline,
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
      id="experience"
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[#9E83FF]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={titleRef} className="mb-20 text-center">
          <span className="mb-4 block text-sm uppercase tracking-widest text-[#9E83FF]">
            Career Journey
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Work <span className="text-white/30">Experience</span>
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 origin-top bg-gradient-to-b from-[#9E83FF] via-[#9E83FF]/50 to-transparent lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`timeline-item relative lg:grid lg:grid-cols-2 lg:gap-16 ${
                  index !== experiences.length - 1 ? "lg:pb-16" : ""
                }`}
              >
                <div
                  className={`${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:col-start-2 lg:pl-16"}`}
                >
                  <div className="glass group rounded-3xl p-6 transition-all duration-500 hover:border-[#9E83FF]/30 lg:p-8">
                    <div
                      className={`mb-4 flex items-start gap-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""}`}
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#9E83FF]/10 transition-colors duration-300 group-hover:bg-[#9E83FF]/20">
                        <Briefcase className="h-5 w-5 text-[#9E83FF]" />
                      </div>
                      <div className={index % 2 === 0 ? "lg:text-right" : ""}>
                        <h3 className="mb-1 text-xl font-semibold text-white">
                          {experience.role}
                        </h3>
                        <p className="font-medium text-[#9E83FF]">
                          {experience.company}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mb-4 flex flex-wrap gap-4 text-sm text-white/50 ${index % 2 === 0 ? "lg:justify-end" : ""}`}
                    >
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {experience.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {experience.location}
                      </span>
                    </div>

                    <p className="mb-4 leading-relaxed text-white/60">
                      {experience.description}
                    </p>

                    <div
                      className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "lg:justify-end" : ""}`}
                    >
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 top-8 hidden -translate-x-1/2 items-center justify-center lg:flex">
                  <div className="h-4 w-4 rounded-full bg-[#9E83FF] shadow-[0_0_20px_rgba(158,131,255,0.5)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
