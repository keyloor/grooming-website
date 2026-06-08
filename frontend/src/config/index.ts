import rawConfig from "./config.json";
import type { Configuration } from "./configuration";

const apiUrl = import.meta.env.VITE_API_URL ?? rawConfig.api.url;

export const config: Configuration = {
  api: { url: apiUrl },
};
