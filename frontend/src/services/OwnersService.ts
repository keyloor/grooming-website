import { config } from "../config";

const API_URL = `${config.api.url}/api/owners`;

export async function signupOwner(data: { name: string; email: string; phone: string; password: string; }): Promise<{ id: number; name: string; email: string; phone: string; }> {
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
