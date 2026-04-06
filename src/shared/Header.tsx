// shared/Header.tsx
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-semibold transition-colors hover:text-blue-600 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/404"
          className={({ isActive }) =>
            `text-sm font-semibold transition-colors hover:text-blue-600 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-300"}`
          }
        >
          404 Error Example
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
