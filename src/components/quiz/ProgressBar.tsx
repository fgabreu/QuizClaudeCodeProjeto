import { memo } from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar = memo(function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="flex items-center gap-3" role="status" aria-label={`Pergunta ${current} de ${total}`}>
      <Progress value={percentage} className="flex-1" />
      <span className="min-w-[3rem] text-right text-sm font-medium tabular-nums text-[var(--fg-muted)]">
        {current}/{total}
      </span>
    </div>
  );
});
