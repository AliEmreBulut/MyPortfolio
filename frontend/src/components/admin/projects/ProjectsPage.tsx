"use client";
import { GlassCard } from "@/components/ui/glass-card";
import { adminStyles as s } from "@/styles/adminStyles";
import { ProjectForm } from "./ProjectForm";
import { useProjectsPage } from "./useProjectsPage";

export default function ProjectsPage() {
  const {
    projects,
    allSkills,
    allCategories,
    loading,
    showForm,
    editingProject,
    message,
    handleOpenForm,
    handleSave,
    handleDelete,
    handleSkillAdded,
    handleCloseForm
  } = useProjectsPage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Projeler Yönetimi</h2>
        {!showForm && (
          <button onClick={() => handleOpenForm()} className={s.btnAdd}>
            + Yeni Proje Ekle
          </button>
        )}
      </div>

      {message.text && !showForm && (
        <div className={`p-4 rounded-lg font-bold text-sm ${message.type === 'success' ? s.alertSuccess : s.alertError}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <div className="text-white">Yükleniyor...</div>
      ) : showForm ? (
        <ProjectForm 
          project={editingProject} 
          allSkills={allSkills} 
          allCategories={allCategories}
          onSave={handleSave} 
          onCancel={handleCloseForm} 
          onSkillAdded={handleSkillAdded}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.length === 0 && <div className="text-slate-400">Henüz proje eklenmemiş.</div>}
          {projects.map(project => (
            <GlassCard key={project.id} className="p-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">{project.title}</h4>
                <p className="text-sm text-slate-400">{project.shortSummary}</p>
                <div className="flex gap-2 mt-2">
                  {project.categories?.map(c => <span key={c.id} className="text-xs bg-brand-green/20 text-brand-green px-2 py-1 rounded">{c.name}</span>)}
                  {project.skills?.map(s => <span key={s.id} className="text-xs bg-white/10 px-2 py-1 rounded text-white">{s.name}</span>)}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenForm(project)} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">Düzenle</button>
                <button onClick={() => handleDelete(project.id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30">Sil</button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
