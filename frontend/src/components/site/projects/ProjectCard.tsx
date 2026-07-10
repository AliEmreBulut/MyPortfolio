import Image from "next/image";
import { Project } from "./types";
import { styles } from "./styles";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (p: Project) => void;
}

export function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={styles.cardImage}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.badge}>{project.category}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.shortDesc}</p>
        
        <div className={styles.techList}>
          {project.stack.map((tech, i) => (
            <span key={i} className={styles.techItem}>{tech}</span>
          ))}
        </div>
        
        <button className={styles.btnPrimary} onClick={() => onOpenModal(project)} type="button">
          Detayları Gör
        </button>
      </div>
    </article>
  );
}
