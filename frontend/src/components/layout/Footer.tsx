import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logo from "../../assets/logo.webp";

/* Logos oficiales (SVG inline) en lugar de iconos genéricos. */

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.81 8.43-4.95 8.43-9.94Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.95c-3.15 0-3.51.01-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.33.97-.38 2.04C2.18 8.49 2.16 8.85 2.16 12s.02 3.51.07 4.74c.05 1.07.23 1.65.38 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.33 2.04.38 1.23.06 1.59.07 4.74.07s3.51-.01 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.33-.97.38-2.04.06-1.23.07-1.59.07-4.74s-.01-3.51-.07-4.74c-.05-1.07-.23-1.65-.38-2.04-.2-.51-.44-.88-.83-1.27a3.42 3.42 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38-1.23-.06-1.59-.07-4.74-.07Zm0 3.32a4.57 4.57 0 1 1 0 9.14 4.57 4.57 0 0 1 0-9.14Zm0 1.95a2.62 2.62 0 1 0 0 5.24 2.62 2.62 0 0 0 0-5.24Zm5.83-2.16a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0Z" />
    </svg>
  );
}

function WhatsappIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.1 4.9A10 10 0 0 0 2.5 16.6L1.3 21.7a.5.5 0 0 0 .62.62l5.2-1.24a10 10 0 0 0 11.98-16.18ZM12 20.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.17-3.1.74.74-3.02-.2-.31A8.1 8.1 0 1 1 20.1 12 8.07 8.07 0 0 1 12 20.1Zm4.45-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.1-.1.24-.27.36-.41.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.83-.84 2.02 0 1.19.86 2.34.98 2.5.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

const socials = [
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com", hover: "hover:bg-[#1877F2]" },
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com", hover: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]" },
  { label: "WhatsApp", icon: WhatsappIcon, href: "https://wa.me/50688888888", hover: "hover:bg-[#25D366]" },
];

const navColumns = [
  {
    title: "Servicios",
    links: [
      { label: "Baños", to: "/services" },
      { label: "Cortes", to: "/services" },
      { label: "Spa", to: "/services" },
      { label: "Extras", to: "/services" },
    ],
  },
  {
    title: "Tu cuenta",
    links: [
      { label: "Mis mascotas", to: "/pets" },
      { label: "Mis citas", to: "/appointments" },
      { label: "Agendar cita", to: "/book" },
      { label: "Iniciar sesión", to: "/login" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="hidden md:block bg-canvas border-t border-line-soft">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Marca */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Zagua Grooming" className="w-12 h-12 object-contain" />
              <div className="font-display text-xl font-semibold text-ink">Zagua Grooming</div>
            </div>
            <p className="text-sm text-ink-soft mt-4 max-w-sm leading-relaxed">
              Cariño e higiene para tu mejor amigo. Productos hipoalergénicos, secado a mano y mucho mimo.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ label, icon: Icon, href, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className={`group grid place-items-center w-10 h-10 rounded-full bg-teal-mist text-teal-deep transition-all duration-200 hover:text-white hover:-translate-y-0.5 ${hover}`}
                >
                  <Icon className="w-4 h-4 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de enlaces */}
          {navColumns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-soft hover:text-teal-deep transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacto */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Visítanos</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-teal-deep flex-shrink-0" />
                San José, Costa Rica
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-teal-deep flex-shrink-0" />
                +506 8888 8888
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-teal-deep flex-shrink-0" />
                hola@zaguagrooming.cr
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 text-teal-deep flex-shrink-0" />
                Lun–Sáb · 9:00 – 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line-soft flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-faint">
          <span>© 2026 Zagua Grooming. Todos los derechos reservados.</span>
          <span>Hecho con cariño en Costa Rica.</span>
        </div>
      </div>
    </footer>
  );
}
