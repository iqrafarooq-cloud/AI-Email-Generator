import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function GenerateButton({ isLoading, onClick }: GenerateButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="h-12 w-full rounded-xl bg-slate-900 px-5 text-base font-medium text-white hover:bg-slate-700"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Writing your email...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          <span>Generate Email</span>
        </>
      )}
    </Button>
  );
}
