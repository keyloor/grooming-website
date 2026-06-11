import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Scissors, AlertCircle, Loader2 } from "lucide-react";
import type { Product } from "../models/Product";
import { getProducts } from "../services/ProductService";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Error desconocido"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Servicios</h1>
        <p className="mt-2 text-slate-500">Servicios de grooming disponibles ahora mismo.</p>
      </motion.div>

      {loading && (
        <div className="mt-10 flex items-center gap-2 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          Cargando servicios...
        </div>
      )}

      {error && (
        <div className="mt-10 flex items-center gap-2 text-red-600 bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl px-4 py-3">
          <AlertCircle className="w-5 h-5" />
          <span>No se pudieron cargar los servicios: {error}</span>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="mt-10 text-slate-500 bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl px-4 py-3">
          Aún no hay servicios. Crea uno con POST <code>/api/products</code>.
        </div>
      )}

      <motion.ul
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <motion.li
            key={product.resourceId}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-brand-teal/15 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal to-brand-pink shadow-md shadow-brand-pink/30">
              <Scissors className="w-5 h-5 text-white" strokeWidth={1.75} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">{product.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{product.description}</p>
            <p className="mt-4 text-base font-medium text-brand-teal">
              ₡{product.price.toLocaleString("es-CR")}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
