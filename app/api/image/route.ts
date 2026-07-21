import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt gambar nggak boleh kosong" }, { status: 400 });
    }

    // Mengembalikan mesin ke dall-e-3 karena dall-e-2 tidak aktif di project ini
    const response = await openai.images.generate({
      model: "dall-e-3", // Balik ke model elit
      prompt: prompt,
      n: 1,
      // DALL-E 3 biasanya butuh ukuran HD, pakai ini biar aman
      size: "1024x1024",
      quality: "standard", // standard aja biar irit quota
    });

    // Ini penangkal error TypeScript-nya bro!
    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
       return NextResponse.json({ error: "OpenAI gagal mengirim balik gambar" }, { status: 500 });
    }

    return NextResponse.json({ url: imageUrl });

  } catch (error) {
    console.error("Waduh, error bikin gambar:", error);
    return NextResponse.json({ error: "Gagal membuat gambar, coba lagi bro!" }, { status: 500 });
  }
}