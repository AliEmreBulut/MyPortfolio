import React, { ElementType } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  as?: ElementType;
}

export function GlassCard({ 
  children, 
  className, 
  hoverEffect = false, 
  as: Tag = "div",
  ...props 
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl shadow-2xl",
        hoverEffect && "transition-all duration-300 ease-out group-hover:border-brand-green/30 group-hover:shadow-brand-blue/20",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
