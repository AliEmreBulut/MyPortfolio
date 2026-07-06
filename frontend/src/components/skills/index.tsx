"use client";
import { useState } from "react";
import { TechSidebar } from "./TechSidebar";
import { TechPreview } from "./TechPreview";
import { skillsData } from "./data";
import { styles } from "./styles";

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillsData[0].id);
  
  const activeCategory = skillsData.find(c => c.id === activeTab) || skillsData[0];

  return (
    <section className={styles.section} id="skills">
      <div className={styles.headerBox}>
        <p className={styles.subTitle}>Technologies</p>
        <h2 className={styles.title}>Kullandığım teknolojiler</h2>
        <p className={styles.description}>
          Farklı projelerde ve çalışma ortamlarında kullandığım diller, kütüphaneler ve veri tabanı sistemleri.
        </p>
      </div>
      
      <div className={styles.grid}>
        <TechSidebar 
          categories={skillsData} 
          activeId={activeTab} 
          onSelect={setActiveTab} 
        />
        <TechPreview category={activeCategory} />
      </div>
    </section>
  );
}
