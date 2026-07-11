"use client";
import { useState } from "react";
import { categoryClient, CategoryResponse, CreateCategoryRequest } from "@/lib/api/client/category";
import { GlassCard } from "@/components/ui/glass-card";
import { adminStyles as s } from "@/styles/adminStyles";

interface CategoryFormProps {
  category?: CategoryResponse | null;
  onSave: () => void;
  onCancel: () => void;
}

export function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    name: category?.name || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (category?.id) {
        await categoryClient.updateCategory({ id: category.id, ...formData });
      } else {
        await categoryClient.createCategory(formData);
      }
      onSave();
    } catch (error) {
      setMessage({ text: "Kaydedilirken bir hata oluştu.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <GlassCard className="p-6 max-w-2xl">
      <h3 className="text-lg font-bold text-white mb-4">{category?.id ? "Kategoriyi Düzenle" : "Yeni Kategori"}</h3>
      {message.text && (
        <div className={`mb-4 ${message.type === 'success' ? s.alertSuccess : s.alertError}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={s.labelBlock}>Kategori Adı *</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} maxLength={50} className={s.inputSm} />
            <div className="text-right mt-1"><span className="text-[10px] text-slate-500">{(formData.name || "").length} / 50</span></div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={onCancel} className={s.btnSecondary}>İptal</button>
          <button type="submit" className={s.btnAdd}>Kaydet</button>
        </div>
      </form>
    </GlassCard>
  );
}
