"use client";

/* eslint-disable @next/next/no-img-element */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLDivElement>(null);
  const titleRightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    const titleLeft = titleLeftRef.current;
    const titleRight = titleRightRef.current;
    const cta = ctaRef.current;
    const floatingElements = floatingElementsRef.current;

    if (
      !section ||
      !phone ||
      !titleLeft ||
      !titleRight ||
      !cta ||
      !floatingElements
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.5 });

      timeline
        .fromTo(
          phone,
          { opacity: 0, scale: 0.8, y: 100 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
        )
        .fromTo(
          titleLeft.children,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
          "-=0.8",
        )
        .fromTo(
          titleRight.children,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(
          cta,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        );

      gsap.to(phone, {
        y: -20,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      const floatingItems = floatingElements.querySelectorAll(".floating-item");
      floatingItems.forEach((item, index) => {
        gsap.to(item, {
          y: `${Math.sin(index) * 15}`,
          x: `${Math.cos(index) * 10}`,
          duration: 4 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.5) {
            const exitProgress = (progress - 0.5) * 2;
            gsap.set(phone, {
              y: -exitProgress * 200,
              opacity: 1 - exitProgress,
              scale: 1 - exitProgress * 0.1,
            });
            gsap.set([titleLeft, titleRight], {
              opacity: 1 - exitProgress,
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505] pt-20 lg:pt-24"
    >
      <div className="absolute inset-0 bg-gradient-radial from-white/[0.02] via-transparent to-transparent" />

      <div
        ref={floatingElementsRef}
        className="pointer-events-none absolute inset-0"
      >
        <div className="floating-item absolute left-[10%] top-[15%] h-20 w-20 rounded-full border border-white/10" />
        <div className="floating-item absolute right-[15%] top-[25%] h-12 w-12 rounded-full bg-[#9E83FF]/10" />
        <div className="floating-item absolute bottom-[20%] left-[20%] h-8 w-8 rounded-full border border-[#9E83FF]/30" />
        <div className="floating-item absolute bottom-[30%] right-[10%] h-16 w-16 rounded-full border border-white/5" />
        <div className="floating-item absolute left-[5%] top-[40%] h-4 w-4 rounded-full bg-white/20" />
        <div className="floating-item absolute right-[8%] top-[60%] h-6 w-6 rounded-full bg-[#9E83FF]/20" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-3 lg:gap-0">
        <div
          ref={titleLeftRef}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <div className="overflow-hidden">
            <span className="mb-4 inline-block text-sm uppercase tracking-widest text-[#9E83FF]">
              <Sparkles className="mr-2 inline h-4 w-4" />
              Creative Designer
            </span>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              UI/UX
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="mx-auto mt-4 max-w-xs text-sm text-white/50 lg:mx-0">
              Crafting meaningful digital experiences through thoughtful design
              and intuitive interfaces.
            </p>
          </div>
        </div>

        <div
          ref={phoneRef}
          className="order-1 relative flex justify-center py-8 lg:order-2 lg:py-0"
        >
          <div className="relative w-[280px] sm:w-[320px] lg:w-[380px]">
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-2 shadow-2xl">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[2.5rem] bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#000]">
                  <div className="absolute left-0 right-0 top-0 flex h-8 items-center justify-between px-6 text-[10px] text-white/70">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="h-2 w-4 rounded-sm bg-white/30" />
                      <div className="h-2 w-3 rounded-sm bg-white/30" />
                    </div>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-[#9E83FF]">
                      <img
                        src="/profile.jpg"
                        alt="Joseph Samson"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mb-1 text-xl font-semibold text-white">
                      Joseph Samson
                    </h3>
                    <p className="mb-6 text-xs text-white/50">
                      UI/UX & Graphic Designer
                    </p>

                    <div className="mb-6 flex gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#9E83FF]">
                          15+
                        </div>
                        <div className="text-[10px] text-white/40">
                          Projects
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#9E83FF]">
                          4+
                        </div>
                        <div className="text-[10px] text-white/40">Years</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-[#9E83FF]">
                          10+
                        </div>
                        <div className="text-[10px] text-white/40">Clients</div>
                      </div>
                    </div>

                    <div className="w-full space-y-2">
                      <button
                        onClick={() => {
                          scrollToProjects();
                        }}
                        className="w-full rounded-xl bg-[#9E83FF] py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-[#8A6CFF] hover:text-white">
                        View Portfolio
                      </button>
                      <button
                        onClick={() => {
                          scrollToContact();
                        }}
                        className="w-full rounded-xl border border-white/20 py-3 text-sm text-white transition-colors duration-300 hover:border-[#9E83FF]/50 hover:bg-white/5">
                        Contact Me
                      </button>
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white/30" />
                </div>
              </div>
            </div>

            <div className="absolute -inset-4 -z-10 rounded-[4rem] bg-[#9E83FF]/10 blur-3xl" />
          </div>
        </div>

        <div ref={titleRightRef} className="order-3 text-center lg:text-right">
          <div className="overflow-hidden pb-2">
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tighter text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Designer
            </h1>
          </div>
          <div className="overflow-hidden">
            <span className="mt-2 inline-block text-lg font-light text-white/30 sm:text-xl lg:text-2xl">
              & Graphic Artist
            </span>
          </div>
          <div className="mt-4 overflow-hidden">
            <div className="flex items-center justify-center gap-2 text-sm text-white/40 lg:justify-end">
              <span className="h-2 w-2 rounded-full bg-[#39FF14] animate-pulse" />
              <span>Available for work</span>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={ctaRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={scrollToProjects}
          className="group flex flex-col items-center gap-2 text-white/50 transition-colors duration-300 hover:text-[#9E83FF]"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
