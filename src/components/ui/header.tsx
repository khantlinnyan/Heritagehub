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
        <h1 className="text-primary/80 text-xl lg:text-2xl font-semibold">
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
