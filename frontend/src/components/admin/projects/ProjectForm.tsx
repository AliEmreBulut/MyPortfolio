"use client";
import Image from "next/image";
import { ProjectResponse } from "@/types/project";
import { SkillResponse } from "@/types/skill";
import { CategoryResponse } from "@/lib/api/client/category";
import { GlassCard } from "@/components/ui/glass-card";
import { adminStyles as s } from "@/styles/adminStyles";
import { useProjectForm } from "./useProjectForm";

interface ProjectFormProps {
  project?: ProjectResponse | null;
  allSkills: SkillResponse[];
  allCategories: CategoryResponse[];
  onSave: () => void;
  onCancel: () => void;
  onSkillAdded: (skill: SkillResponse) => void;
}

export function ProjectForm({ project, allSkills, allCategories, onSave, onCancel, onSkillAdded }: ProjectFormProps) {
  const {
    formData,
    uploading,
    message,
    newSkillName,
    setNewSkillName,
    addingSkill,
    handleChange,
    handleCategoryToggle,
    handleSkillToggle,
    handleQuickAddSkill,
    handleCoverUpload,
    handleGalleryUpload,
    removeGalleryImage,
    handleSubmit
  } = useProjectForm({ project, onSave, onSkillAdded });

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-bold text-white mb-4">{project?.id ? "Projeyi Düzenle" : "Yeni Proje"}</h3>
      {message.text && (
        <div className={`mb-4 ${message.type === 'success' ? s.alertSuccess : s.alertError}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className={s.labelBlock}>Proje Adı *</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className={s.inputSm} />
            </div>
            <div>
              <label className={s.labelBlock}>Kısa Açıklama</label>
              <input type="text" name="shortSummary" value={formData.shortSummary} onChange={handleChange} className={s.inputSm} />
            </div>
            <div>
              <label className={s.labelBlock}>GitHub URL</label>
              <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className={s.inputSm} />
            </div>
            <div>
              <label className={s.labelBlock}>Canlı Demo URL</label>
              <input type="url" name="liveUrl" value={formData.liveUrl} onChange={handleChange} className={s.inputSm} />
            </div>
            <div>
              <label className={s.labelBlock}>Kapak Resmi</label>
              <div className="flex gap-4 items-start">
                {formData.coverImageUrl && (
                  <div className="relative w-24 h-16 rounded overflow-hidden">
                    <Image src={formData.coverImageUrl} alt="Cover" fill className="object-cover" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploading} className="text-white text-sm" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className={s.labelBlock}>Kategoriler</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {allCategories.length === 0 ? (
                  <span className="text-sm text-slate-400">Önce kategori eklemelisiniz.</span>
                ) : (
                  allCategories.map(category => {
                    const isSelected = formData.categoryIds.includes(category.id);
                    return (
                      <div 
                        key={category.id}
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-colors border select-none ${isSelected ? 'bg-brand-green/20 border-brand-green text-brand-green' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                      >
                        {category.name}
                      </div>
                    );
                  })
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <label className={`${s.labelBlock} !mb-0`}>Kullanılan Yetenekler (Skills)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Hızlı Yetenek Ekle..."
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white focus:outline-none focus:border-brand-green w-32"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleQuickAddSkill())}
                  />
                  <button 
                    type="button"
                    onClick={handleQuickAddSkill}
                    disabled={addingSkill || !newSkillName.trim()}
                    className="px-2 py-1 bg-brand-green/20 text-brand-green border border-brand-green/50 rounded text-xs hover:bg-brand-green/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {addingSkill ? "..." : "+ Ekle"}
                  </button>
                </div>
              </div>
              <div className="h-48 overflow-y-auto bg-white/5 border border-white/10 rounded-lg p-3 grid grid-cols-2 gap-2">
                {allSkills.length === 0 ? (
                  <div className="col-span-2 h-full flex flex-col items-center justify-center text-center opacity-60">
                    <span className="text-3xl mb-2">⚡</span>
                    <p className="text-sm">Henüz sistemde yetenek (skill) bulunmuyor.</p>
                  </div>
                ) : (
                  allSkills.map(skill => {
                    const isSelected = formData.skillIds.includes(skill.id);
                    return (
                      <div 
                        key={skill.id}
                        onClick={() => handleSkillToggle(skill.id)}
                        className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors border select-none ${isSelected ? 'bg-brand-green/20 border-brand-green text-white' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
                      >
                        <div className={`w-4 h-4 mr-2 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-brand-green border-brand-green' : 'border-white/30'}`}>
                          {isSelected && <span className="text-black text-[10px] font-bold">✓</span>}
                        </div>
                        <span className="text-sm truncate" title={skill.name}>{skill.name}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            
            <div>
              <label className={s.labelBlock}>Detaylı Açıklama</label>
              <textarea name="detailedDescription" value={formData.detailedDescription} onChange={handleChange} rows={5} className={`${s.inputSm} !h-auto p-3`} />
            </div>
          </div>
        </div>

        <div>
          <label className={`${s.labelBlock} mb-2`}>Galeri Görselleri (Çoklu Seçim)</label>
          <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} disabled={uploading} className="mb-4 text-white text-sm" />
          
          {formData.galleryImageUrls.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {formData.galleryImageUrls.map((url, idx) => (
                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden group">
                  <Image src={url} alt="Gallery" fill className="object-cover" />
                  <button 
                    type="button" 
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button type="button" onClick={onCancel} className={s.btnSecondary}>İptal</button>
          <button type="submit" disabled={uploading} className={`${s.btnAdd} disabled:opacity-50`}>
            {uploading ? "Yükleniyor..." : "Projeyi Kaydet"}
          </button>
        </div>
      </form>
    </GlassCard>
  );
}
