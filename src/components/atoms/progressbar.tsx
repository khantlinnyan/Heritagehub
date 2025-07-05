interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-outline-200 bg-primary rounded-full h-2 mb-4">
      <div
        className="bg-amber-500 h-2 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
