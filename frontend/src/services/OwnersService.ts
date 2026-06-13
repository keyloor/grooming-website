import { config } from "../config";

const API_URL = `${config.api.url}/api/owners`;

export interface Owner {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export async function signupOwner(data: { name: string; email: string; phone: string; password: string; }): Promise<Owner> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => null);
        const errorMessage = body?.message || "Error al crear el usuario";
        throw new Error(errorMessage);
    }

    return response.json();
}

export async function getOwners(): Promise<Owner[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error fetching owners");
    return response.json();
}

// Perfil del cliente actual. Sin login real todavía: se guarda al registrarse
// y, si no existe, PetsList recurre al primer owner (el de demo) como respaldo.
const OWNER_KEY = "zagua_owner";

export function getStoredOwner(): Owner | null {
    try {
        const raw = localStorage.getItem(OWNER_KEY);
        return raw ? (JSON.parse(raw) as Owner) : null;
    } catch {
        return null;
    }
}

export function setStoredOwner(owner: Owner): void {
    try {
        localStorage.setItem(OWNER_KEY, JSON.stringify(owner));
    } catch {
        /* ignore storage errors */
    }
}
