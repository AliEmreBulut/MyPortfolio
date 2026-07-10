"use client";
import { ExperienceResponse, ExperienceType } from "@/lib/api/client/experience";
import { GlassCard } from "@/components/ui/glass-card";
import { adminStyles as s } from "@/styles/adminStyles";
import { useExperienceForm } from "./useExperienceForm";

interface ExperienceFormProps {
  experience?: ExperienceResponse | null;
  userId: string;
  onSave: () => void;
  onCancel: () => void;
}

export function ExperienceForm({ experience, userId, onSave, onCancel }: ExperienceFormProps) {
  const {
    formData,
    message,
    handleChange,
    handleSubmit
  } = useExperienceForm({ experience, userId, onSave });

  return (
    <GlassCard className="p-6 max-w-4xl">
      <h3 className="text-lg font-bold text-white mb-4">{experience?.id ? "Düzenle" : "Yeni Ekle"}</h3>
      {message.text && (
        <div className={`mb-4 ${message.type === 'success' ? s.alertSuccess : s.alertError}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={s.labelBlock}>Başlık/Pozisyon *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className={s.inputSm} />
          </div>
          <div>
            <label className={s.labelBlock}>Kurum/Şirket *</label>
            <input required type="text" name="company" value={formData.company} onChange={handleChange} className={s.inputSm} />
          </div>
          <div>
            <label className={s.labelBlock}>Konum</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className={s.inputSm} />
          </div>
          <div>
            <label className={s.labelBlock}>Tür</label>
            <select name="type" value={formData.type} onChange={handleChange} className={s.select}>
              <option value={ExperienceType.Job}>İş</option>
              <option value={ExperienceType.Internship}>Staj</option>
              <option value={ExperienceType.Freelance}>Freelance</option>
              <option value={ExperienceType.Volunteer}>Gönüllü</option>
              <option value={ExperienceType.Education}>Eğitim</option>
              <option value={ExperienceType.TrainingProgram}>Eğitim Programı</option>
            </select>
          </div>
          <div>
            <label className={s.labelBlock}>Başlangıç Tarihi *</label>
            <input required type="date" name="startDate" value={formData.startDate} onChange={handleChange} className={s.inputSm} />
          </div>
          <div>
            <label className={s.labelBlock}>Bitiş Tarihi (Devam ediyorsa boş bırakın)</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className={s.inputSm} />
          </div>
          <div>
            <label className={s.labelBlock}>Sıralama Numarası</label>
            <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} className={s.inputSm} />
          </div>
          <div className="col-span-full">
            <label className={s.labelBlock}>Açıklama</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={s.textarea} />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button type="button" onClick={onCancel} className={s.btnSecondary}>İptal</button>
          <button type="submit" className={s.btnAdd}>Kaydet</button>
        </div>
      </form>
    </GlassCard>
  );
}
