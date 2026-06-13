import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Scissors, PawPrint, CalendarHeart, Sparkles, Plus, ArrowRight,
} from "lucide-react";
import logo from "../assets/logo.webp";
import type { Services } from "../models/Services";
import { getServices } from "../services/ServicesService";
import { ServiceCardSkeleton } from "../components/Skeleton";

const quickActions = [
  { to: "/services", label: "Servicios", sub: "Ver el catálogo", bg: "bg-teal-mist", color: "text-teal-deep", Icon: Scissors },
  { to: "/book", label: "Agendar", sub: "Reservá una cita", bg: "bg-pink-soft", color: "text-pink-deep", Icon: CalendarHeart },
  { to: "/pets", label: "Mascotas", sub: "Tus peludos", bg: "bg-teal-soft", color: "text-teal-deep", Icon: PawPrint },
  { to: "/appointments", label: "Mis citas", sub: "Próximas y pasadas", bg: "bg-pink-soft", color: "text-pink-deep", Icon: Sparkles },
];

// Próxima cita: placeholder (no hay GET de citas todavía)
const nextApt = {
  day: "18",
  month: "jun",
  service: "Baño + corte",
  detail: "Luna · 10:00 a. m.",
};

export function Home() {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  const popular = services.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-surface rounded-3xl p-6 sm:p-10 shadow-[0_6px_24px_rgba(36,80,90,0.08)]"
      >
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-teal-mist"
          style={{ animation: "floatBub 7s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-10 right-20 w-20 h-20 rounded-full bg-pink-soft"
          style={{ animation: "floatBub 9s ease-in-out infinite" }}
        />

        <div className="relative flex flex-col-reverse sm:flex-row items-center gap-6 sm:gap-10">
          <div className="flex-1 flex flex-col gap-3 text-center sm:text-left">
            <span className="text-xs text-ink-soft font-semibold uppercase tracking-wider">
              Spa para mascotas en CR
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-ink leading-tight">
              Cariño e higiene para tu mejor amigo
            </h1>
            <p className="text-ink-soft text-sm sm:text-base max-w-md">
              Baños, cortes y spa con productos suaves, en Costa Rica.
            </p>
            <div className="flex flex-wrap gap-3 mt-2 justify-center sm:justify-start">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 bg-teal text-white rounded-full px-6 py-3 text-sm font-bold shadow-lg shadow-teal/40 active:scale-95 hover:-translate-y-0.5 transition-transform"
              >
                Agendar cita <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-teal-mist text-teal-deep rounded-full px-6 py-3 text-sm font-bold hover:bg-teal-soft transition-colors"
              >
                Ver servicios
              </Link>
            </div>
          </div>
          <img
            src={logo}
            alt=""
            className="relative w-36 sm:w-48 lg:w-56 object-contain drop-shadow-md"
          />
        </div>
      </motion.section>

      {/* Próxima cita (placeholder) */}
      <section className="bg-teal-soft rounded-3xl p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-surface flex flex-col items-center justify-center flex-shrink-0">
          <span className="font-display text-xl font-bold text-teal leading-none">{nextApt.day}</span>
          <span className="text-[11px] text-ink-soft capitalize">{nextApt.month}</span>
        </div>
        <div className="flex-1 flex flex-col gap-0.5 min-w-0">
          <span className="text-xs font-bold text-teal-deep uppercase tracking-wider">
            Tu próxima cita
          </span>
          <span className="text-base font-bold text-ink truncate">{nextApt.service}</span>
          <span className="text-sm text-ink-soft">{nextApt.detail}</span>
        </div>
        <Link
          to="/appointments"
          className="text-teal-deep font-bold text-sm hover:underline shrink-0"
        >
          Ver
        </Link>
      </section>

      {/* Accesos rápidos */}
      <section>
        <h2 className="font-display text-xl font-semibold text-ink mb-4">Accesos rápidos</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(({ to, label, sub, bg, color, Icon }) => (
            <Link
              key={to}
              to={to}
              className="bg-surface rounded-3xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)] hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} strokeWidth={2} />
              </div>
              <div className="font-bold text-ink text-sm">{label}</div>
              <div className="text-xs text-ink-soft">{sub}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Favoritos */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-xl font-semibold text-ink">Los favoritos</h2>
          <Link to="/services" className="text-pink-deep text-sm font-bold hover:underline">
            Ver todos
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : popular.length === 0 ? (
          <div className="text-ink-soft text-sm bg-surface rounded-2xl p-4 animate-fade-in">
            No hay servicios todavía.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {popular.map((s, i) => (
              <div
                key={s.id}
                className="bg-surface rounded-2xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)] flex flex-col gap-2 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-teal-soft flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-teal-deep" strokeWidth={2} />
                </div>
                <div className="font-bold text-sm text-ink leading-tight">{s.name}</div>
                <div className="text-xs text-ink-soft">{s.durationMin ?? 0} min</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="font-display text-base font-bold text-teal">
                    ₡{Number(s.price ?? 0).toLocaleString("es-CR")}
                  </div>
                  <Link
                    to="/book"
                    className="w-8 h-8 rounded-full bg-teal-mist text-teal-deep grid place-items-center active:scale-95 transition-transform"
                    aria-label="Reservar"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.4} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <p className="text-center text-xs text-ink-faint">
        Productos hipoalergénicos · Secado a mano · Mucho cariño
      </p>
    </div>
  );
}
