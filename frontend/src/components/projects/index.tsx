"use client";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { projectsData } from "./data";
import { Project } from "./types";
import { styles } from "./styles";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className={styles.section} id="projects">
      <div className={styles.headerBox}>
        <p className={styles.subTitle}>Projects</p>
        <h2 className={styles.title}>Projelerim</h2>
        <p className={styles.description}>
          Geliştirilen projeler; amaç, kullanılan teknolojiler ve sistem mantığıyla birlikte daha interaktif bir şekilde sunulur.
        </p>
      </div>
      
      <div className={styles.grid}>
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onOpenModal={setSelectedProject} />
        ))}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
