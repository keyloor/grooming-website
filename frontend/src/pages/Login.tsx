import { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.webp";
import { signupOwner } from "../services/OwnersService";

export function Login() {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const isSignup = tab === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const PHONE_REGEX = /^\+?\d{8,15}$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (isSignup) {
      if (!PHONE_REGEX.test(phone)) {
        setError("El teléfono debe tener entre 8 y 15 dígitos y puede comenzar con +.");
        return;
      }

      try {
        const newOwner = await signupOwner({ name, email, phone, password });
        setMessage(`Cuenta creada: ${newOwner.name}`);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear la cuenta");
      }
    } else {
      setMessage("Funcionalidad de inicio de sesión aún no implementada.");
    }
  };

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

      <div className="mt-5 w-full bg-teal-mist rounded-full p-1 flex gap-1">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${
            !isSignup ? "bg-surface text-teal-deep shadow-sm" : "text-ink-soft"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={`flex-1 rounded-full py-2.5 text-sm font-bold transition-all ${
            isSignup ? "bg-surface text-teal-deep shadow-sm" : "text-ink-soft"
          }`}
        >
          Crear cuenta
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 w-full flex flex-col gap-3">
        {isSignup && (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm focus:outline-none focus:border-teal"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Teléfono (para WhatsApp)"
              pattern="^\+?\d{8,15}$"
              title="Solo números, de 8 a 15 dígitos, opcional + al inicio"
              className="rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm focus:outline-none focus:border-teal"
            />
          </>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Correo electrónico"
          className="rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm focus:outline-none focus:border-teal"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      </form>

      {message && <p className="mt-4 text-sm text-teal-deep">{message}</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <p className="mt-4 text-[11px] text-ink-faint text-center">
        {isSignup ? "Registro conectado al backend." : "Inicio de sesión aún no implementado."}
      </p>
    </motion.section>
  );
}
