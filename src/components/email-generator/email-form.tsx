import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmailTypeSelector } from "@/components/email-generator/email-type-selector";
import { ToneSelector } from "@/components/email-generator/tone-selector";
import { LengthSelector } from "@/components/email-generator/length-selector";
import { type EmailFormData } from "@/types/email";

interface EmailFormProps {
  form: EmailFormData;
  errors: Partial<Record<keyof EmailFormData, string>>;
  onFieldChange: (field: keyof EmailFormData, value: string) => void;
  onLanguageChange: (value: string) => void;
}

const languageOptions = [
  { label: "English", value: "english" },
  { label: "Urdu", value: "urdu" },
  { label: "Roman Urdu", value: "roman-urdu" },
];

export function EmailForm({ form, errors, onFieldChange, onLanguageChange }: EmailFormProps) {
  return (
    <div className="space-y-6">
      <EmailTypeSelector
        value={form.emailType}
        onChange={(value) => onFieldChange("emailType", value)}
        error={errors.emailType}
      />

      <div className="space-y-2">
        <Label htmlFor="recipient">Who are you emailing?</Label>
        <Input
          id="recipient"
          value={form.recipient}
          onChange={(event) => onFieldChange("recipient", event.target.value)}
          placeholder="e.g. Hiring manager, client, manager, colleague"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="context">What do you want to say?</Label>
        <Textarea
          id="context"
          value={form.context}
          onChange={(event) => onFieldChange("context", event.target.value)}
          placeholder="Explain what you want to communicate. Don't worry about grammar or formatting — just describe it naturally."
          aria-invalid={Boolean(errors.context)}
        />
        {errors.context ? <p className="text-sm text-red-600">{errors.context}</p> : null}
      </div>

      <ToneSelector
        value={form.tone}
        onChange={(value) => onFieldChange("tone", value)}
      />

      <LengthSelector
        value={form.length}
        onChange={(value) => onFieldChange("length", value)}
      />

      <div className="space-y-3">
        <Label>Language</Label>
        <div className="grid grid-cols-3 gap-2">
          {languageOptions.map((language) => {
            const isSelected = form.language === language.value;
            return (
              <button
                key={language.value}
                type="button"
                onClick={() => onLanguageChange(language.value)}
                className={[
                  "rounded-xl border px-3 py-2 text-sm font-medium transition-all",
                  isSelected
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                ].join(" ")}
                aria-pressed={isSelected}
              >
                {language.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
