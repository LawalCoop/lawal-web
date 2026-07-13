import { useState, useEffect } from "react";

// Hook SSR-safe para media queries. Devuelve `false` en el render de servidor y en
// la primera pintura del cliente, y se actualiza tras montar. Sirve para desactivar
// efectos pesados (ej. parallax de scroll) en pantallas chicas / mobile.
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    // addEventListener es lo moderno; addListener es el fallback para Safari viejo.
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);
  return matches;
};

export default useMediaQuery;
