import { Prompt } from "@/types/prompt";

const now = new Date().toISOString();

export const defaultPrompts: Prompt[] = [
  {
    id: "1",
    title: "Cinematic Prompt",
    category: "Video",
    prompt:
      "Create an ultra cinematic scene with dramatic lighting, volumetric fog, realistic camera movement, 8K quality.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "2",
    title: "TikTok Hook Generator",
    category: "Marketing",
    prompt:
      "Generate 10 viral TikTok hooks that instantly grab attention in under 3 seconds.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "3",
    title: "Logo Generator",
    category: "Design",
    prompt:
      "Design a modern minimalist logo using geometric shapes with premium branding style.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "4",
    title: "Landing Page Copy",
    category: "Copywriting",
    prompt:
      "Write a persuasive landing page focused on conversions using the AIDA framework.",
    createdAt: now,
    updatedAt: now,
  },
];