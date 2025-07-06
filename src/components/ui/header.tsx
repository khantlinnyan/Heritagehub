import { UserButton } from "@clerk/nextjs";
export default function Header({
  className,
  title,
  subtitle,
}: {
  className?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <header className="flex items-center justify-between">
      <nav className="">
        <h1 className="text-2xl md:text-3xl font-bold text-typography-950 mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </nav>
      <div>
        <UserButton />
      </div>
    </header>
  );
}
