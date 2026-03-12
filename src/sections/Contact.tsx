"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Download,
  Instagram,
  Linkedin,
  Mail,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const links = linksRef.current;

    if (!section || !title || !form || !links) return;

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

      gsap.fromTo(
        form,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: form,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const linkItems = links.querySelectorAll(".contact-link");
      gsap.fromTo(
        linkItems,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: links,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(
          data?.error || "Unable to send your message right now.",
        );
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      window.setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "jrjosephsamson@gmail.com",
      href: "mailto:jrjosephsamson@gmail.com",
    },
    {
      icon: Mail,
      label: "Email 2",
      value: "samsonvisual@gmail.com",
      href: "mailto:samsonvisual@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Joseph Samson",
      href: "https://www.linkedin.com/in/joseph-samson-39509321b/",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "samson_visuals_",
      href: "https://www.instagram.com/samson_visuals_/",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] py-24 lg:py-32"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-[#9E83FF]/5 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[#9E83FF]/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={titleRef} className="mb-16 text-center">
          <span className="mb-4 block text-sm uppercase tracking-widest text-[#9E83FF]">
            Get In Touch
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Let&apos;s Work <span className="text-white/30">Together</span>
          </h2>
          <p className="mx-auto max-w-xl text-white/50">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s
            create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 lg:p-10"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm text-white/60"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 transition-colors duration-300 focus:border-[#9E83FF]/50 focus:outline-none"
                  placeholder="Mahatma Gandhi"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-white/60"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 transition-colors duration-300 focus:border-[#9E83FF]/50 focus:outline-none"
                  placeholder="mahatmagandhi@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm text-white/60"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 transition-colors duration-300 focus:border-[#9E83FF]/50 focus:outline-none"
                  placeholder="How can I help you?"
                />
              </div>

              {errorMessage ? (
                <p className="text-sm text-red-400">{errorMessage}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-medium transition-all duration-300 ${
                  submitted
                    ? "bg-green-500 text-white"
                    : "bg-[#9E83FF] text-black hover:bg-[#8A6CFF] hover:text-white"
                }`}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                ) : submitted ? (
                  <>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div ref={linksRef} className="space-y-6">
            <div className="glass rounded-3xl p-8">
              <h3 className="mb-6 font-semibold text-white">Direct Contact</h3>

              <div className="space-y-4">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    className="contact-link group flex items-center gap-4 rounded-xl bg-white/5 p-4 transition-all duration-300 hover:bg-white/10"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9E83FF]/10 transition-colors duration-300 group-hover:bg-[#9E83FF]/20">
                      <link.icon className="h-5 w-5 text-[#9E83FF]" />
                    </div>
                    <div className="flex-1">
                      <span className="block text-xs text-white/40">
                        {link.label}
                      </span>
                      <span className="text-white transition-colors duration-300 group-hover:text-[#9E83FF]">
                        {link.value}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#9E83FF]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="mb-4 font-semibold text-white">Download Resume</h3>
              <p className="mb-6 text-sm text-white/50">
                Get a detailed overview of my experience, capabilities, and
                design background.
              </p>
              <a
                href="/joseph-samson-cv.pdf"
                download
                className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 py-4 text-white transition-all duration-300 hover:border-[#9E83FF]/50 hover:bg-white/5"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                <span>Download CV</span>
              </a>
            </div>

            <div className="glass rounded-3xl border-[#9E83FF]/20 p-8">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-3 w-3 animate-pulse rounded-full bg-[#9E83FF]" />
                <span className="text-sm font-medium text-[#9E83FF]">
                  Available for Work
                </span>
              </div>
              <p className="text-sm text-white/50">
                Currently open to new freelance, contract, and collaborative
                product design work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
