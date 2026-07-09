import { serverFetch } from './fetcher';
import { ProjectResponse } from '@/types/project';

export async function getProjects(): Promise<ProjectResponse[]> {
  // /api/projects
  const data = await serverFetch<ProjectResponse[]>('/projects');
  return data || [];
}
