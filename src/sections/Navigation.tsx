"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 transition-all duration-500 md:block ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="glass flex items-center gap-1 rounded-full px-2 py-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="rounded-full px-5 py-2 text-sm text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("#contact")}
            className="ml-2 rounded-full bg-[#9E83FF] px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-[#8A6CFF] hover:text-white"
          >
            Let&apos;s Talk
          </button>
        </div>
      </nav>

      <button
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        className={`glass fixed right-6 top-6 z-50 rounded-full p-3 transition-all duration-300 md:hidden ${
          isScrolled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl" />
        <div className="relative flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-3xl font-light text-white/80 transition-colors duration-300 hover:text-[#9E83FF]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <a
        href="#hero"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("#hero");
        }}
        className="fixed left-6 top-6 z-50 text-xl font-bold tracking-tight"
      >
        <span className="text-[#9E83FF]">.</span>Samson Portfolio
      </a>
    </>
  );
}
