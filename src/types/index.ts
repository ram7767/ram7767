export interface Theme {
  primaryBg: string;
  secondaryBg: string;
  cardBg: string;
  accentPurple: string;
  accentLightPurple: string;
  textPrimary: string;
  textSecondary: string;
  highlight: string;
}

export interface Stats {
  appLaunches: string;
  performanceImprovement: string;
  bugReduction: string;
  userSatisfaction: string;
}

export interface FeaturedApp {
  name: string;
  tagline: string;
  icon: string;
  rating: string;
  downloads: string;
  activeUsers: string;
  tags: string[];
  description: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
}

export interface About {
  intro: string;
  details: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Education {
  institution: string;
  years: string;
  degree: string;
}

export interface Experience {
  position: string;
  subtitle: string;
  years: string;
  company: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: string;
  tagline: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  review: string;
  appLink: string;
}

export interface Client {
  logo: string;
  company_name: string;
  reference: string;
}

export interface Achievement {
  title: string;
  date: string;
  icon: string;
  description: string;
}

export interface PortfolioData {
  theme: Theme;
  name: string;
  shortName: string;
  title: string;
  greeting: string;
  tagline: string;
  profilePic: string;
  email: string;
  location: string;
  stats: Stats;
  featuredApp: FeaturedApp;
  socialLinks: SocialLinks;
  about: About;
  services: Service[];
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  testimonials: Testimonial[];
  clients: Client[];
  achievements: Achievement[];
  resumeFile: string;
  favicon: string;
  githubUsername: string;
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
