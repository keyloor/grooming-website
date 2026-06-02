import { PawPrint, Globe, AtSign, MessageCircle } from "lucide-react";

const socials = [
  { label: "Facebook", icon: Globe, href: "#" },
  { label: "Instagram", icon: AtSign, href: "#" },
  { label: "Twitter", icon: MessageCircle, href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-white/40 backdrop-blur-xl border-t border-white/50 shadow-sm shadow-sky-500/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <PawPrint className="w-5 h-5 text-sky-500" strokeWidth={2} />
          PawSpa
        </div>

        <p className="text-sm text-slate-500 text-center">
          © 2026 PawSpa Web Application. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid place-items-center w-9 h-9 rounded-xl text-sky-600 bg-white/50 backdrop-blur-md border border-white/60 hover:bg-white/70 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Icon className="w-4 h-4" strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
