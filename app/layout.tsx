import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Command Search Demo",
  description: "A demo of the command search functionality using Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.className,
        "min-h-screen bg-background font-sans antialiased"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
              <div className="container flex h-14 max-w-3xl items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link className="flex items-center space-x-2" href="/">
                    <span className="font-bold">
                      Command Search
                    </span>
                  </Link>
                </div>
                <div className="flex w-full max-w-sm items-center justify-end space-x-2">
                  <CommandMenu />
                </div>
              </div>
            </header>
            <main className="flex-1">
              <div className="container  py-6">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
