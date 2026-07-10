import { useState, useEffect } from "react";
import { categoryClient, CategoryResponse } from "@/lib/api/client/category";

export function useCategoriesPage() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryResponse | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await categoryClient.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Veriler yüklenemedi", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (category?: CategoryResponse) => {
    setEditingCategory(category || null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setMessage({ text: editingCategory ? "Kategori güncellendi!" : "Kategori oluşturuldu!", type: "success" });
    loadData();
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      try {
        await categoryClient.deleteCategory(id);
        setMessage({ text: "Kategori başarıyla silindi.", type: "success" });
        loadData();
      } catch (error) {
        setMessage({ text: "Silme işlemi başarısız oldu.", type: "error" });
      }
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return {
    categories,
    loading,
    showForm,
    editingCategory,
    message,
    handleOpenForm,
    handleSave,
    handleDelete,
    handleCloseForm
  };
}
