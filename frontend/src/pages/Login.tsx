import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.webp";

export function Login() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const isSignup = tab === "signup";

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-md flex flex-col items-center"
    >
      <img src={logo} alt="Zagua Grooming" className="w-28 sm:w-32 object-contain" />

      <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink mt-3">
        {isSignup ? "Crea tu cuenta" : "Bienvenido de vuelta"}
      </h1>
      <p className="text-sm text-ink-soft mt-1 text-center">
        {isSignup
          ? "Registrá a tu peludo y agendá su próxima cita."
          : "Iniciá sesión para ver tus citas."}
      </p>

      {/* Tabs */}
      <div className="mt-5 w-full bg-teal-mist rounded-full p-1 flex gap-1">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${
            !isSignup ? "bg-surface text-teal-deep shadow-sm" : "text-ink-soft"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setTab("signup")}
          className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${
            isSignup ? "bg-surface text-teal-deep shadow-sm" : "text-ink-soft"
          }`}
        >
          Crear cuenta
        </button>
      </div>

      {/* Form (placeholder, no submite a backend) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-5 w-full flex flex-col gap-3"
      >
        {isSignup && (
          <>
            <input
              placeholder="Tu nombre"
              className="rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm focus:outline-none focus:border-teal"
            />
            <input
              placeholder="Teléfono (para WhatsApp)"
              className="rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm focus:outline-none focus:border-teal"
            />
          </>
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          className="rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm focus:outline-none focus:border-teal"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm focus:outline-none focus:border-teal"
        />
        {isSignup && (
          <label className="flex items-center gap-2 text-xs text-ink-soft px-1">
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-teal" />
            Quiero recordatorios por WhatsApp
          </label>
        )}
        <button
          type="submit"
          className="mt-2 w-full bg-teal text-white rounded-full py-3.5 text-sm font-bold shadow-lg shadow-teal/40 active:scale-95 hover:-translate-y-0.5 transition-transform"
        >
          {isSignup ? "Crear cuenta" : "Iniciar sesión"}
        </button>
        {!isSignup && (
          <button type="button" className="text-ink-soft text-xs font-semibold py-1 hover:underline">
            Olvidé mi contraseña
          </button>
        )}
      </form>

      <p className="mt-4 text-[11px] text-ink-faint text-center">
        (Pantalla de demo — sin autenticación real conectada todavía.)
      </p>
    </motion.section>
  );
}
