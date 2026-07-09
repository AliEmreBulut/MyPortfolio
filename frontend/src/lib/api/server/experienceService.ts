import { serverFetch } from './fetcher';
import { ExperienceResponse } from '../client/experience';

export async function getExperiences(): Promise<ExperienceResponse[]> {
  const data = await serverFetch<ExperienceResponse[]>('/experiences');
  return data || [];
}
