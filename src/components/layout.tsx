import { cn } from "@/lib/utils";
export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("container mx-auto px-6 py-20 max-w-4xl", className)}>
      {children}
    </main>
  );
}
