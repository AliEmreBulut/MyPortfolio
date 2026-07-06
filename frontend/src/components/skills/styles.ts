export const styles = {
  section: "w-full max-w-[1180px] mx-auto px-6 py-24 max-md:py-16 reveal",
  headerBox: "mb-10",
  subTitle: "text-brand-green text-xs font-black tracking-widest uppercase mb-3",
  title: "text-[clamp(36px,5vw,60px)] leading-none font-black tracking-tight max-w-3xl text-brand-text",
  description: "text-brand-muted max-w-3xl leading-relaxed text-base mt-4",
  grid: "grid grid-cols-[360px_1fr] gap-6 items-stretch max-md:grid-cols-1",
  
  asideCard: "p-7 relative overflow-hidden before:absolute before:inset-[-120px_-120px_auto_auto] before:w-[260px] before:h-[260px] before:rounded-full before:bg-[radial-gradient(circle,rgba(124,247,196,0.12),transparent_68%)] before:pointer-events-none",
  techBadge: "inline-flex items-center gap-2.5 h-8 px-3 rounded-full border border-brand-green/20 bg-brand-green/5 text-slate-300 font-mono text-xs font-black mb-6",
  techBadgeDot: "w-2 h-2 rounded-full bg-brand-green shadow-[0_0_16px_rgba(124,247,196,0.72)]",
  asideTitle: "m-0 mb-3 text-white text-3xl tracking-tight font-black",
  asideDesc: "m-0 mb-6 text-slate-400 text-sm leading-relaxed",
  
  btnContainer: "grid gap-2.5",
  btn: "tech-select-btn min-h-[52px] px-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 text-slate-300 text-sm font-black cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:text-white hover:border-brand-blue/30 hover:bg-brand-blue/10 group [&.active]:text-brand-bg [&.active]:border-brand-green/50 [&.active]:bg-gradient-to-br [&.active]:from-brand-green [&.active]:to-brand-blue [&.active]:shadow-lg",
  btnNumber: "text-brand-green/80 font-mono text-xs group-[.active]:text-brand-bg/60",
  
  previewCard: "tech-preview-card p-8 relative overflow-hidden transition-all duration-200 before:absolute before:right-[-90px] before:top-[-90px] before:w-[260px] before:h-[260px] before:rounded-full before:bg-[radial-gradient(circle,rgba(98,217,255,0.15),transparent_66%)] before:pointer-events-none [&.is-changing]:opacity-60 [&.is-changing]:translate-y-1",
  previewHeader: "flex justify-between items-start gap-5 mb-5",
  previewKicker: "inline-flex mb-2 text-brand-green/90 font-mono text-xs font-black tracking-widest uppercase",
  previewTitle: "m-0 text-white text-[clamp(26px,3vw,38px)] leading-tight tracking-tight max-w-2xl",
  previewIcon: "grid place-items-center flex-[0_0_42px] w-10 h-10 rounded-2xl border border-brand-green/30 bg-brand-green/10 text-brand-green text-xl font-black",
  
  commandBox: "flex items-center gap-2.5 min-h-[46px] px-4 mb-5 rounded-2xl border border-white/10 bg-black/20 font-mono",
  commandPrompt: "text-brand-blue/80 font-black",
  commandText: "text-brand-green/90 text-sm font-bold",
  
  previewText: "mb-6 text-slate-300/80 text-base leading-relaxed",
  
  chipsContainer: "flex flex-wrap gap-2.5 mb-6 [&>span]:inline-flex [&>span]:items-center [&>span]:min-h-[40px] [&>span]:px-4 [&>span]:rounded-full [&>span]:border [&>span]:border-white/10 [&>span]:bg-gradient-to-b [&>span]:from-white/10 [&>span]:to-white/5 [&>span]:text-slate-200 [&>span]:text-sm [&>span]:font-bold [&>span]:transition-all [&>span]:duration-200 hover:[&>span]:-translate-y-0.5 hover:[&>span]:border-brand-green/30 hover:[&>span]:bg-brand-green/10",
  
  focusBox: "flex items-start gap-4 p-5 rounded-3xl border border-brand-green/20 bg-[radial-gradient(circle_at_8%_0%,rgba(124,247,196,0.1),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]",
  focusBadge: "flex-[0_0_auto] inline-flex items-center h-7 px-3 rounded-full border border-brand-green/20 bg-brand-green/10 text-brand-green font-mono text-xs font-black tracking-widest uppercase",
  focusText: "m-0 mt-0.5 text-slate-200 text-sm leading-relaxed",
};
