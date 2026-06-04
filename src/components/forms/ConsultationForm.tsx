"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen an"),
  phone: z.string().min(6, "Bitte geben Sie eine Telefonnummer an"),
  email: z.string().email("Ungültige E-Mail").optional().or(z.literal("")),
  message: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Bitte stimmen Sie der Datenschutzerklärung zu",
  }),
});

type FormData = z.infer<typeof schema>;

export const ConsultationForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/beratung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Senden fehlgeschlagen");
      }
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Ein Fehler ist aufgetreten");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/20 bg-accent p-8 text-center">
        <p className="font-display text-xl font-semibold text-foreground">
          Vielen Dank!
        </p>
        <p className="mt-2 text-muted-foreground">
          Wir melden uns persönlich bei Ihnen, um das passende Haus zu finden.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div>
        <Label htmlFor="name">Wie sollen wir Sie nennen?</Label>
        <Input
          id="name"
          {...register("name")}
          className="mt-2"
          autoComplete="name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Telefonnummer</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          className="mt-2"
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">E-Mail (optional)</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-2"
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Ihre Nachricht (optional)</Label>
        <Textarea id="message" rows={4} {...register("message")} className="mt-2" />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          {...register("consent")}
          className="mt-1 size-4 rounded border-border accent-primary"
        />
        <Label htmlFor="consent" className="text-sm font-normal text-muted-foreground">
          Mit dem Absenden erkläre ich mich damit einverstanden, dass VN
          Modulhaus meine Daten zur Kontaktaufnahme verarbeitet. Weitere
          Informationen in der{" "}
          <Link href="/datenschutz" className="text-primary underline">
            Datenschutzerklärung
          </Link>
          .
        </Label>
      </div>
      {errors.consent && (
        <p className="text-sm text-destructive">{errors.consent.message}</p>
      )}

      {status === "error" && (
        <p className="text-sm text-destructive">{errorMsg}</p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full py-6 text-base font-semibold"
      >
        {status === "loading" ? "Wird gesendet…" : "Anfrage stellen & Vorschlag erhalten"}
      </Button>
    </form>
  );
};
