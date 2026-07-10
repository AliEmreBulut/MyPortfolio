"use client";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { projectsData } from "./data";
import { Project } from "./types";
import { styles } from "./styles";
import { ProjectResponse } from "@/types/project";

interface ProjectsProps {
  projects?: ProjectResponse[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Backend bağlantısı yoksa veya veritabanı boşsa, site çökmesin diye statik verileri yedeğe alıyoruz
  const mappedProjects: Project[] = projects && projects.length > 0 
    ? projects.map(p => ({
        id: p.id,
        category: p.categories?.[0]?.name || "Web Application",
        title: p.title,
        shortDesc: p.shortSummary || "",
        fullDesc: p.detailedDescription || "",
        techDetails: [],
        stack: p.skills?.map(s => s.name) || [],
        image: p.coverImageUrl || "https://picsum.photos/600/400?random=1",
        galleryImages: p.galleryImages || [],
        githubUrl: p.githubUrl || undefined,
        liveUrl: p.liveUrl || undefined
      }))
    : projectsData;

  return (
    <section className={styles.section} id="projects">
      <div className={styles.headerBox}>
        <p className={styles.subTitle}>Projects</p>
        <div className="flex items-center gap-4">
          <h2 className={styles.title}>Projelerim</h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-green/50 to-transparent"></div>
        </div>
        <p className={styles.description}>
          Geliştirilen projeler; amaç, kullanılan teknolojiler ve sistem mantığıyla birlikte daha interaktif bir şekilde sunulur.
        </p>
      </div>
      
      <div className={styles.grid}>
        {mappedProjects.map(project => (
          <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
        ))}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
