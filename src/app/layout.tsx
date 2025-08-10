import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import BottomNavbar from "@/components/molecules/bottom-navbar";
import { Providers } from "./provider";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "HeritageHub",
  description: "Plan your Myanmar adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>
          <Providers>
            {children}

            <ToastContainer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
