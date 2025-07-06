interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-zinc-200/80 bg-outline-200 rounded-full h-2 mb-4">
      <div
        className="bg-primary h-2 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
