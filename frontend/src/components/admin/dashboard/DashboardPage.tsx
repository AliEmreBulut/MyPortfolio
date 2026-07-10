"use client";
import { useState, useEffect } from "react";
import { projectClient } from "@/lib/api/client/project";
import { skillClient } from "@/lib/api/client/skill";
import { GlassCard } from "@/components/ui/glass-card";

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, skills: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projects, skills] = await Promise.all([
          projectClient.getProjects(),
          skillClient.getSkills()
        ]);
        setStats({ projects: projects.length, skills: skills.length });
      } catch (error) {
        console.error("Dashboard istatistikleri yüklenemedi", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white mb-6">Sisteme Hoş Geldiniz</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Profil Durumu</h3>
          <p className="text-2xl font-black text-white">Aktif</p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Toplam Proje</h3>
          <p className="text-2xl font-black text-white">
            {loading ? "..." : stats.projects}
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Yetenekler</h3>
          <p className="text-2xl font-black text-white">
            {loading ? "..." : stats.skills}
          </p>
        </GlassCard>
      </div>

      <div className="mt-8 p-6 bg-brand-green/10 border border-brand-green/20 rounded-xl">
        <h3 className="text-brand-green font-bold mb-2">Bilgilendirme</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Sol taraftaki menüyü kullanarak Profil bilgilerinizi güncelleyebilir, yeni projeler ve yetenekler ekleyebilirsiniz. Yapılan tüm değişiklikler anında ziyaretçilerin gördüğü ana sayfaya yansıyacaktır.
        </p>
      </div>
    </div>
  );
}
