// components/form/checkbox-group.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxGroupProps {
  options: readonly string[];
  selected: string[];
  onChange: (value: string, checked: boolean) => void;
  label?: string;
  error?: string;
  className?: string;
}

export function CheckboxGroup({
  options,
  selected,
  onChange,
  label,
  error,
  className = "grid grid-cols-1 sm:grid-cols-2 gap-3",
}: CheckboxGroupProps) {
  return (
    <div>
      {label && (
        <Label className="text-typography-950 block mb-3 font-medium">
          {label}
          {error && (
            <span className="ml-2 text-error-500 text-sm font-normal">
              {error}
            </span>
          )}
        </Label>
      )}
      <div className={className}>
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`option-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={(checked) => onChange(option, !!checked)}
              className="border-outline-500 text-primary-500 data-[state=checked]:text-primary-500 data-[state=checked]:bg-primary-500"
            />
            <Label
              htmlFor={`option-${option}`}
              className="text-typography-950 cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
