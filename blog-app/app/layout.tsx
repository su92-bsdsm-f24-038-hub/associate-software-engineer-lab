import type { Metadata } from "next";
import Link from "next/link";
import SessionNav from "@/components/auth/SessionNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workboard App",
  description: "Integrated Todo, Blog, and Product CRUD workboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              DownLabs Workboard
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
              <Link href="/">Workboard</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/products">Products</Link>
              <SessionNav />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
