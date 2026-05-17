import data from "./data.json";

export type Skill = {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
};

export type SkillGroup = {
  title: string;
  items: Skill[];
};

export const skillGroups: SkillGroup[] = data.skills.groups as SkillGroup[];
