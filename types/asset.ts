export interface Asset {
    id: string;
    name: string;
    type: string;
    ratio: string;
    tags: string;
    dateAdded: string;
    isFavorite?: boolean;
    previewUrl?: string; // Tambahan untuk menyimpan gambar asli
  }