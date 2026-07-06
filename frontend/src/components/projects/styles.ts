export const styles = {
  section: "w-full max-w-[1180px] mx-auto px-6 py-24 max-md:py-16 reveal",
  headerBox: "mb-10",
  subTitle: "text-brand-green text-xs font-black tracking-widest uppercase mb-3",
  title: "text-[clamp(36px,5vw,60px)] leading-none font-black tracking-tight max-w-3xl text-brand-text",
  description: "text-brand-muted max-w-3xl leading-relaxed text-base mt-4",
  grid: "grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1",
  
  // Flip Card container
  flipCard: "min-h-[380px] perspective-[1200px] group",
  flipInner: "relative w-full h-full min-h-[380px] preserve-3d transition-transform duration-[720ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-[.is-flipped]:rotate-y-180",
  
  // Front and back face wrappers
  faceFront: "absolute inset-0 flex flex-col p-7 overflow-hidden backface-hidden",
  faceBack: "absolute inset-0 flex flex-col p-7 overflow-hidden backface-hidden rotate-y-180 pb-20",
  
  badge: "inline-flex w-fit h-8 items-center px-3 rounded-full border border-brand-green/20 bg-brand-green/5 text-brand-green/90 font-mono text-xs font-black tracking-widest uppercase mb-5",
  cardTitle: "m-0 mb-3.5 text-white text-3xl leading-tight tracking-tight font-black",
  cardDesc: "m-0 mb-6 text-slate-300/80 leading-relaxed text-sm",
  
  btnContainer: "absolute left-1/2 bottom-7 -translate-x-1/2 w-max flex justify-center items-center gap-2.5",
  btnOutline: "w-[124px] h-[42px] inline-flex items-center justify-center rounded-full text-sm font-black whitespace-nowrap transition-all duration-200 border border-white/10 bg-white/5 text-slate-200 hover:-translate-y-0.5 hover:text-white hover:border-brand-blue/30 hover:bg-brand-blue/10",
  btnPrimary: "w-[124px] h-[42px] inline-flex items-center justify-center rounded-full text-sm font-black whitespace-nowrap transition-all duration-200 bg-gradient-to-br from-brand-green to-brand-blue text-brand-bg border border-brand-green/30 shadow-[0_14px_34px_rgba(98,217,255,0.12),inset_0_1px_0_rgba(255,255,255,0.30)] hover:shadow-[0_18px_44px_rgba(98,217,255,0.18),0_0_24px_rgba(124,247,196,0.10)]",
  
  backTitle: "m-0 mb-3.5 text-white text-3xl leading-tight tracking-tight font-black",
  backList: "grid gap-2.5 m-0 after:content-[''] after:block after:w-3/4 after:h-px after:mx-auto after:my-6 after:bg-gradient-to-r after:from-transparent after:via-brand-green/20 after:to-transparent",
  backItem: "p-3.5 rounded-2xl border border-white/10 bg-black/20",
  backItemTitle: "block mb-1 text-white text-sm font-black",
  backItemDesc: "m-0 text-slate-300/70 text-xs leading-relaxed",
  btnBack: "absolute bottom-7 left-1/2 -translate-x-1/2 w-[124px] h-[42px] inline-flex items-center justify-center rounded-full text-sm font-black whitespace-nowrap transition-all duration-200 border border-white/10 bg-white/5 text-slate-200 hover:-translate-y-0.5 hover:text-white hover:border-brand-blue/30 hover:bg-brand-blue/10",
  
  modalContainer: "fixed inset-0 z-[999] flex items-center justify-center p-6",
  modalBackdrop: "absolute inset-0 bg-slate-950/70 backdrop-blur-md",
  modalDialog: "relative z-10 w-[min(960px,100%)] max-h-[min(780px,calc(100vh-48px))] grid grid-cols-[1.05fr_0.95fr] max-md:grid-cols-1 overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-b from-slate-900/95 to-brand-bg/95 shadow-2xl",
  modalClose: "absolute right-4 top-4 z-20 w-10 h-10 grid place-items-center rounded-full border border-white/10 bg-black/20 text-slate-200 text-2xl cursor-pointer hover:bg-black/40 hover:text-white transition-all",
  modalImageWrapper: "min-h-[430px] max-md:min-h-[250px] relative bg-[radial-gradient(circle_at_18%_0%,rgba(124,247,196,0.15),transparent_32%),radial-gradient(circle_at_88%_60%,rgba(98,217,255,0.16),transparent_34%)] bg-slate-900 overflow-hidden",
  modalImage: "w-full h-full min-h-[430px] max-md:min-h-[250px] object-cover block opacity-90 transition-opacity duration-200",
  modalFallback: "absolute inset-0 grid place-items-center text-slate-300/60 text-3xl font-black tracking-tighter",
  modalContent: "p-10 max-md:p-7 overflow-auto",
  modalStack: "flex flex-wrap gap-2.5 mt-6 [&>span]:inline-flex [&>span]:min-h-10 [&>span]:items-center [&>span]:px-4 [&>span]:rounded-full [&>span]:border [&>span]:border-white/10 [&>span]:bg-white/5 [&>span]:text-slate-200 [&>span]:text-sm [&>span]:font-bold",
};
