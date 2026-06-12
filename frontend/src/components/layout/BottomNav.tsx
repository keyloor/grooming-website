import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home, Scissors, CalendarHeart, PawPrint, Plus } from "lucide-react";

const items = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/services", label: "Servicios", icon: Scissors },
  { to: "/appointments", label: "Citas", icon: CalendarHeart },
  { to: "/pets", label: "Mascotas", icon: PawPrint },
];

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-canvas/92 backdrop-blur-xl border-t border-line-soft"
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-5 items-end px-2 pt-2.5">
        <NavItem to={items[0].to} label={items[0].label} icon={items[0].icon} />
        <NavItem to={items[1].to} label={items[1].label} icon={items[1].icon} />

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/book")}
            aria-label="Agendar cita"
            className={`w-14 h-14 rounded-full bg-teal text-white -mt-7 shadow-lg shadow-teal/45 grid place-items-center transition-transform active:scale-95 ${
              pathname === "/book" ? "ring-4 ring-teal-soft" : ""
            }`}
          >
            <Plus className="w-6 h-6" strokeWidth={2.4} />
          </button>
        </div>

        <NavItem to={items[2].to} label={items[2].label} icon={items[2].icon} />
        <NavItem to={items[3].to} label={items[3].label} icon={items[3].icon} />
      </div>
    </nav>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: typeof Home;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `flex flex-col items-center gap-0.5 py-1 ${
          isActive ? "text-teal-deep" : "text-ink-faint"
        }`
      }
    >
      <Icon className="w-5 h-5" strokeWidth={2} />
      <span className="text-[10.5px] font-bold">{label}</span>
    </NavLink>
  );
}
