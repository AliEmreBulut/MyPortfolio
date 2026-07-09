import { serverFetch } from './fetcher';
import { UserProfileResponse } from '@/types/user';

export async function getProfile(): Promise<UserProfileResponse | null> {
  // /api/user/profile
  return serverFetch<UserProfileResponse>('/user/profile');
}
