// components/form/form-section.tsx
"use client";

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface FormSectionProps {
  value: string;
  title: string;
  number: number;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  value,
  title,
  number,
  children,
  className = "border rounded-lg overflow-hidden bg-white shadow-sm",
}: FormSectionProps) {
  return (
    <AccordionItem value={value} className={className}>
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary-50">
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-primary-100 text-primary-800">
            {number}
          </Badge>
          <h2 className="text-lg font-semibold text-typography-950">{title}</h2>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-4">
        <div className="space-y-6">{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
}
