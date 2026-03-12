"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(checkTouch);

    if (checkTouch) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const moveCursor = (event: MouseEvent) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(cursorDot, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.05,
        ease: "power2.out",
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]",
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-cursor-hover]",
      );
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 ${
          isHovering ? "scale-150" : "scale-100"
        }`}
        style={{ mixBlendMode: "difference" }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHovering
              ? "h-12 w-12 border-[#9E83FF] bg-[#9E83FF]/10"
              : "h-8 w-8 border-white/50"
          }`}
        />
      </div>
      <div
        ref={cursorDotRef}
        className="fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div
          className={`h-1 w-1 rounded-full bg-[#9E83FF] transition-transform duration-200 ${
            isHovering ? "scale-0" : "scale-100"
          }`}
        />
      </div>
    </>
  );
}
