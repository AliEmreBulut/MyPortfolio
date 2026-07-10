"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "./types";
import { styles } from "./styles";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setImgError(false);
    setCurrentIndex(0);
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project || !mounted) return null;

  const modalContent = (
    <div aria-hidden="false" className={styles.modalContainer} role="dialog">
      <div className={styles.modalBackdrop} onClick={onClose}></div>
      <div aria-labelledby="projectModalTitle" aria-modal="true" className={styles.modalDialog}>
        <button aria-label="Modalı kapat" className={styles.modalClose} onClick={onClose} type="button">×</button>
        
        <div className={styles.modalImageWrapper}>
          {(() => {
            const allImages = [project.image, ...(project.galleryImages || [])].filter(Boolean);
            const currentImg = allImages[currentIndex] || "https://picsum.photos/600/400?random=1";
            
            return (
              <>
                {!imgError && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image 
                        className={styles.modalImage} 
                        alt={project.title} 
                        src={currentImg} 
                        fill
                        onError={() => setImgError(true)}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}
                {allImages.length > 1 && (
                  <>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1)); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-brand-green hover:text-black transition-all z-10 backdrop-blur-md border border-white/10 hover:scale-110"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1)); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-brand-green hover:text-black transition-all z-10 backdrop-blur-md border border-white/10 hover:scale-110"
                    >
                      <ChevronRight size={28} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {allImages.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-brand-green' : 'bg-white/50 hover:bg-white'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            );
          })()}
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
          <div className={styles.modalActions}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btnSource}>
                Kaynak Kod ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btnLive}>
                Canlı Önizleme ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
