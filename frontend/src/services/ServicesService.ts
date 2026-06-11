import type { Services } from "../models/Services";
import { config } from "../config";

const API_URL = `${config.api.url}/api/services`;

export async function getServices(): Promise<Services[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener los servicios");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en ServicesService:", error);
    throw error;
  }
}