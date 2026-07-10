export interface TechDetail {
  title: string;
  desc: string;
}

export interface Project {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  techDetails: TechDetail[];
  stack: string[];
  image: string;
  galleryImages?: string[];
  githubUrl?: string;
  liveUrl?: string;
}
