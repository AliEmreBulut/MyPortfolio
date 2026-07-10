"use client";
import { GlassCard } from "@/components/ui/glass-card";
import { adminStyles as s } from "@/styles/adminStyles";
import { CategoryForm } from "./CategoryForm";
import { useCategoriesPage } from "./useCategoriesPage";

export default function CategoriesPage() {
  const {
    categories,
    loading,
    showForm,
    editingCategory,
    message,
    handleOpenForm,
    handleSave,
    handleDelete,
    handleCloseForm
  } = useCategoriesPage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Kategori Yönetimi</h2>
        {!showForm && (
          <button onClick={() => handleOpenForm()} className={s.btnAdd}>
            + Yeni Kategori Ekle
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-white">Yükleniyor...</div>
      ) : showForm ? (
        <CategoryForm 
          category={editingCategory} 
          onSave={handleSave} 
          onCancel={handleCloseForm} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {message.text && (
            <div className={`col-span-full mb-4 ${message.type === 'success' ? s.alertSuccess : s.alertError}`}>
              {message.text}
            </div>
          )}
          {categories.map(category => (
            <GlassCard key={category.id} className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{category.name}</h3>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                <button onClick={() => handleOpenForm(category)} className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded transition text-sm">
                  Düzenle
                </button>
                <button onClick={() => handleDelete(category.id)} className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition text-sm">
                  Sil
                </button>
              </div>
            </GlassCard>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full p-8 text-center text-slate-400 bg-white/5 rounded-xl border border-white/10">
              Henüz kategori eklenmemiş.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
