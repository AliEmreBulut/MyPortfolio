"use client";
import { GlassCard } from "@/components/ui/glass-card";
import { adminStyles as s } from "@/styles/adminStyles";
import { SkillForm } from "./SkillForm";
import { useSkillsPage } from "./useSkillsPage";

const CATEGORIES = [
  { id: 0, name: "Frontend" },
  { id: 1, name: "Backend" },
  { id: 2, name: "DevOps" },
  { id: 3, name: "Database" },
  { id: 4, name: "Mobile" },
  { id: 5, name: "Architecture" },
  { id: 6, name: "Other" },
];

export default function SkillsPage() {
  const {
    skills,
    loading,
    showForm,
    editingSkill,
    handleOpenForm,
    handleSave,
    handleDelete,
    handleCloseForm
  } = useSkillsPage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Yetenek (Skill) Yönetimi</h2>
        {!showForm && (
          <button onClick={() => handleOpenForm()} className={s.btnAdd}>
            + Yeni Yetenek Ekle
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-white">Yükleniyor...</div>
      ) : showForm ? (
        <SkillForm 
          skill={editingSkill}
          onSave={handleSave}
          onCancel={handleCloseForm}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.length === 0 && <div className="text-slate-400 col-span-full">Henüz yetenek eklenmemiş.</div>}
          {skills.map(skill => (
            <GlassCard key={skill.id} className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">{skill.name}</h4>
                <p className="text-xs text-brand-green/80 mt-1">{CATEGORIES.find(c => c.id === skill.category)?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => handleOpenForm(skill)} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 text-xs font-bold">Düzenle</button>
                <button onClick={() => handleDelete(skill.id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 text-xs font-bold">Sil</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
