"use client";
import { useState, useMemo } from "react";
import { TechSidebar } from "./TechSidebar";
import { TechPreview } from "./TechPreview";
import { skillsData as staticSkills } from "./data";
import { styles } from "./styles";
import { SkillResponse } from "@/types/skill";
import { TechCategory } from "./types";

interface SkillsProps {
  skills?: SkillResponse[];
}

export default function Skills({ skills }: SkillsProps) {

  const mappedCategories = useMemo<TechCategory[]>(() => {
    if (!skills || skills.length === 0) return staticSkills;

    // Gelen backend verilerini mevcut UI yapısına yedirmek için statik verilerin derin kopyasını alıyoruz
    const categories: TechCategory[] = JSON.parse(JSON.stringify(staticSkills));
    
    // UI'daki mevcut yetenek etiketlerini (chips) temizliyoruz
    categories.forEach(c => c.chips = []);

    skills.forEach(skill => {
      let targetIndex = -1;
      
      // Backend'deki Enum karşılıkları: 0=Frontend, 1=Backend, 2=DevOps, 3=Database, 4=Mobile, 5=Architecture, 6=Other
      // Önyüzdeki (UI) kategori sırası: 0=Frontend, 1=Backend, 2=Database, 3=Tools
      switch (skill.category) {
        case 0: targetIndex = 0; break; // Frontend
        case 1: 
        case 5: targetIndex = 1; break; // Backend ve Mimari -> Backend
        case 3: targetIndex = 2; break; // Database
        case 2: 
        case 4: 
        case 6: targetIndex = 3; break; // DevOps, Mobil, ve Diğerleri -> Tools (Araçlar)
        default: targetIndex = 3; break;
      }
      
      if (targetIndex !== -1 && categories[targetIndex]) {
        categories[targetIndex].chips.push(skill.name);
      }
    });

    // Boş kategorileri sil
    return categories.filter(c => c.chips.length > 0);
  }, [skills]);

  const [activeTab, setActiveTab] = useState(mappedCategories[0]?.id || staticSkills[0].id);
  const activeCategory = mappedCategories.find(c => c.id === activeTab) || mappedCategories[0];

  return (
    <section className={styles.section} id="skills">
      <div className={styles.headerBox}>
        <p className={styles.subTitle}>Technologies</p>
        <div className="flex items-center gap-4">
          <h2 className={styles.title}>Kullandığım teknolojiler</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-green/50 to-transparent"></div>
        </div>
        <p className={styles.description}>
          Farklı projelerde ve çalışma ortamlarında kullandığım diller, kütüphaneler ve veri tabanı sistemleri.
        </p>
      </div>

      <div className={styles.grid}>
        <TechSidebar
          categories={mappedCategories}
          activeId={activeTab}
          onSelect={setActiveTab}
        />
        {activeCategory && <TechPreview category={activeCategory} />}
      </div>
    </section>
  );
}
