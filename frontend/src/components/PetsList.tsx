import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Pencil, Trash2, Check, Plus } from "lucide-react";
import type { Pets } from "../models/Pets";
import { getPets, updatePets, deletePets } from "../services/PetsService";
import { PetCardSkeleton } from "./Skeleton";

// Colores para avatares (rotan por mascota)
const AVATAR_PALETTE = [
  { bg: "bg-teal-soft", color: "text-teal-deep" },
  { bg: "bg-pink-soft", color: "text-pink-deep" },
  { bg: "bg-teal-mist", color: "text-teal-deep" },
];

const PET_TYPES = ["Perro", "Gato"];
const PET_SIZES = ["Pequeño", "Mediano", "Grande"];

export function PetsList() {
  const [pets, setPets] = useState<Pets[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit/Delete inline (REAL — usa backend)
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", age: 0, notes: "" });
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Nueva mascota (PLACEHOLDER — todavía no hay POST en backend)
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({ name: "", type: "Perro", breed: "", age: 0, size: "Mediano", notes: "" });

  useEffect(() => {
    getPets()
      .then(setPets)
      .catch((err) => setError(err instanceof Error ? err.message : "Error desconocido"))
      .finally(() => setLoading(false));
  }, []);

  const flash = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleEditStart = (pet: Pets) => {
    setEditingId(pet.id);
    setEditForm({ name: pet.name, age: pet.age, notes: pet.notes ?? "" });
  };

  const handleEditSave = async (id: number, ownerId: number) => {
    if (!editForm.name) return;
    try {
      const updated = await updatePets(id, { ...editForm, ownerId });
      setPets((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
      setEditingId(null);
      flash("¡Mascota actualizada!");
    } catch {
      setError("No se pudo actualizar la mascota.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePets(id);
      setPets((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirmId(null);
      flash("¡Mascota eliminada!");
    } catch {
      setError("No se pudo eliminar la mascota.");
    }
  };

  const handleSaveDraft = () => {
    // PLACEHOLDER — sin backend
    setShowForm(false);
    setDraft({ name: "", type: "Perro", breed: "", age: 0, size: "Mediano", notes: "" });
    flash("Guardado en placeholder (sin backend POST aún).");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      <header>
        <h1 className="font-display text-2xl sm:text-4xl font-semibold text-ink">Mis mascotas</h1>
        <p className="text-sm text-ink-soft">La familia que mimamos en Zagua</p>
      </header>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-teal-deep bg-teal-soft rounded-2xl px-4 py-3 text-sm"
          >
            <Check className="w-5 h-5" />
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <PetCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-pink-deep bg-pink-soft rounded-2xl px-4 py-3 animate-fade-in">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {!loading && !error && pets.length === 0 && !showForm && (
        <div className="bg-surface rounded-2xl px-4 py-6 text-center text-ink-soft text-sm">
          Todavía no tenés mascotas registradas.
        </div>
      )}

      {/* Grid de mascotas */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {!loading && pets.map((pet, i) => {
          const avatar = AVATAR_PALETTE[i % AVATAR_PALETTE.length];
          const initial = pet.name?.[0]?.toUpperCase() ?? "?";
          return (
            <article
              key={pet.id}
              className="bg-surface rounded-2xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)] flex flex-col gap-3 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full ${avatar.bg} ${avatar.color} flex items-center justify-center font-display font-bold text-xl flex-shrink-0`}>
                  {initial}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ink text-[15px] truncate">{pet.name}</h3>
                  <p className="text-xs text-ink-soft">
                    {pet.breedName ?? "—"} · {pet.age} años
                  </p>
                  {pet.notes && (
                    <p className="text-xs text-pink-deep mt-1 italic line-clamp-2">
                      ✱ {pet.notes}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleEditStart(pet)}
                    className="p-1.5 rounded-lg text-ink-soft hover:text-teal-deep hover:bg-teal-mist transition-colors"
                    aria-label="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(pet.id)}
                    className="p-1.5 rounded-lg text-ink-soft hover:text-pink-deep hover:bg-pink-soft transition-colors"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {editingId === pet.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-2 overflow-hidden"
                  >
                    <input
                      className="rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
                      placeholder="Nombre"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                    <input
                      type="number"
                      className="rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
                      placeholder="Edad"
                      value={editForm.age}
                      onChange={(e) => setEditForm({ ...editForm, age: Number(e.target.value) })}
                    />
                    <input
                      className="rounded-xl border border-line bg-canvas px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
                      placeholder="Notas"
                      value={editForm.notes}
                      onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 py-2 rounded-full bg-chip text-ink-soft text-sm font-bold hover:bg-line-soft"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleEditSave(pet.id, pet.ownerId)}
                        className="flex-[1.4] py-2 rounded-full bg-teal text-white text-sm font-bold shadow-md shadow-teal/35"
                      >
                        Guardar
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {deleteConfirmId === pet.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-pink-soft border border-pink/40 rounded-2xl text-sm text-pink-deep"
                  >
                    <p className="font-bold">¿Eliminar esta mascota?</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="flex-1 py-1.5 rounded-full border border-pink/40 text-pink-deep text-sm font-semibold hover:bg-pink/10"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleDelete(pet.id)}
                        className="flex-1 py-1.5 rounded-full bg-pink text-white text-sm font-bold"
                      >
                        Sí, eliminar
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>

      {/* Formulario nueva mascota (placeholder) */}
      {showForm ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl p-5 shadow-[0_4px_14px_rgba(36,80,90,0.06)] flex flex-col gap-3"
        >
          <h3 className="font-bold text-ink">Nueva mascota</h3>
          <input
            placeholder="Nombre"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="rounded-xl border border-line bg-canvas px-3 py-3 text-sm focus:outline-none focus:border-teal"
          />
          <div className="flex gap-2">
            {PET_TYPES.map((t) => {
              const active = draft.type === t;
              return (
                <button
                  key={t}
                  onClick={() => setDraft({ ...draft, type: t })}
                  className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-teal-soft border-teal text-teal-deep"
                      : "bg-canvas border-line text-ink-soft"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <input
              placeholder="Raza (ej. Zaguate)"
              value={draft.breed}
              onChange={(e) => setDraft({ ...draft, breed: e.target.value })}
              className="flex-1 rounded-xl border border-line bg-canvas px-3 py-3 text-sm focus:outline-none focus:border-teal"
            />
            <input
              type="number"
              min={0}
              placeholder="Edad"
              value={draft.age || ""}
              onChange={(e) => setDraft({ ...draft, age: Number(e.target.value) })}
              className="w-24 rounded-xl border border-line bg-canvas px-3 py-3 text-sm focus:outline-none focus:border-teal"
            />
          </div>
          <div className="flex gap-2">
            {PET_SIZES.map((sz) => {
              const active = draft.size === sz;
              return (
                <button
                  key={sz}
                  onClick={() => setDraft({ ...draft, size: sz })}
                  className={`flex-1 rounded-xl border py-2.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-teal-soft border-teal text-teal-deep"
                      : "bg-canvas border-line text-ink-soft"
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
          <textarea
            placeholder="Notas: alergias, miedos, temperamento…"
            rows={2}
            value={draft.notes}
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            className="rounded-xl border border-line bg-canvas px-3 py-3 text-sm focus:outline-none focus:border-teal resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 py-3 rounded-full bg-chip text-ink-soft text-sm font-bold"
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveDraft}
              className="flex-[1.4] py-3 rounded-full bg-teal text-white text-sm font-bold shadow-md shadow-teal/35"
            >
              Guardar
            </button>
          </div>
        </motion.div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full border-2 border-dashed border-teal/45 bg-transparent text-teal-deep rounded-2xl py-4 text-sm font-bold hover:bg-teal-soft transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2.4} />
          Agregar mascota
        </button>
      )}
    </motion.section>
  );
}
