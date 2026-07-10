import { useState } from "react";
import { projectClient, CreateProjectRequest } from "@/lib/api/client/project";
import { skillClient } from "@/lib/api/client/skill";
import { uploadClient } from "@/lib/api/client/upload";
import { ProjectResponse } from "@/types/project";
import { SkillResponse } from "@/types/skill";

interface UseProjectFormOptions {
  project?: ProjectResponse | null;
  onSave: () => void;
  onSkillAdded: (skill: SkillResponse) => void;
}

export function useProjectForm({ project, onSave, onSkillAdded }: UseProjectFormOptions) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [newSkillName, setNewSkillName] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);

  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: project?.title || "",
    shortSummary: project?.shortSummary || "",
    detailedDescription: project?.detailedDescription || "",
    coverImageUrl: project?.coverImageUrl || "",
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    displayOrder: project?.displayOrder || 0,
    status: project?.status ?? 1,
    categoryIds: project?.categories?.map(c => c.id) || [],
    skillIds: project?.skills?.map(sk => sk.id) || [],
    galleryImageUrls: project?.galleryImages || []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "displayOrder" ? Number(value) : value }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => {
      const isSelected = prev.categoryIds.includes(categoryId);
      return {
        ...prev,
        categoryIds: isSelected ? prev.categoryIds.filter(id => id !== categoryId) : [...prev.categoryIds, categoryId]
      };
    });
  };

  const handleSkillToggle = (skillId: string) => {
    setFormData(prev => {
      const isSelected = prev.skillIds.includes(skillId);
      return {
        ...prev,
        skillIds: isSelected ? prev.skillIds.filter(id => id !== skillId) : [...prev.skillIds, skillId]
      };
    });
  };

  const handleQuickAddSkill = async () => {
    if (!newSkillName.trim()) return;
    try {
      setAddingSkill(true);
      const created = await skillClient.createSkill({
        name: newSkillName.trim(),
        iconName: "BiCodeAlt",
        category: 6 // 6 = Other
      });
      onSkillAdded(created);
      setFormData(prev => ({
        ...prev,
        skillIds: [...prev.skillIds, created.id]
      }));
      setNewSkillName("");
    } catch (error) {
      alert("Yetenek eklenirken bir hata oluştu.");
    } finally {
      setAddingSkill(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    try {
      setUploading(true);
      const url = await uploadClient.uploadImage(e.target.files[0]);
      setFormData(prev => ({ ...prev, coverImageUrl: url }));
    } catch (error) {
      alert("Kapak resmi yüklenemedi!");
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    try {
      setUploading(true);
      const files = Array.from(e.target.files);
      const urls = await Promise.all(files.map(f => uploadClient.uploadImage(f)));
      setFormData(prev => ({ ...prev, galleryImageUrls: [...prev.galleryImageUrls, ...urls] }));
    } catch (error) {
      alert("Galeri resimleri yüklenemedi!");
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImageUrls: prev.galleryImageUrls.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (project?.id) {
        await projectClient.updateProject(project.id, formData);
      } else {
        await projectClient.createProject(formData);
      }
      onSave();
    } catch (error) {
      setMessage({ text: "Proje kaydedilirken bir hata oluştu.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return {
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
  };
}
