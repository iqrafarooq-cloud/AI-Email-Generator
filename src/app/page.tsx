"use client";

import { useEffect, useState } from "react";
import { Mail, Plus, Settings2, Sparkles } from "lucide-react";

import { EmailActions } from "@/components/email-generator/email-actions";
import { EmailForm } from "@/components/email-generator/email-form";
import { GenerateButton } from "@/components/email-generator/generate-button";
import { EmailResult } from "@/components/email-generator/email-result";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { emailFormSchema } from "@/lib/validations";
import type { EmailFormData, GeneratedEmail } from "@/types/email";

type ToastState = {
  message: string;
  tone: "success" | "error";
};

const initialForm: EmailFormData = {
  emailType: "Professional",
  recipient: "",
  context: "",
  tone: "Professional",
  length: "medium",
  language: "english",
};

function composeEmail(email: GeneratedEmail) {
  return `${email.subject}\n\n${email.greeting}\n\n${email.body}\n\n${email.closing}`;
}

export default function Home() {
  const [form, setForm] = useState<EmailFormData>(initialForm);
  const [result, setResult] = useState<GeneratedEmail | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof EmailFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [copyMessage, setCopyMessage] = useState("Copy Email");
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleFieldChange = (field: keyof EmailFormData, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleLanguageChange = (value: string) => {
    setForm((current) => ({ ...current, language: value as EmailFormData["language"] }));
    setErrors((current) => ({ ...current, language: undefined }));
  };

  const validateForm = () => {
    const parsed = emailFormSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors = parsed.error.flatten().fieldErrors as Partial<Record<keyof EmailFormData, string[]>>;
      const mapped = Object.fromEntries(
        Object.entries(nextErrors).map(([key, value]) => [key, value?.[0]]),
      ) as Partial<Record<keyof EmailFormData, string>>;
      setErrors(mapped);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleGenerate = async (action: "generate" | "improve" | "shorten" | "professional" | "friendly" = "generate") => {
    if (action === "generate" && !validateForm()) {
      setToast({ tone: "error", message: "Please fill in the required email details." });
      return;
    }

    if (!result && action !== "generate") {
      setToast({ tone: "error", message: "Generate an email first to use this option." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          action,
          currentEmail: result ?? undefined,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Something went wrong while generating your email.");
      }

      setResult(payload);
      setToast({
        tone: "success",
        message: action === "generate" ? "Email generated." : "Your email has been refined.",
      });
      setCopyMessage("Copy Email");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong while generating your email.";
      setToast({ tone: "error", message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (kind: "email" | "body") => {
    if (!result) {
      setToast({ tone: "error", message: "Generate an email before copying it." });
      return;
    }

    const content = kind === "email" ? composeEmail(result) : result.body;

    try {
      await navigator.clipboard.writeText(content);
      setCopyMessage(kind === "email" ? "Copied!" : "Copied!");
      setToast({
        tone: "success",
        message: kind === "email" ? "Email copied to clipboard." : "Email body copied to clipboard.",
      });
    } catch {
      setToast({ tone: "error", message: "Unable to copy right now. Please try again." });
    }
  };

  const handleStartOver = () => {
    setForm(initialForm);
    setResult(null);
    setErrors({});
    setCopyMessage("Copy Email");
    setToast({ tone: "success", message: "Started a new email." });
  };

  const toastClasses =
    toast?.tone === "error"
      ? "border-red-200 bg-red-50 text-red-700 shadow-[0_12px_30px_rgba(220,38,38,0.08)]"
      : "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_12px_30px_rgba(16,185,129,0.08)]";

  const handleResultChange = (field: keyof GeneratedEmail, value: string) => {
    setResult((current) => (current ? { ...current, [field]: value } : current));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-[28px] border border-slate-200/80 bg-white/80 px-4 py-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/15">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl font-semibold tracking-tight text-slate-900">MailCraft AI</div>
                <div className="text-sm text-slate-500">Write better emails in seconds.</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={handleStartOver}
                className="h-10 rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                New Email
              </Button>
              <button
                type="button"
                aria-label="Settings unavailable in this version"
                disabled
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {toast ? (
          <div className={`mb-4 rounded-2xl border px-3 py-2.5 text-sm font-medium ${toastClasses}`}>
            {toast.message}
          </div>
        ) : null}

        <section className="mb-8">
          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-indigo-600">
            <Sparkles className="h-4 w-4" />
            AI-powered email writer
          </div>
          <h1 className="mt-4 max-w-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-600 bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
            Your AI-powered email writer
          </h1>
          <p className="mt-3 max-w-xl text-lg text-slate-600">
            Turn simple thoughts into clear, professional emails in seconds.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <CardHeader className="border-b border-slate-200 bg-slate-50/80 pb-4 pt-5">
              <CardTitle className="text-2xl font-semibold">Create an email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-5 sm:p-6">
              <EmailForm
                form={form}
                errors={errors}
                onFieldChange={handleFieldChange}
                onLanguageChange={handleLanguageChange}
              />

              <GenerateButton isLoading={isLoading} onClick={() => handleGenerate("generate")} />
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <CardHeader className="border-b border-slate-200 bg-slate-50/80 pb-4 pt-5">
              <CardTitle className="text-2xl font-semibold">Your email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-5 sm:p-6">
              <EmailResult email={result} onChange={handleResultChange} />

              {result ? (
                <>
                  <EmailActions
                    onCopyEmail={() => handleCopy("email")}
                    onCopyBody={() => handleCopy("body")}
                    onRegenerate={() => handleGenerate("generate")}
                    onImprove={() => handleGenerate("improve")}
                    onShorten={() => handleGenerate("shorten")}
                    onProfessional={() => handleGenerate("professional")}
                    onFriendly={() => handleGenerate("friendly")}
                    onStartOver={handleStartOver}
                    copyMessage={copyMessage}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate an email to start editing.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </main>
  );
}
