"use client";

/* eslint-disable @next/next/no-img-element */

import { gsap } from "gsap";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "../types/project";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!overlay || !content) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.fromTo(
        content,
        { opacity: 0, scale: 0.95, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    } else {
      gsap.to(content, {
        opacity: 0,
        scale: 0.95,
        y: 50,
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => {
          document.body.style.overflow = "";
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      <div
        ref={contentRef}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#9E83FF] text-white transition-colors duration-300 hover:bg-[#8A6CFF]"
          aria-label="Close project preview"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col">
            {project.caseStudy?.map((item, index) => {
              if (item.type === "video") {
                return (
                  <video
                    key={index}
                    src={item.src}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full"
                  />
                );
              }

              return (
                <img
                  key={index}
                  src={item.src}
                  alt={`${project.title} case study ${index + 1}`}
                  className="w-full object-cover"
                  loading="lazy"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
