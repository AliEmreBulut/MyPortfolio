import { serverFetch } from './fetcher';
import { SkillResponse } from '@/types/skill';

export async function getSkills(): Promise<SkillResponse[]> {
  // /api/skills
  const data = await serverFetch<SkillResponse[]>('/skills');
  return data || [];
}
