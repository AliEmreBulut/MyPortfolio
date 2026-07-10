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
              <label className={s.label}>Ad Soyad *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className={s.input} />
            </div>
            
            <div className="space-y-2">
              <label className={s.label}>Unvan (Title) *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className={s.input} />
            </div>
          </div>

          <div className="space-y-2">
            <label className={s.label}>Kısa Özet (Hero Karşılama Bölümü İçin)</label>
            <textarea name="shortSummary" value={formData.shortSummary} onChange={handleChange} rows={3} className={s.textarea} placeholder="Ana sayfada isminizin altında görünecek kısa ve etkili cümle..." />
          </div>

          <div className="space-y-2">
            <label className={s.label}>Hero Terminal Kodu (JSON veya Düz Metin)</label>
            <textarea name="heroCodeSnippet" value={formData.heroCodeSnippet} onChange={handleChange} rows={6} className={`${s.textarea} font-mono text-sm`} placeholder={`{\n  "yetenekler": ["C#", "React"],\n  "ingilizce": "B2 - Upper Intermediate"\n}`} />
            <p className="text-xs text-slate-400">Ana sayfanın sağ üstündeki kod bloğunda görünecek metni buraya yazabilirsiniz.</p>
          </div>

          <div className="space-y-2">
            <label className={s.label}>Hakkımda (About - Uzun Açıklama)</label>
            <textarea name="aboutText" value={formData.aboutText} onChange={handleChange} rows={5} className={s.textarea} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className={s.label}>E-posta</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={s.input} />
            </div>
            <div className="space-y-2">
              <label className={s.label}>Telefon</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={s.input} />
            </div>
            <div className="space-y-2">
              <label className={s.label}>GitHub URL</label>
              <input type="url" name="gitHubUrl" value={formData.gitHubUrl} onChange={handleChange} className={s.input} />
            </div>
            <div className="space-y-2">
              <label className={s.label}>LinkedIn URL</label>
              <input type="url" name="linkedInUrl" value={formData.linkedInUrl} onChange={handleChange} className={s.input} />
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
                  <input type="text" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} className={s.input} placeholder="Veya URL girin..." />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploadingPhoto} className="text-white text-sm" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className={s.label}>Özgeçmiş (CV) URL</label>
              <div className="space-y-2">
                <input type="text" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} className={s.input} placeholder="Veya URL girin..." />
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
