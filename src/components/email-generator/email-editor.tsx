import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GeneratedEmail } from "@/types/email";

interface EmailEditorProps {
  email: GeneratedEmail;
  onChange: (field: keyof GeneratedEmail, value: string) => void;
}

export function EmailEditor({ email, onChange }: EmailEditorProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email-subject" className="text-sm font-medium text-slate-700">
          Subject
        </label>
        <Input
          id="email-subject"
          value={email.subject}
          onChange={(event) => onChange("subject", event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email-greeting" className="text-sm font-medium text-slate-700">
          Greeting
        </label>
        <Input
          id="email-greeting"
          value={email.greeting}
          onChange={(event) => onChange("greeting", event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email-body" className="text-sm font-medium text-slate-700">
          Body
        </label>
        <Textarea
          id="email-body"
          value={email.body}
          onChange={(event) => onChange("body", event.target.value)}
          className="min-h-[220px]"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email-closing" className="text-sm font-medium text-slate-700">
          Closing
        </label>
        <Input
          id="email-closing"
          value={email.closing}
          onChange={(event) => onChange("closing", event.target.value)}
        />
      </div>
    </div>
  );
}
