import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 mx-auto w-full max-w-6xl px-4 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
