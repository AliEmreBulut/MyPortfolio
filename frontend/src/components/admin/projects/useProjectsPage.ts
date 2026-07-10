import { useState, useEffect } from "react";
import { projectClient } from "@/lib/api/client/project";
import { skillClient } from "@/lib/api/client/skill";
import { categoryClient, CategoryResponse } from "@/lib/api/client/category";
import { ProjectResponse } from "@/types/project";
import { SkillResponse } from "@/types/skill";

export function useProjectsPage() {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [allSkills, setAllSkills] = useState<SkillResponse[]>([]);
  const [allCategories, setAllCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectResponse | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, skillsData, categoriesData] = await Promise.all([
        projectClient.getProjects(),
        skillClient.getSkills(),
        categoryClient.getCategories()
      ]);
      setProjects(projectsData);
      setAllSkills(skillsData);
      setAllCategories(categoriesData);
    } catch (error) {
      console.error("Veriler yüklenemedi", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (project?: ProjectResponse) => {
    setEditingProject(project || null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setMessage({ text: editingProject ? "Proje güncellendi!" : "Proje oluşturuldu!", type: "success" });
    loadData();
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu projeyi silmek istediğinize emin misiniz?")) {
      try {
        await projectClient.deleteProject(id);
        setMessage({ text: "Proje silindi.", type: "success" });
        loadData();
      } catch (error) {
        setMessage({ text: "Silme işlemi başarısız oldu.", type: "error" });
      }
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleSkillAdded = (skill: SkillResponse) => {
    setAllSkills(prev => [...prev, skill]);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return {
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
  };
}
