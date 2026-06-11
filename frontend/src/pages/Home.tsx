import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scissors, Calendar, PawPrint, ArrowRight } from "lucide-react";
import logo from "../assets/logo.webp";

const quickLinks = [
  {
    title: "Citas",
    description: "Agenda, reprograma o cancela tus citas.",
    icon: Calendar,
    to: "/appointments",
  },
  {
    title: "Mascotas",
    description: "Administra los perfiles de tus mascotas.",
    icon: PawPrint,
    to: "/pets",
  },
  {
    title: "Servicios",
    description: "Explora baños, cortes y paquetes de grooming.",
    icon: Scissors,
    to: "/services",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Home({ clientName }: { clientName?: string }) {
  return (
    <section className="py-10 sm:py-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-2xl"
      >
        <img
          src={logo}
          alt="Zagua Grooming"
          className="w-28 sm:w-32 drop-shadow-sm"
        />

        <span className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-brand-teal bg-brand-teal/10 border border-brand-teal/20">
          <PawPrint className="w-4 h-4" strokeWidth={2} />
          Bienvenido a Zagua Grooming
        </span>

        <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-slate-800 tracking-tight">
          {clientName ? (
            <>
              Hola, <span className="text-brand-teal">{clientName}</span>
            </>
          ) : (
            "Bienvenido de nuevo"
          )}
        </h1>

        <p className="mt-4 text-slate-500 text-base sm:text-lg">
          Consiente a tu mascota con los mejores servicios de grooming. Agenda
          tu próxima cita en segundos.
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <Link
            to="/appointments"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-brand-teal shadow-lg shadow-brand-teal/30 hover:bg-[#5fc4c6] transition-all duration-200 active:scale-95"
          >
            <Calendar className="w-5 h-5" strokeWidth={1.75} />
            Agendar cita
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-brand-teal bg-white/55 backdrop-blur-md border border-white/60 hover:bg-white/75 transition-all duration-200"
          >
            Ver servicios
            <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
          </Link>
        </div>
      </motion.div>

      {/* Quick access */}
      <div className="mt-12 sm:mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          Acceso rápido
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {quickLinks.map(({ title, description, icon: Icon, to }) => (
            <motion.div
              key={to}
              variants={item}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={to}
                className="group flex flex-col h-full bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-brand-teal/15 p-6 hover:shadow-xl transition-all duration-300"
              >
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-teal/12 text-brand-teal">
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-800">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-slate-500 flex-1">
                  {description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-teal">
                  Ir
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    strokeWidth={1.75}
                  />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
