export interface UserProfileResponse {
  id: string;
  fullName: string;
  title: string;
  shortSummary: string | null;
  heroCodeSnippet: string | null;
  aboutText: string | null;
  profileImageUrl: string | null;
  resumeUrl: string | null;
  email: string | null;
  phone: string | null;
  gitHubUrl: string | null;
  linkedInUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
}
