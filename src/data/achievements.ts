import data from "./data.json";

export type AchievementKind = "achievement" | "certificate" | "award";

export type Achievement = {
  title: string;
  description: string;
  year: string;
  tags: string[];
  kind: AchievementKind;
};

export const achievements: Achievement[] = data.achievements as Achievement[];
