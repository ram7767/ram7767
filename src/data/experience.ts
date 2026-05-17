import data from "./data.json";

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: ExperienceEntry[] = data.experience as ExperienceEntry[];
