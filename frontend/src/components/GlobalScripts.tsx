// @ts-nocheck
"use client";
import { useEffect } from 'react';

export default function GlobalScripts() {
  useEffect(() => {
    // 1. Cursor Tracking
    document.addEventListener("pointermove", (event) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    });

    // 2. Scroll Effects (Progress, Parallax, Header)
    const scrollProgress = document.getElementById("scrollProgress");
    const codeWall = document.querySelector(".code-wall");

    function updateScrollEffects() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
      }

      if (codeWall) {
        codeWall.style.transform = `translateY(${scrollTop * -0.035}px)`;
      }

      const header = document.querySelector("header") as HTMLElement;
      if (header) {
        header.style.background = scrollTop > 18 ? "rgba(5, 7, 13, 0.88)" : "rgba(5, 7, 13, 0.78)";
        header.style.borderColor = scrollTop > 18 ? "rgba(124,247,196,0.13)" : "rgba(255,255,255,0.08)";
      }
    }

    window.addEventListener("scroll", updateScrollEffects, { passive: true });
    updateScrollEffects();

    // 3. Reveal Animation on Scroll
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -70px 0px" });

    revealEls.forEach((el) => observer.observe(el));
    
  }, []);

  return null;
}