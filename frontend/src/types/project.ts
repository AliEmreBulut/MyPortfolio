import { CategoryResponse } from './category';
import { SkillResponse } from './skill';

export interface ProjectResponse {
  id: string;
  title: string;
  shortSummary: string | null;
  detailedDescription: string | null;
  coverImageUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  displayOrder: number;
  status: number;
  categories: CategoryResponse[];
  skills: SkillResponse[];
  galleryImages: string[];
  createdAt: string;
  updatedAt: string | null;
}
