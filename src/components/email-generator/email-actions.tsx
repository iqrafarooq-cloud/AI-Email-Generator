import { Copy, PenTool, Sparkles, Wand2, ArrowUpRight, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmailActionsProps {
  onCopyEmail: () => void;
  onCopyBody: () => void;
  onRegenerate: () => void;
  onImprove: () => void;
  onShorten: () => void;
  onProfessional: () => void;
  onFriendly: () => void;
  onStartOver: () => void;
  copyMessage: string;
}

export function EmailActions({
  onCopyEmail,
  onCopyBody,
  onRegenerate,
  onImprove,
  onShorten,
  onProfessional,
  onFriendly,
  onStartOver,
  copyMessage,
}: EmailActionsProps) {
  const actionButtonClass =
    "h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-50";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={onCopyEmail} className={actionButtonClass}>
          <Copy className="h-4 w-4" />
          {copyMessage || "Copy Email"}
        </Button>
        <Button type="button" variant="outline" onClick={onCopyBody} className={actionButtonClass}>
          <Copy className="h-4 w-4" />
          Copy Body
        </Button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="button" variant="outline" onClick={onRegenerate} className={actionButtonClass}>
          <RefreshCw className="h-4 w-4" />
          Regenerate
        </Button>
        <Button type="button" variant="outline" onClick={onImprove} className={actionButtonClass}>
          <Sparkles className="h-4 w-4" />
          Improve
        </Button>
        <Button type="button" variant="outline" onClick={onShorten} className={actionButtonClass}>
          <Wand2 className="h-4 w-4" />
          Shorten
        </Button>
        <Button type="button" variant="outline" onClick={onProfessional} className={actionButtonClass}>
          <PenTool className="h-4 w-4" />
          Make More Professional
        </Button>
        <Button type="button" variant="outline" onClick={onFriendly} className={actionButtonClass}>
          <ArrowUpRight className="h-4 w-4" />
          Make Friendlier
        </Button>
        <Button type="button" variant="secondary" onClick={onStartOver} className={actionButtonClass}>
          Start Over
        </Button>
      </div>
    </div>
  );
}
