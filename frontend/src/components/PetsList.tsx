import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Loader2, AlertCircle, Pencil, Trash2, Check } from "lucide-react";
import type { Pets } from "../models/Pets";
import { getPets, updatePets, deletePets } from "../services/PetsService";

export function PetsList() {
  const [pets, setPets] = useState<Pets[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", age: 0, notes: "" });
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    getPets()
      .then((data) => setPets(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Error desconocido"))
      .finally(() => setLoading(false));
  }, []);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleEditStart = (pet: Pets) => {
    setEditingId(pet.id);
    setEditForm({ name: pet.name, age: pet.age, notes: pet.notes });
  };

  const handleEditSave = async (id: number, ownerId: number) => {
    if (!editForm.name || editForm.age == null) return;
    try {
      const updated = await updatePets(id, { ...editForm, ownerId });
      setPets((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setEditingId(null);
      showSuccess("¡Mascota actualizada con éxito!");
    } catch {
      setError("No se pudo actualizar la mascota.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePets(id);
      setPets((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      showSuccess("¡Mascota eliminada con éxito!");
    } catch {
      setError("No se pudo eliminar la mascota.");
    }
  };

  return (
    <section className="py-10 sm:py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Mis Mascotas</h1>
        <p className="mt-2 text-slate-500">Administra los perfiles de tus mascotas.</p>
      </motion.div>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-2xl px-4 py-3"
          >
            <Check className="w-5 h-5" />
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="mt-10 flex items-center gap-2 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          Cargando mascotas...
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl px-4 py-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {!loading && !error && pets.length === 0 && (
        <div className="mt-10 text-slate-500 bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl px-4 py-3">
          No se encontraron mascotas.
        </div>
      )}

      <motion.ul
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {pets.map((pet) => (
          <motion.li
            key={pet.id}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
            className="bg-white/55 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg shadow-brand-teal/15 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-teal to-brand-pink shadow-md shadow-brand-pink/30">
                <PawPrint className="w-5 h-5 text-white" strokeWidth={1.75} />
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditStart(pet)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-brand-teal hover:bg-brand-teal/10 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(pet.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {editingId === pet.id ? (
              <div className="mt-4 flex flex-col gap-2">
                <input
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="Nombre *"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
                <input
                  type="number"
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="Edad *"
                  value={editForm.age}
                  onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                />
                <input
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="Notas"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                />
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => handleEditSave(pet.id, pet.ownerId)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-brand-teal to-brand-pink text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-slate-800">{pet.name}</h3>
                <p className="text-sm text-slate-500">Raza: {pet.breedName ?? "—"}</p>
                <p className="text-sm text-slate-500">Edad: {pet.age} años</p>
                {pet.notes && <p className="mt-1 text-sm text-slate-400 italic">{pet.notes}</p>}
              </div>
            )}

            <AnimatePresence>
              {deleteConfirmId === pet.id && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                >
                  <p className="font-medium">¿Eliminar esta mascota?</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleDelete(pet.id)}
                      className="flex-1 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Sí, eliminar
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="flex-1 py-1.5 rounded-lg border border-red-200 text-red-500 text-sm hover:bg-red-100 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}