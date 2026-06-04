import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scissors, Calendar, PawPrint, ArrowRight } from "lucide-react";
import logo from "../assets/logo.webp";

const quickLinks = [
  {
    title: "Services",
    description: "Browse baths, haircuts and grooming packages.",
    icon: Scissors,
    to: "/services",
  },
  {
    title: "Appointments",
    description: "Book, reschedule or cancel your appointments.",
    icon: Calendar,
    to: "/appointments",
  },
  {
    title: "Pets",
    description: "Manage your pets' profiles.",
    icon: PawPrint,
    to: "/pets",
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto"
      >
        <img
          src={logo}
          alt="Zagua Grooming"
          className="mx-auto w-40 sm:w-52 drop-shadow-xl"
        />
        <span className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-brand-teal bg-white/55 backdrop-blur-md border border-white/60">
          <PawPrint className="w-4 h-4" strokeWidth={2} />
          Welcome to Zagua Grooming
        </span>
        <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-slate-800">
          {clientName ? `Hello, ${clientName}!` : "Hello!"}
        </h1>
        <p className="mt-4 text-slate-500 text-base sm:text-lg">
          Pamper your pet with the best grooming services. Book your appointment
          in seconds.
        </p>
        <Link
          to="/appointments"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-brand-teal to-brand-pink shadow-lg shadow-brand-pink/30 hover:opacity-90 transition-all duration-200 active:scale-95"
        >
          Book appointment
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {quickLinks.map(({ title, description, icon: Icon, to }) => (
          <motion.div key={to} variants={item} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to={to}
              className="block h-full bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-brand-teal/15 p-6 hover:shadow-xl transition-all duration-300"
            >
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-teal to-brand-pink shadow-lg shadow-brand-pink/30">
                <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-800">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-teal">
                Go <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
