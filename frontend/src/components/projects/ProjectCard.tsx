import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Project } from "./types";
import { styles } from "./styles";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (p: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <article className={`${styles.flipCard} ${isFlipped ? "is-flipped" : ""}`}>
      <div className={styles.flipInner}>
        <GlassCard className={styles.faceFront}>
          <span className={styles.badge}>{project.category}</span>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.shortDesc}</p>
          <div className={styles.btnContainer}>
            <button className={styles.btnOutline} onClick={() => setIsFlipped(true)} type="button">Teknolojiler</button>
            <button className={styles.btnPrimary} onClick={() => onOpenModal(project)} type="button">Detay</button>
          </div>
        </GlassCard>
        <GlassCard className={styles.faceBack}>
          <span className={styles.badge}>Tech Stack</span>
          <h3 className={styles.backTitle}>{project.title}</h3>
          <div className={styles.backList}>
            {project.techDetails.map((tech, i) => (
              <div key={i} className={styles.backItem}>
                <strong className={styles.backItemTitle}>{tech.title}</strong>
                <p className={styles.backItemDesc}>{tech.desc}</p>
              </div>
            ))}
          </div>
          <button aria-label="Kartın ön yüzüne dön" className={styles.btnBack} onClick={() => setIsFlipped(false)} type="button">← Geri dön</button>
        </GlassCard>
      </div>
    </article>
  );
}
