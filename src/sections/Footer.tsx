"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footer.querySelectorAll(".footer-item"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/samson_visuals_/" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joseph-samson-39509321b/",
    },
    { label: "Dribbble", href: "https://dribbble.com/Samson_jammie" },
    { label: "Behance", href: "https://www.behance.net/josephsamson1" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full border-t border-white/5 bg-[#050505] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="footer-item lg:col-span-2">
            <a
              href="#hero"
              className="mb-4 block text-2xl font-bold tracking-tight"
            >
              <span className="text-[#9E83FF]">.</span>Samson Portfolio
            </a>
            <p className="mb-6 max-w-md leading-relaxed text-white/50">
              Creating meaningful digital experiences through thoughtful design
              and innovative solutions. Let&apos;s build something memorable
              together.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-[#9E83FF] text-[#9E83FF]" />
              <span>by Joseph Samson</span>
            </div>
          </div>

          <div className="footer-item">
            <h4 className="mb-4 font-semibold text-white">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 transition-colors duration-300 hover:text-[#9E83FF]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-item">
            <h4 className="mb-4 font-semibold text-white">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-white/50 transition-colors duration-300 hover:text-[#9E83FF]"
                  >
                    {link.label}
                    <svg
                      className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-item flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-white/30">
            © {currentYear} Joseph Samson. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-white/50 transition-colors duration-300 hover:text-[#9E83FF]"
          >
            <span className="text-sm">Back to top</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[#9E83FF] group-hover:bg-[#9E83FF]/10">
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
