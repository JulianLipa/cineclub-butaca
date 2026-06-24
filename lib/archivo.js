import { funcionesPasadas } from "@/data.json";

// Lista plana de todas las fotos del archivo, cada una con su función asociada.
// Es el orden por el que navega el visor (PhotoLightbox).
export const archivoFotos = funcionesPasadas.flatMap((funcion) =>
  (funcion.fotos ?? []).map((img) => ({ img, funcion })),
);

// Índice de una foto dentro de la lista global del archivo (-1 si no está).
export const getArchivoIndex = (img) =>
  archivoFotos.findIndex((p) => p.img === img);
