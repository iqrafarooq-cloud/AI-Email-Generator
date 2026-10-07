import { Label } from "@/components/ui/label";
import { toneOptions } from "@/types/email";

interface ToneSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Tone</Label>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {toneOptions.map((tone) => {
          const isSelected = value === tone;
          return (
            <button
              key={tone}
              type="button"
              onClick={() => onChange(tone)}
              className={[
                "rounded-xl border px-3 py-2 text-sm font-medium transition-all",
                isSelected
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
              ].join(" ")}
              aria-pressed={isSelected}
            >
              {tone}
            </button>
          );
        })}
      </div>
    </div>
  );
}
