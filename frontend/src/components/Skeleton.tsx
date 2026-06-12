/**
 * Skeleton primitivo con un efecto "shimmer" sutil.
 * Usar como reemplazo visual de bloques mientras carga la data.
 */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-line-soft rounded-md ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-surface/70 to-transparent animate-shimmer" />
    </div>
  );
}

/** Tarjeta-skeleton equivalente a un servicio "favorito" de Home. */
export function ServiceCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)] flex flex-col gap-2.5">
      <Skeleton className="w-10 h-10 rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/3" />
      <div className="flex items-center justify-between mt-1">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}

/** Fila-skeleton equivalente a un servicio del catálogo. */
export function ServiceRowSkeleton() {
  return (
    <div className="bg-surface rounded-2xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)] flex gap-3 items-center">
      <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-3/4" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
      <Skeleton className="h-9 w-20 rounded-full flex-shrink-0" />
    </div>
  );
}

/** Tarjeta-skeleton equivalente a una mascota. */
export function PetCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl p-4 shadow-[0_4px_14px_rgba(36,80,90,0.06)] flex gap-3 items-center">
      <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}
