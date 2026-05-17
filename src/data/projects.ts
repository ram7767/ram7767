import data from "./data.json";

export type ProjectLink = {
  label: string;
  url: string;
  kind: "ios" | "android" | "web";
};

export type Platform = "iOS" | "Android" | "iOS · Android";

export type Project = {
  name: string;
  slug: string;
  client: string;
  platform: Platform;
  description: string;
  tags: string[];
  links: ProjectLink[];
};

export const projects: Project[] = data.projects as Project[];
