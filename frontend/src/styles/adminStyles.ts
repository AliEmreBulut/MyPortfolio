export const adminStyles = {
  input: "w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-green/50 focus:bg-white/10 transition-all",
  inputSm: "w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-brand-green/50 focus:bg-white/10 transition-all",
  textarea: "w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-brand-green/50 focus:bg-white/10 transition-all resize-y",
  select: "w-full h-10 px-3 rounded-lg bg-[#030508] border border-white/10 text-white outline-none focus:border-brand-green/50 transition-all",
  label: "text-sm font-bold text-slate-300",
  labelBlock: "block text-sm font-bold text-slate-300 mb-1",
  btnPrimary: "px-8 py-3 bg-gradient-to-r from-brand-green to-brand-blue text-[#030508] font-black rounded-xl shadow-[0_0_20px_rgba(124,247,196,0.3)] hover:shadow-[0_0_30px_rgba(124,247,196,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed",
  btnSecondary: "px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition",
  btnAdd: "px-4 py-2 bg-brand-green text-[#030508] font-bold rounded-lg hover:shadow-[0_0_15px_rgba(124,247,196,0.3)] transition-all",
  alertSuccess: "p-4 rounded-xl text-sm font-bold bg-brand-green/10 text-brand-green border border-brand-green/20",
    alertError: "p-4 rounded-xl text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20",
} as const;
