import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Appointments", to: "/appointments" },
  { label: "Pets", to: "/pets" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-sky-600 bg-white/60"
        : "text-slate-600 hover:text-sky-600 hover:bg-white/40"
    }`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/50 shadow-sm shadow-sky-500/10">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg text-slate-800"
          onClick={() => setOpen(false)}
        >
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 shadow-lg shadow-sky-500/30">
            <PawPrint className="w-5 h-5 text-white" strokeWidth={2} />
          </span>
          Grooming
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
          className="md:hidden grid place-items-center w-10 h-10 rounded-xl text-sky-600 bg-white/50 backdrop-blur-md border border-white/60"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden px-4 pb-4 flex flex-col gap-1"
          >
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={linkClass}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
