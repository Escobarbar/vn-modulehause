import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contact } from "@/content/site";

const bodySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v === true),
});

export async function POST(request: Request) {
  try {
    const json: unknown = await request.json();
    const data = bodySchema.parse(json);

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM ?? "VN Modulhaus <onboarding@resend.dev>";

    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.info("[beratung] Dev mode – no RESEND_API_KEY:", data);
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json(
        { error: "E-Mail-Versand ist nicht konfiguriert." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const emailBlock = data.email ? `<p><strong>E-Mail:</strong> ${data.email}</p>` : "";
    const messageBlock = data.message
      ? `<p><strong>Nachricht:</strong><br/>${data.message}</p>`
      : "";

    await resend.emails.send({
      from,
      to: [contact.email],
      replyTo: data.email || undefined,
      subject: `Beratungsanfrage von ${data.name}`,
      html: `
        <h2>Neue Beratungsanfrage</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
        ${emailBlock}
        ${messageBlock}
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: "Ungültige Eingaben" }, { status: 400 });
    }
    console.error("[beratung]", e);
    return NextResponse.json(
      { error: "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}
