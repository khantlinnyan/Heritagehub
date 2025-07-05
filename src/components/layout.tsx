import { cn } from "@/lib/utils";
export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn("px-4 py-6", className)}>{children}</main>;
}
