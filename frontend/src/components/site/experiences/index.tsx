import { ExperienceResponse, ExperienceType } from '@/lib/api/client/experience';

interface ExperiencesProps {
  experiences: ExperienceResponse[];
}

export default function Experiences({ experiences }: ExperiencesProps) {
  if (!experiences || experiences.length === 0) return null;

  const getTypeLabel = (type: ExperienceType) => {
    switch (type) {
      case ExperienceType.Job: return "İş";
      case ExperienceType.Internship: return "Staj";
      case ExperienceType.Freelance: return "Freelance";
      case ExperienceType.Volunteer: return "Gönüllü";
      case ExperienceType.Education: return "Eğitim";
      case ExperienceType.TrainingProgram: return "Eğitim Programı";
      default: return "Diğer";
    }
  };

  return (
    <section id="experiences" className="w-full max-w-[1180px] mx-auto px-[24px] py-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="mb-12">
        <p className="text-brand-green text-xs font-black tracking-widest uppercase mb-3">EXPERIENCE & EDUCATION</p>
        <div className="flex items-center gap-4">
          <h2 className="text-3xl md:text-5xl font-black text-white">Deneyim & Eğitim</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-green/50 to-transparent"></div>
        </div>
      </div>

      <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 pl-8 space-y-12">
        {experiences.map((exp, index) => (
          <div key={exp.id} className="relative group">
            {/* Zaman çizelgesi noktası */}
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#030508] border-2 border-white/20 group-hover:border-brand-green transition-colors z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              {/* Tarih sütunu */}
              <div className="md:w-48 shrink-0 pt-1">
                <span className="text-brand-green font-bold text-sm tracking-widest uppercase">
                  {new Date(exp.startDate).getFullYear()} — {exp.endDate ? new Date(exp.endDate).getFullYear() : 'DEVAM'}
                </span>
              </div>

              {/* İçerik sütunu */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-green transition-colors">
                    {exp.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-slate-300">
                    {getTypeLabel(exp.type)}
                  </span>
                </div>

                <h4 className="text-lg text-slate-300 font-medium mb-3">
                  {exp.company}
                  {exp.location && <span className="text-slate-500 text-sm ml-2 font-normal">• {exp.location}</span>}
                </h4>

                {exp.description && (
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl whitespace-pre-wrap">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
