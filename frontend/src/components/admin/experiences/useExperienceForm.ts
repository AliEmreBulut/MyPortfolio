import { useState } from "react";
import { experienceClient, ExperienceResponse, CreateExperienceRequest, ExperienceType } from "@/lib/api/client/experience";

interface UseExperienceFormOptions {
  experience?: ExperienceResponse | null;
  userId: string;
  onSave: () => void;
}

export function useExperienceForm({ experience, userId, onSave }: UseExperienceFormOptions) {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState<CreateExperienceRequest>({
    title: experience?.title || "",
    company: experience?.company || "",
    description: experience?.description || "",
    location: experience?.location || "",
    startDate: experience ? experience.startDate.split('T')[0] : "",
    endDate: experience?.endDate ? experience.endDate.split('T')[0] : "",
    type: experience?.type ?? ExperienceType.Job,
    displayOrder: experience?.displayOrder || 0,
    userId: userId
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === "displayOrder" ? Number(value) : name === "type" ? Number(value) : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = { ...formData, userId: userId };
      if (!submitData.endDate) submitData.endDate = undefined;

      if (experience?.id) {
        await experienceClient.updateExperience({ id: experience.id, ...submitData });
      } else {
        await experienceClient.createExperience(submitData);
      }
      onSave();
    } catch (error) {
      setMessage({ text: "Kaydedilirken bir hata oluştu.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return {
    formData,
    message,
    handleChange,
    handleSubmit
  };
}
