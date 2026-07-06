import Link from 'next/link';
import { cn } from '@/lib/utils';

// --- Styles ---
const styles = {
  header: "fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1180px] z-[100] rounded-full border border-white/10 border-b-white/10 bg-[#05070d]/80 backdrop-blur-xl shadow-2xl max-md:left-4 max-md:top-3 max-md:transform-none max-md:w-[calc(100%-2rem)]",
  decorativeLine: "absolute left-1/2 bottom-0 w-2/3 max-w-lg h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-[#7cf7c4]/35 to-[#62d9ff]/25 opacity-80 pointer-events-none",
  nav: "h-16 px-6 max-md:h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4",
};

// --- Sub-components ---

function HeaderLogo() {
  const logoWrapper = "justify-self-start flex items-center gap-3 font-black tracking-tight whitespace-nowrap";
  const iconBox = "relative w-10 h-10 grid place-items-center rounded-2xl bg-gradient-to-br from-[#7cf7c4] to-[#62d9ff] text-[#03110b] shadow-[0_0_28px_rgba(124,247,196,0.25)] font-[1000] overflow-hidden after:content-[''] after:absolute after:inset-[-40%] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent after:animate-logo-shine";
  const textWrapper = "flex flex-col justify-center gap-0.5 leading-none";
  
  return (
    <Link className={logoWrapper} href="#home">
      <span className={iconBox}>AE</span>
      <span className={textWrapper}>
        <span className="text-[#f8fafc] text-sm font-black tracking-tight">Ali Emre Bulut</span>
        <span className="text-slate-300/50 text-xs font-bold tracking-wider">Backend Developer</span>
      </span>
    </Link>
  );
}

function HeaderNav() {
  const navWrapper = "justify-self-center flex items-center justify-center gap-1 min-w-0 max-md:hidden";
  const linkItem = "relative h-10 px-4 inline-flex items-center justify-center rounded-full text-[#a8b0c3] text-sm font-bold whitespace-nowrap border border-transparent transition-all duration-200 hover:text-white hover:bg-white/5 hover:border-[#7cf7c4]/15 hover:shadow-md group";
  const linkHoverEffect = "absolute left-1/2 bottom-1.5 w-5 h-0.5 rounded-full bg-gradient-to-r from-[#7cf7c4] to-[#62d9ff] -translate-x-1/2 scale-x-0 opacity-0 transition-all duration-200 shadow-[0_0_14px_rgba(124,247,196,0.45)] group-hover:opacity-100 group-hover:scale-x-100";

  const navItems = [
    { label: "Anasayfa", href: "#home" },
    { label: "Hakkımda", href: "#about" },
    { label: "Teknolojiler", href: "#skills" },
    { label: "Projeler", href: "#projects" },
    { label: "İletişim", href: "#contact" },
  ];

  return (
    <div className={navWrapper}>
      {navItems.map((item) => (
        <Link key={item.label} href={item.href} className={linkItem}>
          {item.label}
          <span className={linkHoverEffect}></span>
        </Link>
      ))}
    </div>
  );
}

function HeaderAction() {
  const actionWrapper = "justify-self-end flex items-center";
  const btn = "group relative h-10 px-5 inline-flex items-center justify-center rounded-full border border-[#7cf7c4]/30 bg-gradient-to-br from-[#7cf7c4]/95 to-[#62d9ff]/90 text-[#04100c] text-sm font-black tracking-tight shadow-lg shadow-[#62d9ff]/20 overflow-hidden whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#62d9ff]/30";
  const btnShine = "absolute inset-[-60%] bg-gradient-to-br from-transparent from-34% via-white/50 to-transparent to-66% -translate-x-[130%] rotate-12 transition-transform duration-500 group-hover:translate-x-[130%]";

  return (
    <div className={actionWrapper}>
      <a download href="/Ali_Emre_Bulut_CV.pdf" className={btn}>
        CV indir ↗
        <span className={btnShine}></span>
      </a>
    </div>
  );
}

// --- Main Component ---
export default function Header() {
  return (
    <header className={styles.header}>
      {/* Decorative bottom line */}
      <div className={styles.decorativeLine}></div>

      <nav className={styles.nav}>
        <HeaderLogo />
        <HeaderNav />
        <HeaderAction />
      </nav>
    </header>
  );
}
