import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 1. Panggil kurir OpenAI (Otomatis ngambil kunci dari .env.local)
const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    // 2. Tangkap pesan yang dikirim sama user dari dashboard lu
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    const assistantId = process.env.OPENAI_ASSISTANT_ID;

    if (!assistantId) {
      return NextResponse.json({ error: "ID Asisten belum dipasang di brankas" }, { status: 500 });
    }

    // 3. Bikin ruang obrolan (Thread) baru khusus buat sesi ini
    const thread = await openai.beta.threads.create();

    // 4. Masukin pesan dari user ke dalam ruang obrolan tersebut
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message,
    });

    // 5. Bangunin si Asisten dan suruh dia mikir balesannya
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistantId,
    });

    if (run.status === 'completed') {
      // 6. Kalau udah selesai mikir, ambil balasan dari Asisten
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      
      // Ambil pesan paling terakhir yang dikirim sama asisten
      const lastMessageForUser = messages.data
        .filter((msg) => msg.role === 'assistant')
        .shift();

      if (lastMessageForUser && lastMessageForUser.content[0].type === 'text') {
        // 7. Kirim balik balasannya ke layar aplikasi lu
        return NextResponse.json({ response: lastMessageForUser.content[0].text.value });
      }
    } else {
       console.log("Status error:", run.status);
       return NextResponse.json({ error: "Asisten lagi sibuk atau gagal merespons" }, { status: 500 });
    }

  } catch (error) {
    console.error("Waduh, ada error di API Chat:", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal server" }, { status: 500 });
  }
}