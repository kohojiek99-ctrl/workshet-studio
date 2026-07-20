import { Project } from "@/types/project";

// Data bawaan agar halaman tidak kosong saat pertama kali dibuka
const initialProjects: Project[] = [
  {
    id: "1",
    name: "Powerbank Promo Video",
    type: "Video Asset",
    status: "In Progress",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "2",
    name: "TikTok Affiliate Marketing",
    type: "Marketing",
    status: "Completed",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Profile Bio Optimization",
    type: "Copywriting",
    status: "Planning",
    lastUpdated: new Date().toISOString(),
  }
];

export function getProjects(): Project[] {
  if (typeof window === "undefined") return [];
  
  const saved = localStorage.getItem("my-projects-data");
  if (saved) {
    return JSON.parse(saved);
  }
  
  return initialProjects;
}

export function saveProjects(projects: Project[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("my-projects-data", JSON.stringify(projects));
  }
}