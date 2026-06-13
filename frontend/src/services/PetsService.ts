import type { Pets } from "../models/Pets";
import { config } from "../config";

const API_URL = `${config.api.url}/api/pets`;

export interface CreatePetInput {
    name: string;
    species?: string;
    size?: string;
    breedName?: string;
    age?: number | null;
    notes?: string;
    ownerId: number;
}

export async function createPet(data: CreatePetInput): Promise<Pets> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const body = await response.json().catch(() => null);
            throw new Error(body?.message || "Error al registrar la mascota");
        }
        return await response.json();
    } catch (error) {
        console.error("Error in PetsService:", error);
        throw error;
    }
}

export async function getPets(): Promise<Pets[]> {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error fetching pets");
        return await response.json();
    } catch (error) {
        console.error("Error in PetsService:", error);
        throw error;
    }
}

export async function updatePets(id: number, data: Partial<Pets> & { breedId?: number }): Promise<Pets> {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Error updating pet");
        return await response.json();
    } catch (error) {
        console.error("Error in PetsService:", error);
        throw error;
    }
}

export async function deletePets(id: number): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error deleting pet");
    } catch (error) {
        console.error("Error in PetsService:", error);
        throw error;
    }
}