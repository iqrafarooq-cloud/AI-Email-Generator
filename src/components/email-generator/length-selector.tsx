import { Label } from "@/components/ui/label";
import { lengthOptions } from "@/types/email";

interface LengthSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LengthSelector({ value, onChange }: LengthSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Length</Label>
      <div className="flex flex-wrap gap-2">
        {lengthOptions.map((length) => {
          const isSelected = value === length.toLowerCase();
          return (
            <button
              key={length}
              type="button"
              onClick={() => onChange(length.toLowerCase())}
              className={[
                "rounded-xl border px-3 py-2 text-sm font-medium transition-all",
                isSelected
                  ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
              ].join(" ")}
              aria-pressed={isSelected}
            >
              {length}
            </button>
          );
        })}
      </div>
    </div>
  );
}
