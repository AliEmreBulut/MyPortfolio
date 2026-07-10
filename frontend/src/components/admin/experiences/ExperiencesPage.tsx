"use client";
import { ExperienceType } from "@/lib/api/client/experience";
import { GlassCard } from "@/components/ui/glass-card";
import { adminStyles as s } from "@/styles/adminStyles";
import { ExperienceForm } from "./ExperienceForm";
import { useExperiencesPage } from "./useExperiencesPage";

export default function ExperiencesPage() {
  const {
    experiences,
    loading,
    showForm,
    editingExperience,
    message,
    userId,
    handleOpenForm,
    handleSave,
    handleDelete,
    getTypeLabel,
    handleCloseForm
  } = useExperiencesPage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Deneyim & Eğitim Yönetimi</h2>
        {!showForm && (
          <button onClick={() => handleOpenForm()} className={s.btnAdd}>
            + Yeni Ekle
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-white">Yükleniyor...</div>
      ) : showForm ? (
        <ExperienceForm 
          experience={editingExperience}
          userId={userId}
          onSave={handleSave}
          onCancel={handleCloseForm}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {message.text && (
            <div className={`mb-4 ${message.type === 'success' ? s.alertSuccess : s.alertError}`}>
              {message.text}
            </div>
          )}
          {experiences.length === 0 && <div className="text-slate-400">Henüz kayıt eklenmemiş.</div>}
          
          {experiences.map(exp => (
            <GlassCard key={exp.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-slate-300">
                    {getTypeLabel(exp.type)}
                  </span>
                </div>
                <p className="text-sm text-brand-green font-semibold">{exp.company}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Devam Ediyor'}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenForm(exp)} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">Düzenle</button>
                <button onClick={() => handleDelete(exp.id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30">Sil</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
