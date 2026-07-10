export const styles = {
  section: "w-full max-w-[1180px] mx-auto px-6 reveal min-h-screen pt-28 pb-16 grid grid-cols-[minmax(0,1fr)_minmax(420px,640px)] gap-11 items-center max-md:grid-cols-1 max-md:pt-32 relative overflow-hidden",
  
  // Left content
  contentWrapper: "max-w-2xl max-md:max-w-full relative z-10",
  badge: "inline-flex items-center gap-2 py-2 px-3.5 rounded-full border border-brand-green/20 bg-gradient-to-b from-brand-green/5 to-white/5 text-[#e8fff4] text-sm font-bold backdrop-blur-md mb-5 shadow-[inset_0_0_0_1px_rgba(124,247,196,0.03),0_18px_55px_rgba(0,0,0,0.15)]",
  badgeDot: "w-2 h-2 rounded-full bg-brand-green shadow-[0_0_0_6px_rgba(124,247,196,0.13)]",
  heading: "text-[clamp(48px,6.3vw,82px)] leading-none tracking-tighter font-black max-w-3xl",
  headingHighlight: "bg-gradient-to-r from-brand-green via-brand-blue to-brand-purple text-transparent bg-clip-text block mt-1",
  description: "max-w-2xl mt-5 text-slate-300 text-lg leading-relaxed max-md:text-base",
  btnGroup: "flex flex-wrap gap-3 mt-7",
  btnOutline: "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black tracking-tight transition-all duration-200 border border-white/10 bg-white/5 text-white shadow-[0_12px_28px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-brand-green/35 hover:bg-white/10 hover:shadow-[0_16px_38px_rgba(0,0,0,0.18),0_0_24px_rgba(124,247,196,0.08)] min-w-32",
  btnPrimary: "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black tracking-tight transition-all duration-200 border border-brand-green/20 bg-gradient-to-br from-brand-green to-brand-blue text-[#03110b] shadow-[0_16px_38px_rgba(98,217,255,0.22)] hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(98,217,255,0.30),0_0_32px_rgba(124,247,196,0.20)] hover:scale-105 min-w-32",

  // Right aside (Terminal & Widget)
  aside: "relative w-full max-w-[620px] ml-auto before:absolute before:inset-[-3px] before:rounded-[38px] before:bg-gradient-to-br before:from-brand-green/75 before:via-brand-blue/60 before:to-brand-purple/55 before:blur-[30px] before:opacity-25 before:-z-10 max-md:hidden group",
  
  // Terminal Card (GlassCard wrapper)
  terminalHeader: "flex items-center justify-between gap-3 px-4 min-h-12 border-b border-white/10 bg-white/5",
  terminalDots: "flex gap-2",
  terminalDot: "w-3 h-3 rounded-full",
  terminalTitle: "text-slate-400 font-mono text-xs font-black",
  terminalBody: "p-5 grid grid-cols-[165px_1fr] gap-4",
  
  commandBox: "flex items-center gap-2 min-h-10 px-3 py-2.5 rounded-2xl bg-gradient-to-b from-white/5 to-black/20 border border-white/10 font-mono text-sm text-[#dbe7f5] mb-4",
  commandPrompt: "text-brand-green font-black",
  commandCursor: "w-2 h-4 bg-brand-green inline-block animate-blink",
  
  tabList: "grid grid-cols-1 gap-3 mb-4",
  tabActive: "flex items-center justify-between w-full text-left border border-brand-green/40 bg-gradient-to-br from-brand-green/20 to-brand-blue/15 text-white px-3 py-3 rounded-2xl text-xs font-black shadow-md after:content-['↗'] after:text-brand-green cursor-pointer",
  tabInactive: "flex items-center justify-between w-full text-left border border-white/10 bg-white/5 text-slate-300 px-3 py-3 rounded-2xl text-xs font-black transition-all hover:-translate-y-0.5 hover:border-brand-green/35 hover:text-white cursor-pointer after:content-['↗'] after:opacity-0 after:-translate-x-1 hover:after:opacity-100 hover:after:translate-x-0 after:transition-all after:text-brand-green",
  
  outputBox: "flex flex-col h-80 rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_10%_0%,rgba(124,247,196,0.08),transparent_28%),rgba(0,0,0,0.24)] overflow-hidden",
  outputHeader: "flex items-center justify-between h-11 px-4 border-b border-white/10 text-slate-400 bg-black/10 font-mono text-xs font-black",
  outputStatus: "inline-flex items-center gap-2 text-brand-green/80 before:w-2 before:h-2 before:rounded-full before:bg-brand-green before:shadow-sm",
  outputContent: "flex-1 p-4 font-mono text-slate-200 text-xs leading-relaxed whitespace-pre-wrap overflow-auto scrollbar-thin scrollbar-thumb-brand-green/40 scrollbar-track-white/5",

  // Hero Widget
  widgetHeader: "flex items-center gap-2 min-h-12 px-4 border-b border-white/10 bg-black/20 font-mono text-slate-200 text-sm font-bold",
  widgetCursor: "w-1.5 h-4 bg-brand-green inline-block animate-widget-blink shadow-[0_0_12px_rgba(124,247,196,0.45)]",
  widgetFilters: "grid grid-cols-3 gap-2 p-3",
  filterActive: "border border-brand-blue/35 bg-brand-blue/10 text-white px-2.5 py-2 rounded-full text-xs font-black cursor-pointer",
  filterInactive: "border border-white/10 bg-white/5 text-slate-300 px-2.5 py-2 rounded-full text-xs font-black transition-all hover:-translate-y-0.5 hover:text-white hover:border-brand-blue/35 hover:bg-brand-blue/10 cursor-pointer",
  widgetResult: "flex items-start gap-3 px-4 pb-4 font-mono",
  widgetResultArrow: "text-brand-blue/80 font-black",
  widgetResultText: "text-slate-400 text-xs leading-relaxed",
};
