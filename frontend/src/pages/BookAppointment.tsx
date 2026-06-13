import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, PawPrint, Check } from "lucide-react";
import type { Services } from "../models/Services";
import type { Pets } from "../models/Pets";
import { getServices } from "../services/ServicesService";
import { getPets } from "../services/PetsService";

// Pasos: 1 servicio · 2 mascota · 3 fecha+hora · 4 confirmar · 5 éxito
const STEP_TITLES = ["¿Qué servicio?", "¿Para quién?", "¿Cuándo?", "Confirmar"];
const TIMES = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

// Pre-llenamos 7 días desde hoy
function getDays() {
  const days: { iso: string; dom: number; dow: string }[] = [];
  const dows = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({ iso: d.toISOString().slice(0, 10), dom: d.getDate(), dow: dows[d.getDay()] });
  }
  return days;
}

export function BookAppointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Services[]>([]);
  const [pets, setPets] = useState<Pets[]>([]);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [petId, setPetId] = useState<number | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getServices().then(setServices).catch(() => setServices([]));
    getPets().then(setPets).catch(() => setPets([]));
  }, []);

  const days = getDays();
  const selectedService = services.find((s) => s.id === serviceId);
  const selectedPet = pets.find((p) => p.id === petId);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => s - 1);
  };

  const handleConfirm = () => {
    // PLACEHOLDER — no POST a backend
    setDone(true);
  };

  if (done) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center py-12"
      >
        <div
          className="w-24 h-24 rounded-full bg-teal-soft grid place-items-center"
          style={{ animation: "popIn 0.5s cubic-bezier(.3,1.4,.5,1)" }}
        >
          <Check className="w-12 h-12 text-teal" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-5">
          ¡Cita confirmada!
        </h1>
        <p className="text-sm text-ink-soft mt-2 max-w-sm">
          Te enviaremos un recordatorio por WhatsApp un día antes.
        </p>
        <div className="flex flex-col gap-2 mt-6 w-full max-w-xs">
          <Link
            to="/appointments"
            className="bg-teal text-white rounded-full py-3 text-sm font-bold shadow-md shadow-teal/35"
          >
            Ver mis citas
          </Link>
          <Link to="/" className="text-ink-soft text-sm font-semibold py-2 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5 max-w-3xl mx-auto"
    >
      {/* Header con back + progreso */}
      <div className="flex items-center gap-3">
        <button
          onClick={back}
          className="w-10 h-10 rounded-full bg-surface shadow-sm grid place-items-center text-ink active:scale-95"
          aria-label="Atrás"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="font-display text-xl sm:text-2xl font-semibold text-ink">
          {STEP_TITLES[step - 1]}
        </h1>
      </div>

      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i <= step ? "bg-teal" : "bg-line-soft"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Paso 1 — servicio */}
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="space-y-2.5"
          >
            {services.length === 0 ? (
              <p className="text-sm text-ink-soft">Cargando servicios…</p>
            ) : (
              services.map((s) => {
                const active = serviceId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setServiceId(s.id);
                      next();
                    }}
                    className={`w-full flex gap-3 items-center text-left bg-surface rounded-2xl p-4 border transition-colors ${
                      active ? "border-teal" : "border-line"
                    }`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-teal-soft text-teal-deep grid place-items-center flex-shrink-0">
                      <PawPrint className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-ink text-[15px] truncate">{s.name}</div>
                      <div className="text-xs text-ink-soft">{s.durationMin ?? 0} min</div>
                    </div>
                    <div className="font-display font-bold text-teal text-base flex-shrink-0">
                      ₡{Number(s.price ?? 0).toLocaleString("es-CR")}
                    </div>
                  </button>
                );
              })
            )}
          </motion.div>
        )}

        {/* Paso 2 — mascota */}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="space-y-2.5"
          >
            {pets.length === 0 ? (
              <p className="text-sm text-ink-soft">Cargando mascotas…</p>
            ) : (
              pets.map((p) => {
                const active = petId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPetId(p.id);
                      next();
                    }}
                    className={`w-full flex gap-3 items-center text-left bg-surface rounded-2xl p-4 border transition-colors ${
                      active ? "border-teal" : "border-line"
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full bg-teal-soft text-teal-deep grid place-items-center font-display font-bold text-lg flex-shrink-0">
                      {p.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-ink text-[15px] truncate">{p.name}</div>
                      <div className="text-xs text-ink-soft">
                        {p.breedName ?? "—"} · {p.age} años
                      </div>
                    </div>
                  </button>
                );
              })
            )}
            <Link
              to="/pets"
              className="w-full border-2 border-dashed border-teal/45 text-teal-deep rounded-2xl p-3.5 text-sm font-bold block text-center hover:bg-teal-soft transition-colors"
            >
              + Registrar otra mascota
            </Link>
          </motion.div>
        )}

        {/* Paso 3 — fecha y hora */}
        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="space-y-5"
          >
            <div>
              <p className="text-sm font-bold text-ink mb-2">Elegí el día</p>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {days.map((d) => {
                  const active = day === d.iso;
                  return (
                    <button
                      key={d.iso}
                      onClick={() => setDay(d.iso)}
                      className={`flex-shrink-0 w-16 rounded-2xl border py-3 flex flex-col items-center transition-colors ${
                        active
                          ? "bg-teal-soft border-teal text-teal-deep"
                          : "bg-surface border-line text-ink-soft"
                      }`}
                    >
                      <span className="text-[11px] font-semibold capitalize">{d.dow}</span>
                      <span className="font-display text-lg font-bold">{d.dom}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-ink mb-2">Elegí la hora</p>
              {!day ? (
                <p className="text-sm text-ink-faint">Primero elegí un día 🐾</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {TIMES.map((t) => {
                    const active = time === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`rounded-xl border py-3 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-teal-soft border-teal text-teal-deep"
                            : "bg-surface border-line text-ink-soft"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {day && time && (
              <button
                onClick={next}
                className="w-full bg-teal text-white rounded-full py-3.5 text-sm font-bold shadow-lg shadow-teal/35 active:scale-95"
              >
                Continuar
              </button>
            )}
          </motion.div>
        )}

        {/* Paso 4 — confirmar */}
        {step === 4 && (
          <motion.div
            key="s4"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            className="space-y-4"
          >
            <div className="bg-surface rounded-3xl p-5 shadow-[0_4px_16px_rgba(36,80,90,0.07)] flex flex-col gap-3.5">
              <Row k="Servicio" v={selectedService?.name ?? "—"} />
              <Row k="Mascota" v={selectedPet?.name ?? "—"} />
              <Row k="Fecha" v={day ?? "—"} />
              <Row k="Hora" v={time ?? "—"} />
              <div className="h-px bg-line-soft" />
              <Row
                k="Total"
                v={`₡${Number(selectedService?.price ?? 0).toLocaleString("es-CR")}`}
                bold
              />
            </div>
            <textarea
              placeholder="Notas para el groomer (opcional)"
              rows={2}
              className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-sm focus:outline-none focus:border-teal resize-none"
            />
            <div className="flex items-center gap-2 bg-teal-soft rounded-2xl px-4 py-3 text-xs text-teal-deep">
              <Check className="w-4 h-4" />
              Te enviaremos un recordatorio por WhatsApp un día antes.
            </div>
            <button
              onClick={handleConfirm}
              className="w-full bg-pink text-white rounded-full py-4 text-sm font-bold shadow-lg shadow-pink/40 active:scale-95 hover:-translate-y-0.5 transition-transform"
            >
              Confirmar cita
            </button>
            <p className="text-[11px] text-ink-faint text-center">
              (Demo — no se guarda en backend aún.)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex justify-between items-baseline gap-3">
      <span className={`text-xs ${bold ? "font-bold text-ink" : "text-ink-soft"}`}>{k}</span>
      <span
        className={`${
          bold ? "font-display text-xl font-bold text-teal" : "text-[14.5px] font-bold text-ink"
        } text-right`}
      >
        {v}
      </span>
    </div>
  );
}
