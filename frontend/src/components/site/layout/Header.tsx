"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UserProfileResponse } from '@/types/user';

interface HeaderProps {
  user?: UserProfileResponse | null;
}

export default function Header({ user }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" } // Sayfanın ortasına geldiğinde tetiklenir
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  const navItems = [
    { label: "Anasayfa", id: "home" },
    { label: "Hakkımda", id: "about" },
    { label: "Teknolojiler", id: "skills" },
    { label: "Deneyimler", id: "experiences" },
    { label: "Projeler", id: "projects" },
    { label: "İletişim", id: "contact" },
  ];

  const headerStyles = "fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1180px] z-[100] rounded-full border border-white/10 border-b-white/10 bg-[#05070d]/80 backdrop-blur-xl shadow-2xl transition-all duration-300 max-md:top-0 max-md:w-full max-md:rounded-none max-md:border-x-0 max-md:border-t-0";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const initial = user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : "AE";

  return (
    <header className={headerStyles}>
      {/* Decorative bottom line */}
      <div className="absolute left-1/2 bottom-0 w-2/3 max-w-lg h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-[#7cf7c4]/35 to-[#62d9ff]/25 opacity-80 pointer-events-none"></div>

      <div className="h-16 px-6 max-md:px-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link className="flex items-center gap-3 font-black tracking-tight whitespace-nowrap" href="#home" onClick={(e) => handleNavClick(e, 'home')}>
          <span className="relative w-10 h-10 grid place-items-center rounded-2xl bg-gradient-to-br from-[#7cf7c4] to-[#62d9ff] text-[#03110b] shadow-[0_0_28px_rgba(124,247,196,0.25)] font-[1000] overflow-hidden after:content-[''] after:absolute after:inset-[-40%] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:animate-logo-shine">{initial}</span>
          <span className="flex flex-col justify-center gap-0.5 leading-none max-sm:hidden">
            <span className="text-[#f8fafc] text-sm font-black tracking-tight">{user?.fullName || "Ali Emre Bulut"}</span>
            <span className="text-slate-300/50 text-xs font-bold tracking-wider">{user?.title || "Backend Developer"}</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="flex items-center justify-center gap-1 max-md:hidden">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link 
                key={item.id} 
                href={`#${item.id}`} 
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  "relative h-10 px-4 inline-flex items-center justify-center rounded-full text-sm font-bold whitespace-nowrap border transition-all duration-200 group",
                  isActive 
                    ? "text-white bg-white/10 border-[#7cf7c4]/30 shadow-md" 
                    : "text-[#a8b0c3] border-transparent hover:text-white hover:bg-white/5 hover:border-[#7cf7c4]/15 hover:shadow-md"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute left-1/2 bottom-1.5 h-0.5 rounded-full bg-gradient-to-r from-[#7cf7c4] to-[#62d9ff] -translate-x-1/2 transition-all duration-200 shadow-[0_0_14px_rgba(124,247,196,0.45)]",
                  isActive ? "w-5 opacity-100" : "w-5 scale-x-0 opacity-0 group-hover:opacity-100 group-hover:scale-x-100"
                )}></span>
              </Link>
            );
          })}
        </nav>

        {/* Action & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a download href={user?.resumeUrl || "/Ali_Emre_Bulut_CV.pdf"} className="group relative h-10 px-5 inline-flex items-center justify-center rounded-full border border-[#7cf7c4]/30 bg-gradient-to-br from-[#7cf7c4]/95 to-[#62d9ff]/90 text-[#04100c] text-sm font-black tracking-tight shadow-lg shadow-[#62d9ff]/20 overflow-hidden whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#62d9ff]/30 max-sm:hidden">
            CV indir ↗
            <span className="absolute inset-[-60%] bg-gradient-to-br from-transparent from-34% via-white/50 to-transparent to-66% -translate-x-[130%] rotate-12 transition-transform duration-500 group-hover:translate-x-[130%]"></span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/5 border border-white/10 rounded-full z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü aç"
          >
            <span className={cn("block w-4 h-0.5 bg-white transition-all duration-300", isMobileMenuOpen && "rotate-45 translate-y-2")}></span>
            <span className={cn("block w-4 h-0.5 bg-white transition-all duration-300", isMobileMenuOpen && "opacity-0")}></span>
            <span className={cn("block w-4 h-0.5 bg-white transition-all duration-300", isMobileMenuOpen && "-rotate-45 -translate-y-2")}></span>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Nav */}
      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-[#05070d]/95 backdrop-blur-xl border-b border-white/10 flex flex-col px-6 gap-2 transition-all duration-300 overflow-hidden",
        isMobileMenuOpen ? "py-4 max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      )}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Link 
              key={item.id} 
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={cn(
                "relative h-12 px-6 flex items-center rounded-2xl text-sm font-bold border transition-all duration-200",
                isActive 
                  ? "text-white bg-white/10 border-[#7cf7c4]/30 shadow-md" 
                  : "text-[#a8b0c3] border-transparent hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
              {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-gradient-to-b from-[#7cf7c4] to-[#62d9ff] shadow-[0_0_14px_rgba(124,247,196,0.45)]"></span>}
            </Link>
          );
        })}
        <a download href={user?.resumeUrl || "/Ali_Emre_Bulut_CV.pdf"} className="mt-2 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#7cf7c4]/90 to-[#62d9ff]/80 text-[#04100c] text-sm font-black shadow-lg">
          CV indir ↗
        </a>
      </div>
    </header>
  );
}
