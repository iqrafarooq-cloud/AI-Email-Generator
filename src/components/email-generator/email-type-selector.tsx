import { Label } from "@/components/ui/label";
import { emailTypeOptions } from "@/types/email";

interface EmailTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function EmailTypeSelector({ value, onChange, error }: EmailTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email-type">Email type</Label>
      <select
        id="email-type"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900"
        aria-invalid={Boolean(error)}
      >
        {emailTypeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
