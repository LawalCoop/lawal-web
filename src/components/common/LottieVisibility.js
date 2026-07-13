import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";

// Wrapper de react-lottie optimizado para performance:
//  - Lazy mount: monta la animación recién cuando su contenedor entra al viewport. Un
//    contenedor display:none (ej. la variante desktop del hero cuando estás en mobile)
//    nunca intersecta → nunca se monta → no gasta CPU animando algo que no se ve.
//  - Pausa fuera de pantalla: los SVG de lottie-web animan por requestAnimationFrame en
//    el hilo principal aunque no estén a la vista (el hero hace loop infinito). Al salir
//    del viewport se pausan, liberando el main thread y evitando tirones al scrollear.
// SSR-safe: sin window / IntersectionObserver, monta y reproduce normal.
const LottieVisibility = ({ options, style, ...rest }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setMounted(true);
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Una vez montado queda montado (no re-parseamos el JSON al reentrar);
        // lo que alterna con la visibilidad es solo play/pause.
        if (entry.isIntersecting) setMounted(true);
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "150px 0px" } // arranca un toque antes de entrar, para que no se note el mount
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%", ...style }}>
      {mounted && <Lottie options={options} isPaused={!visible} {...rest} />}
    </div>
  );
};

export default LottieVisibility;
