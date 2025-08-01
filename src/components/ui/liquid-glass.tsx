import React, { CSSProperties, ReactNode } from "react";

interface LiquidGlassProps {
  children: ReactNode;
  blurAmount?: number; // in pixels
  saturation?: number; // multiplier (1 = normal)
  borderRadius?: string; // Tailwind class (e.g., 'rounded-lg')
  padding?: string; // Tailwind class (e.g., 'p-4')
  className?: string;
  style?: CSSProperties;
  tintColor?: string; // Tailwind bg color class (e.g., 'bg-white/10')
  border?: string; // Tailwind border class (e.g., 'border border-white/20')
}

export const LiquidGlass = ({
  children,
  blurAmount = 8,
  saturation = 1.2,
  borderRadius = "rounded-xl",
  padding = "p-4",
  className = "",
  style = {},
  tintColor = "bg-white/10",
  border = "border border-white/20",
}: LiquidGlassProps) => {
  // Generate dynamic styles for backdrop-filter
  const dynamicStyles = {
    "--blur-amount": `${blurAmount}px`,
    "--saturation": saturation,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={`relative overflow-hidden ${borderRadius} ${padding} ${border} ${className}`}
      style={dynamicStyles}
    >
      {/* Frosted glass effect container */}
      <div
        className={`absolute inset-0 ${tintColor} backdrop-blur-[var(--blur-amount)] backdrop-saturate-[var(--saturation)]`}
        aria-hidden="true"
      />

      {/* Content container with relative positioning */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// TypeScript helper for CSSProperties with custom variables
declare module "react" {
  interface CSSProperties {
    "--blur-amount"?: string;
    "--saturation"?: number;
  }
}
