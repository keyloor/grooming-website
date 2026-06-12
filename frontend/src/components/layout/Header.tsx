import { Link, NavLink, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import logo from "../../assets/logo.webp";

const navItems = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/services" },
  { label: "Mascotas", to: "/pets" },
  { label: "Citas", to: "/appointments" },
];

export function Header() {
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
      isActive
        ? "bg-teal-soft text-teal-deep"
        : "text-ink-soft hover:text-teal-deep hover:bg-teal-mist"
    }`;

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-canvas/85 backdrop-blur-xl border-b border-line-soft">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Zagua Grooming" className="w-10 h-10 object-contain" />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[11px] text-ink-soft font-medium">Bienvenido a</span>
            <span className="font-display text-lg font-semibold text-ink">Zagua Grooming</span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass} end={item.to === "/"}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/login")}
          className="relative grid place-items-center w-11 h-11 rounded-full bg-gradient-to-br from-teal to-pink text-white ring-2 ring-surface shadow-lg shadow-pink/30 hover:-translate-y-0.5 active:scale-95 transition-transform"
          aria-label="Iniciar sesión"
        >
          <User className="w-5 h-5" strokeWidth={2.2} />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-soft border-2 border-surface" />
        </button>
      </div>
    </header>
  );
}
