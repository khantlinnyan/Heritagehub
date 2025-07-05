// components/form/select-field.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface SelectFieldProps {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  tooltip?: string;
}

export function SelectField({
  options,
  value,
  onChange,
  label,
  placeholder = "Select",
  error,
  className = "",
  tooltip,
}: SelectFieldProps) {
  return (
    <div className={className}>
      {label && (
        <Label className="text-typography-950 block mb-3 font-medium">
          {label}
          {tooltip && (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="ml-2 text-info-500 inline-flex items-center"
                  >
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px] bg-info-100 text-info-900 border-info-300">
                  <p>{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {error && (
            <span className="ml-2 text-error-500 text-sm font-normal">
              {error}
            </span>
          )}
        </Label>
      )}
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
