import { useState, useEffect } from "react";
import { skillClient } from "@/lib/api/client/skill";
import { SkillResponse } from "@/types/skill";

export function useSkillsPage() {
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillResponse | null>(null);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await skillClient.getSkills();
      setSkills(data);
    } catch (error) {
      console.error("Yetenekler yüklenemedi", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (skill?: SkillResponse) => {
    setEditingSkill(skill || null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    loadSkills();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu yeteneği silmek istediğinize emin misiniz?")) {
      try {
        await skillClient.deleteSkill(id);
        loadSkills();
      } catch (error) {
        alert("Silme hatası!");
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return {
    skills,
    loading,
    showForm,
    editingSkill,
    handleOpenForm,
    handleSave,
    handleDelete,
    handleCloseForm
  };
}
