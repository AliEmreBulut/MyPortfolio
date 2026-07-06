"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Project } from "./types";
import { styles } from "./styles";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [project]);

  if (!project) return null;

  return (
    <div aria-hidden="false" className={styles.modalContainer} role="dialog">
      <div className={styles.modalBackdrop} onClick={onClose}></div>
      <div aria-labelledby="projectModalTitle" aria-modal="true" className={styles.modalDialog}>
        <button aria-label="Modalı kapat" className={styles.modalClose} onClick={onClose} type="button">×</button>
        
        <div className={styles.modalImageWrapper}>
          <span className={styles.modalFallback}>Project Preview</span>
          {!imgError && (
            <Image 
              className={styles.modalImage} 
              alt={project.title} 
              src={project.image} 
              fill
              onError={() => setImgError(true)}
            />
          )}
        </div>
        
        <div className={styles.modalContent}>
          <span className={styles.badge}>{project.category}</span>
          <h3 className="m-0 mb-4 text-white text-[clamp(30px,4vw,44px)] leading-none tracking-tight font-black" id="projectModalTitle">{project.title}</h3>
          <p className="m-0 text-slate-300/80 text-base leading-relaxed">{project.fullDesc}</p>
          <div className={styles.modalStack}>
            {project.stack.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
