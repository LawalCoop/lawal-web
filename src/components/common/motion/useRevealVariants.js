import { useReducedMotion } from "motion/react";
import { fadeOnly } from "./variants";

// Devuelve las variants pedidas, o una versión "solo opacity" (fadeOnly)
// cuando el usuario tiene prefers-reduced-motion activado.
// Centraliza el respeto a la accesibilidad para todos los componentes de reveal.
export default function useRevealVariants(variants) {
  const reduce = useReducedMotion();
  return reduce ? fadeOnly : variants;
}
