import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ngambil kunci API dari file .env.local lu
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt tidak boleh kosong" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Model cepat & efisien untuk teks
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const resultText = completion.choices[0].message.content;

    return NextResponse.json({ result: resultText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Terjadi kesalahan pada server" }, { status: 500 });
  }
}