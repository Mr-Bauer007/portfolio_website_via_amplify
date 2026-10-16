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
          <nav aria-label="Primary navigation">
            <Link href="/projects/">Projects</Link>
            <Link href="/blog/">Writing</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <span>Independent security engineering</span>
          <span>Built with Wagtail + Next.js</span>
        </footer>
      </body>
    </html>
  );
}
