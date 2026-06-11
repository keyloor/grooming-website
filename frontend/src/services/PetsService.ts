import type { Pets } from "../models/Pets";
import { config } from "../config";

const API_URL = `${config.api.url}/api/pets`;

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