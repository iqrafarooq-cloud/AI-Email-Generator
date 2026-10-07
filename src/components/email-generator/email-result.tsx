import { Sparkles } from "lucide-react";

import { EmailEditor } from "@/components/email-generator/email-editor";
import type { GeneratedEmail } from "@/types/email";

interface EmailResultProps {
  email: GeneratedEmail | null;
  onChange: (field: keyof GeneratedEmail, value: string) => void;
}

export function EmailResult({ email, onChange }: EmailResultProps) {
  if (!email) {
    return (
      <div className="flex min-h-[520px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-8 text-center">
        <div className="space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">Your generated email will appear here.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <EmailEditor email={email} onChange={onChange} />
    </div>
  );
}
