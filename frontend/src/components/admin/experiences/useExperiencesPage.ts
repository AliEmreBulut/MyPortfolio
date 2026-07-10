import { useState, useEffect } from "react";
import { experienceClient, ExperienceResponse, ExperienceType } from "@/lib/api/client/experience";
import { profileClient } from "@/lib/api/client/profile";

export function useExperiencesPage() {
  const [experiences, setExperiences] = useState<ExperienceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<ExperienceResponse | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expData, profileData] = await Promise.all([
        experienceClient.getExperiences(),
        profileClient.getProfile()
      ]);
      setExperiences(expData);
      setUserId(profileData.id);
    } catch (error) {
      console.error("Veriler yüklenemedi", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (experience?: ExperienceResponse) => {
    setEditingExperience(experience || null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setMessage({ text: editingExperience ? "Deneyim güncellendi!" : "Deneyim oluşturuldu!", type: "success" });
    loadData();
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      try {
        await experienceClient.deleteExperience(id);
        setMessage({ text: "Deneyim silindi.", type: "success" });
        loadData();
      } catch (error) {
        setMessage({ text: "Silme işlemi başarısız oldu.", type: "error" });
      }
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

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

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return {
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
  };
}
