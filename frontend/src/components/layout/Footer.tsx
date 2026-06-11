import { Globe, AtSign, MessageCircle } from "lucide-react";
import logo from "../../assets/logo.webp";

const socials = [
  { label: "Facebook", icon: Globe, href: "#" },
  { label: "Instagram", icon: AtSign, href: "#" },
  { label: "Twitter", icon: MessageCircle, href: "#" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-white/40 backdrop-blur-xl border-t border-white/50 shadow-sm shadow-brand-teal/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Zagua Grooming" className="h-14 w-auto" />

        <p className="text-sm text-slate-500 text-center">
          © 2026 Aplicación Web. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-2">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="grid place-items-center w-9 h-9 rounded-xl text-brand-teal bg-white/50 backdrop-blur-md border border-white/60 hover:text-brand-pink hover:bg-white/70 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Icon className="w-4 h-4" strokeWidth={1.75} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
