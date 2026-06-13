import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, CalendarHeart, Repeat } from "lucide-react";

// PLACEHOLDER: aún no hay GET /api/appointments cableado en el frontend.
const upcoming = [
  {
    id: 1,
    day: "18",
    month: "jun",
    service: "Baño + corte",
    detail: "Luna · 10:00 a. m.",
    status: "Confirmada",
  },
];

const past = [
  { id: 11, service: "Baño completo", detail: "Luna · 12 may", icon: PawPrint },
  { id: 12, service: "Corte de uñas", detail: "Mishi · 28 abr", icon: PawPrint },
];

export function Appointments() {
  const [tab, setTab] = useState<"prox" | "hist">("prox");
  const [cancelId, setCancelId] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <header>
        <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink">Mis citas</h1>
      </header>

      {/* Tabs */}
      <div className="w-full bg-teal-mist rounded-full p-1 flex gap-1">
        <button
          onClick={() => setTab("prox")}
          className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${
            tab === "prox" ? "bg-surface text-teal-deep shadow-sm" : "text-ink-soft"
          }`}
        >
          Próximas
        </button>
        <button
          onClick={() => setTab("hist")}
          className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${
            tab === "hist" ? "bg-surface text-teal-deep shadow-sm" : "text-ink-soft"
          }`}
        >
          Historial
        </button>
      </div>

      {tab === "prox" && (
        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-teal-mist grid place-items-center">
                <PawPrint className="w-7 h-7 text-teal-deep" />
              </div>
              <p className="text-sm text-ink-soft max-w-xs">
                No tenés citas próximas. ¡Tu peludito merece un día de spa!
              </p>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 bg-teal text-white rounded-full px-6 py-3 text-sm font-bold shadow-md shadow-teal/35"
              >
                <CalendarHeart className="w-4 h-4" /> Agendar cita
              </Link>
            </div>
          ) : (
            upcoming.map((a) => (
              <article
                key={a.id}
                className="bg-surface rounded-2xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)] flex flex-col gap-3"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-teal-soft flex flex-col items-center justify-center flex-shrink-0">
                    <span className="font-display text-xl font-bold text-teal-deep leading-none">
                      {a.day}
                    </span>
                    <span className="text-[11px] text-ink-soft capitalize">{a.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-ink text-[15px] truncate">{a.service}</div>
                    <div className="text-sm text-ink-soft">{a.detail}</div>
                  </div>
                  <span className="flex-shrink-0 text-xs font-bold text-teal-deep bg-teal-soft rounded-full px-3 py-1">
                    {a.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-full bg-teal-mist text-teal-deep text-sm font-bold active:scale-95 transition-transform">
                    Reprogramar
                  </button>
                  <button
                    onClick={() => setCancelId(a.id)}
                    className="flex-1 py-2.5 rounded-full bg-pink-soft text-pink-deep text-sm font-bold active:scale-95 transition-transform"
                  >
                    Cancelar
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      )}

      {tab === "hist" && (
        <div className="space-y-3">
          {past.map((a) => (
            <article
              key={a.id}
              className="bg-surface rounded-2xl p-4 shadow-[0_3px_10px_rgba(36,80,90,0.04)] flex gap-3 items-center opacity-90"
            >
              <div className="w-11 h-11 rounded-2xl bg-chip flex items-center justify-center flex-shrink-0">
                <a.icon className="w-5 h-5 text-ink-soft" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-ink text-[14.5px] truncate">{a.service}</div>
                <div className="text-sm text-ink-soft">{a.detail}</div>
              </div>
              <button className="flex-shrink-0 rounded-full bg-teal-mist text-teal-deep px-3 py-2 text-xs font-bold flex items-center gap-1.5 active:scale-95">
                <Repeat className="w-3.5 h-3.5" /> Repetir
              </button>
            </article>
          ))}
        </div>
      )}

      {/* Modal cancelar */}
      <AnimatePresence>
        {cancelId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/45 grid place-items-center z-50 px-7"
            onClick={() => setCancelId(null)}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.4 }}
              className="w-full max-w-sm bg-surface rounded-3xl p-6 text-center flex flex-col gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-display text-xl font-semibold text-ink">
                ¿Cancelar esta cita?
              </h2>
              <p className="text-sm text-ink-soft">
                Si necesitas reagendar, podés volver a reservar cuando quieras.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setCancelId(null)}
                  className="flex-1 py-3 rounded-full bg-chip text-ink text-sm font-bold"
                >
                  Mantener
                </button>
                <button
                  onClick={() => setCancelId(null)}
                  className="flex-1 py-3 rounded-full bg-pink text-white text-sm font-bold shadow-md shadow-pink/35"
                >
                  Sí, cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[11px] text-ink-faint text-center">
        (Datos de demostración — todavía no conectado al GET de citas.)
      </p>
    </motion.section>
  );
}
