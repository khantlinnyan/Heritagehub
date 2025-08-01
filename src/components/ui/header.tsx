import { UserButton } from "@clerk/nextjs";
import GlassSurface from "./GlassSurface/GlassSurface";
import { cn } from "@/lib/utils";
export default function Header({
  className,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
}: {
  className?: string;
  title?: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <GlassSurface width={"100%"}>
      <header
        className={cn("flex items-center w-full justify-between", className)}
      >
        <nav className="">
          <h1
            className={cn(
              "text-2xl md:text-3xl font-bold text-typography-950 mb-2",
              titleClassName
            )}
          >
            {title}
          </h1>
          <p className={cn("text-muted-foreground", subtitleClassName)}>
            {subtitle}
          </p>
        </nav>
        <div>
          <UserButton />
        </div>
      </header>
    </GlassSurface>
  );
}
