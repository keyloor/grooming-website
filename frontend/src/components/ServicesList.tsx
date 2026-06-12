import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Droplets, AlertCircle } from "lucide-react";
import type { Services } from "../models/Services";
import { getServices } from "../services/ServicesService";
import { ServiceRowSkeleton } from "./Skeleton";

const categories = ["Todos", "Baños", "Cortes", "Spa", "Extras"];

export function ServiceList() {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cat, setCat] = useState<string>("Todos");

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch((err) => setError(err instanceof Error ? err.message : "Error desconocido"))
      .finally(() => setLoading(false));
  }, []);

  // Filtro local por nombre (el backend no tiene categoría todavía)
  const filtered = useMemo(() => {
    if (cat === "Todos") return services;
    const q = cat.toLowerCase();
    return services.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q)
    );
  }, [services, cat]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <header>
        <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink">Servicios</h1>
        <p className="text-sm text-ink-soft">Precios en colones · perros y gatos</p>
      </header>

      {/* Chips de categoría */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold border transition-colors ${
                active
                  ? "bg-teal text-white border-teal shadow-md shadow-teal/35"
                  : "bg-surface text-ink-soft border-line hover:border-teal-deep hover:text-teal-deep"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceRowSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-pink-deep bg-pink-soft rounded-2xl px-4 py-3 animate-fade-in">
          <AlertCircle className="w-5 h-5" />
          No se pudieron cargar los servicios: {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="bg-surface rounded-2xl px-4 py-6 text-center text-ink-soft text-sm animate-fade-in">
          No se encontraron servicios en esta categoría.
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {!loading && filtered.map((s, i) => (
          <article
            key={s.id}
            className="bg-surface rounded-2xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)] flex gap-3 items-center animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-deep flex items-center justify-center flex-shrink-0">
              <Droplets className="w-5 h-5" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-ink text-[15px] truncate">{s.name}</h3>
              <p className="text-[12.5px] text-ink-soft line-clamp-2">{s.description}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-ink-soft bg-chip rounded-full px-2.5 py-0.5">
                  {s.durationMin ?? 0} min
                </span>
                <span className="font-display text-base font-bold text-teal">
                  ₡{Number(s.price ?? 0).toLocaleString("es-CR")}
                </span>
              </div>
            </div>
            <Link
              to="/book"
              className="flex-shrink-0 rounded-full bg-pink-soft text-pink-deep px-4 py-2 text-xs font-bold active:scale-95 hover:-translate-y-0.5 transition-transform"
            >
              Reservar
            </Link>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
