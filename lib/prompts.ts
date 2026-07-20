import { Prompt } from "@/types/prompt";

// Data dummy awal jika belum ada data sama sekali
const initialPrompts: Prompt[] = [
  {
    id: "1",
    title: "Cinematic Prompt",
    category: "Video",
    prompt: "Create an ultra cinematic scene with dramatic lighting...",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "TikTok Hook Generator",
    category: "Marketing",
    prompt: "Generate 10 viral TikTok hooks that grab attention...",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export function getPrompts(): Prompt[] {
  // Cek apakah kode berjalan di browser
  if (typeof window === "undefined") return []; 
  
  const saved = localStorage.getItem("my-prompts-data");
  if (saved) {
    return JSON.parse(saved); // Kembalikan data yang tersimpan
  }
  
  return initialPrompts; // Kembalikan data dummy jika masih kosong
}

export function savePrompts(prompts: Prompt[]) {
  if (typeof window !== "undefined") {
    // Simpan ke memori browser
    localStorage.setItem("my-prompts-data", JSON.stringify(prompts));
  }
}