// components/form/radio-card-group.tsx
"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioCardGroupProps {
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function RadioCardGroup({
  options,
  value,
  onChange,
  label,
  className = "grid grid-cols-1 sm:grid-cols-3 gap-3",
}: RadioCardGroupProps) {
  return (
    <div>
      {label && (
        <Label className="text-typography-950 block mb-3 font-medium">
          {label}
        </Label>
      )}
      <RadioGroup value={value} onValueChange={onChange} className={className}>
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary-50"
          >
            <RadioGroupItem
              value={option.value}
              id={`option-${option.value}`}
              className="text-primary-500 border-outline-500"
            />
            <Label
              htmlFor={`option-${option.value}`}
              className="text-typography-950 cursor-pointer"
            >
              <div className="font-medium">{option.label}</div>
              {option.description && (
                <p className="text-sm text-typography-600">
                  {option.description}
                </p>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
