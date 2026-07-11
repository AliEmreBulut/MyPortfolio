"use client";
import { useState } from "react";
import { skillClient, CreateSkillRequest } from "@/lib/api/client/skill";
import { SkillResponse } from "@/types/skill";
import { GlassCard } from "@/components/ui/glass-card";
import { adminStyles as s } from "@/styles/adminStyles";

const CATEGORIES = [
  { id: 0, name: "Frontend" },
  { id: 1, name: "Backend" },
  { id: 2, name: "DevOps" },
  { id: 3, name: "Database" },
  { id: 4, name: "Mobile" },
  { id: 5, name: "Architecture" },
  { id: 6, name: "Other" },
];

interface SkillFormProps {
  skill?: SkillResponse | null;
  onSave: () => void;
  onCancel: () => void;
}

export function SkillForm({ skill, onSave, onCancel }: SkillFormProps) {
  const [formData, setFormData] = useState<CreateSkillRequest>({
    name: skill?.name || "",
    iconName: skill?.iconName || "",
    iconUrl: skill?.iconUrl || "",
    category: skill?.category ?? 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "category" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (skill?.id) {
        await skillClient.updateSkill(skill.id, formData);
      } else {
        await skillClient.createSkill(formData);
      }
      onSave();
    } catch (error) {
      alert("Hata oluştu!");
    }
  };

  return (
    <GlassCard className="p-6 max-w-2xl">
      <h3 className="text-lg font-bold text-white mb-4">{skill?.id ? "Yeteneği Düzenle" : "Yeni Yetenek"}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={s.labelBlock}>Yetenek Adı (Örn: React) *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} maxLength={50} className={s.inputSm} />
            <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.name || "").length} / 50</span></div>
          </div>
          <div>
            <label className={s.labelBlock}>Kategori *</label>
            <select name="category" value={formData.category} onChange={handleChange} className={s.select}>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={s.labelBlock}>İkon Adı (opsiyonel)</label>
            <input type="text" name="iconName" value={formData.iconName} onChange={handleChange} maxLength={50} className={s.inputSm} />
            <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.iconName || "").length} / 50</span></div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className={s.btnSecondary}>İptal</button>
          <button type="submit" className={`${s.btnAdd}`}>Kaydet</button>
        </div>
      </form>
    </GlassCard>
  );
}
