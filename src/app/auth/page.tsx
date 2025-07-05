import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function page() {
  return (
    <div>
      <SignInButton />
      <SignUpButton />
    </div>
  );
}
