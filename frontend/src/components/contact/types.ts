import { ReactNode } from "react";

export interface SocialLink {
  id: string;
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
}
