// App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "@/shared/Header";
import Footer from "@/shared/Footer";
import NotFound from "@/shared/NotFound";
import Home from "@/features/home";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Header />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
