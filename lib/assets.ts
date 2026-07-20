import { Asset } from "@/types/asset";

const initialAssets: Asset[] = [
  {
    id: "1",
    name: "Powerbank Promo",
    type: "MP4",
    ratio: "4:5",
    tags: "TikTok Affiliate",
    dateAdded: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Digital Product Teaser",
    type: "MP4",
    ratio: "4:5",
    tags: "Promo",
    dateAdded: new Date().toISOString(),
  }
];

export function getAssets(): Asset[] {
  if (typeof window === "undefined") return [];
  
  const saved = localStorage.getItem("my-assets-data");
  if (saved) {
    return JSON.parse(saved);
  }
  
  return initialAssets;
}

export function saveAssets(assets: Asset[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("my-assets-data", JSON.stringify(assets));
  }
}