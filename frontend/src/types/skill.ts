export interface SkillResponse {
  id: string;
  name: string;
  iconName: string | null;
  iconUrl: string | null;
  category: number; // Enum: 0=Frontend, 1=Backend, vs.
}
