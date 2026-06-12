import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const showFooter = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-20 pb-28 md:pb-12">
        {children}
      </main>
      {showFooter && <Footer />}
      <BottomNav />
    </div>
  );
}
