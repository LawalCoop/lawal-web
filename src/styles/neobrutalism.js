// Tokens del sistema neobrutalista de Lawal.
// Inspirado en kristi.digital / gumroad y en los principios de neubrutalism.com:
// bordes gruesos, sombras duras (blur 0, offset X=Y), esquinas apenas redondeadas,
// hover que LEVANTA (lift + sombra crece), press que HUNDE (sombra desaparece),
// acentos de color vibrantes.

export const nb = {
  border: "4px solid #000",
  borderThin: "3px solid #000",
  radius: "6px",
  // Sombras duras negras (blur 0, offset X=Y)
  shadowSm: "3px 3px 0 #000",
  shadow: "6px 6px 0 #000",
  shadowLg: "8px 8px 0 #000",
  // Acentos de marca para sombras de color / hover
  accent: "#FFBE69", // yellow (acento de marca)
  accentAlt: "#FF602C", // orangeMain (secundario)
};

// Helper: sombra dura de un color y offset dados
export const hardShadow = (offset = 6, color = "#000") =>
  `${offset}px ${offset}px 0 ${color}`;
