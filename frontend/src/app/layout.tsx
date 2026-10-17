import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio Site",
  description: "Portfolio site and information-security blog.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <header className="site-header">
          <Link className="brand" href="/">Portfolio Site</Link>
          <nav className="site-nav" aria-label="Primary">
            <Link href="/">Home</Link>
            <Link href="/projects/">Projects</Link>
            <Link href="/blog/">Blog</Link>
          </nav>
        </header>
        <main className="shell">{children}</main>
        <footer className="site-footer">
          <p>Built for a local-first launch, then EC2, S3 storage, and a custom domain later.</p>
        </footer>
      </body>
    </html>
  );
}
