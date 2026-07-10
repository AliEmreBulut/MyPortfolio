import { useState, useEffect } from "react";
import { profileClient, UpdateUserProfileRequest } from "@/lib/api/client/profile";
import { uploadClient } from "@/lib/api/client/upload";

export function useProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const [formData, setFormData] = useState<UpdateUserProfileRequest>({
    fullName: "",
    title: "",
    shortSummary: "",
    heroCodeSnippet: "",
    aboutText: "",
    email: "",
    phone: "",
    gitHubUrl: "",
    linkedInUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    profileImageUrl: "",
    resumeUrl: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileClient.getProfile();
      setFormData({
        fullName: data.fullName || "",
        title: data.title || "",
        shortSummary: data.shortSummary || "",
        heroCodeSnippet: data.heroCodeSnippet || "",
        aboutText: data.aboutText || "",
        email: data.email || "",
        phone: data.phone || "",
        gitHubUrl: data.gitHubUrl || "",
        linkedInUrl: data.linkedInUrl || "",
        twitterUrl: data.twitterUrl || "",
        instagramUrl: data.instagramUrl || "",
        profileImageUrl: data.profileImageUrl || "",
        resumeUrl: data.resumeUrl || ""
      });
    } catch (error) {
      console.error("Profil yüklenemedi", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      setUploadingPhoto(true);
      const url = await uploadClient.uploadFile(e.target.files[0]);
      setFormData(prev => ({ ...prev, profileImageUrl: url }));
    } catch (error) {
      alert("Profil fotoğrafı yüklenemedi!");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      setUploadingCv(true);
      const url = await uploadClient.uploadFile(e.target.files[0]);
      setFormData(prev => ({ ...prev, resumeUrl: url }));
    } catch (error) {
      alert("CV yüklenemedi!");
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      await profileClient.updateProfile(formData);
      setMessage({ text: "Profil başarıyla güncellendi!", type: "success" });
    } catch (error) {
      setMessage({ text: "Güncelleme sırasında bir hata oluştu.", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return {
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
  };
}
