"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[-1] h-screen w-screen bg-[#05070d] overflow-hidden",
        className
      )}
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      
      {/* Mouse Follow Glow */}
      {isMounted && (
        <div
          className="absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 247, 196, 0.06), transparent 40%)`,
          }}
        />
      )}
      
      {/* Ambient static top glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-[100%] bg-[#62d9ff]/10 blur-[120px]"></div>
    </div>
  );
};
