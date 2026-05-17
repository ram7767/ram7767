import data from "./data.json";

export type Service = {
  title: string;
  description: string;
  metric: { value: string; label: string };
  icon: string;
};

export const services: Service[] = data.services as Service[];
