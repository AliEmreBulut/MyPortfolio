"use client";
import { GlassCard } from "@/components/ui/glass-card";
import Image from "next/image";
import { adminStyles as s } from "@/styles/adminStyles";
import { useProfileForm } from "./useProfileForm";

export default function ProfilePage() {
  const {
    formData,
    loading,
    saving,
    uploadingPhoto,
    uploadingCv,
    message,
    handleChange,
    handlePhotoUpload,
    handleCvUpload,
    handleSubmit
  } = useProfileForm();

  if (loading) {
    return <div className="text-white text-center py-20">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Profil Yönetimi</h2>
      </div>

      <GlassCard className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {message.text && (
            <div className={message.type === 'success' ? s.alertSuccess : s.alertError}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required maxLength={100} className={s.input} />
              <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.fullName || "").length} / 100</span></div>
            </div>
            
            <div className="space-y-2">
              <input type="text" name="title" value={formData.title} onChange={handleChange} required maxLength={100} className={s.input} />
              <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.title || "").length} / 100</span></div>
            </div>
          </div>

          <div className="space-y-2">
            <textarea name="shortSummary" value={formData.shortSummary} onChange={handleChange} rows={3} maxLength={300} className={s.textarea} placeholder="Ana sayfada isminizin altında görünecek kısa ve etkili cümle..." />
            <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.shortSummary || "").length} / 300</span></div>
          </div>

          <div className="space-y-2">
            <textarea name="heroCodeSnippet" value={formData.heroCodeSnippet} onChange={handleChange} rows={6} maxLength={2000} className={`${s.textarea} font-mono text-sm`} placeholder={`{\n  "yetenekler": ["C#", "React"],\n  "ingilizce": "B2 - Upper Intermediate"\n}`} />
            <div className="flex justify-between items-start mt-1">
              <p className="text-xs text-slate-400">Ana sayfanın sağ üstündeki kod bloğunda görünecek metni buraya yazabilirsiniz.</p>
              <span className="text-[10px] text-slate-500 shrink-0">{(formData.heroCodeSnippet || "").length} / 2000</span>
            </div>
          </div>

          <div className="space-y-2">
            <textarea name="aboutText" value={formData.aboutText} onChange={handleChange} rows={5} maxLength={3000} className={s.textarea} />
            <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.aboutText || "").length} / 3000</span></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={100} className={s.input} />
              <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.email || "").length} / 100</span></div>
            </div>
            <div className="space-y-2">
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength={30} className={s.input} />
              <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.phone || "").length} / 30</span></div>
            </div>
            <div className="space-y-2">
              <input type="url" name="gitHubUrl" value={formData.gitHubUrl} onChange={handleChange} maxLength={200} className={s.input} />
              <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.gitHubUrl || "").length} / 200</span></div>
            </div>
            <div className="space-y-2">
              <input type="url" name="linkedInUrl" value={formData.linkedInUrl} onChange={handleChange} maxLength={200} className={s.input} />
              <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.linkedInUrl || "").length} / 200</span></div>
            </div>
            <div className="space-y-2">
              <label className={s.label}>Profil Fotoğrafı URL</label>
              <div className="flex gap-4 items-start">
                {formData.profileImageUrl && (
                  <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
                    <Image src={formData.profileImageUrl} alt="Profile" fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <input type="text" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} maxLength={500} className={s.input} placeholder="Veya URL girin..." />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploadingPhoto} className="text-white text-sm" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className={s.label}>Özgeçmiş (CV) URL</label>
              <div className="space-y-2">
                <input type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} maxLength={500} className={s.input} placeholder="Veya URL girin..." />
                <div className="flex items-center gap-4">
                  <input type="file" accept=".pdf" onChange={handleCvUpload} disabled={uploadingCv} className="text-white text-sm" />
                  {formData.resumeUrl && <a href={formData.resumeUrl} target="_blank" rel="noreferrer" className="text-xs text-brand-green underline">Mevcut CV&apos;yi Görüntüle</a>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button type="submit" disabled={saving} className={s.btnPrimary}>
              {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
