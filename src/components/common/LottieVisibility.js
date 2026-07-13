import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";

// lottie-web tiene un bug: al pausar/destruir una animación con capa de audio llama
// this.audio.pause() sobre un objeto de audio incompleto → "this.audio.pause is not a
// function". Como ahora sí pausamos los Lottie fuera de pantalla, hay que darle un audio
// no-op completo. loadAnimation usa config.audioFactory(assetPath) para construir el audio.
const silentAudio = () => ({
  play() {},
  pause() {},
  resume() {},
  stop() {},
  seek() {},
  playing() {
    return false;
  },
  rate() {},
  setVolume() {},
  volume() {},
});

// Wrapper de react-lottie optimizado para performance:
//  - Lazy mount: monta la animación recién cuando su contenedor entra al viewport. Un
//    contenedor display:none (ej. la variante desktop del hero cuando estás en mobile)
//    nunca intersecta → nunca se monta → no gasta CPU animando algo que no se ve.
//  - Pausa fuera de pantalla: los SVG de lottie-web animan por requestAnimationFrame en
//    el hilo principal aunque no estén a la vista (el hero hace loop infinito). Al salir
//    del viewport se pausan, liberando el main thread y evitando tirones al scrollear.
// SSR-safe: sin window / IntersectionObserver, monta y reproduce normal.
// Props extra:
//  - mountDelay (ms): difiere el montaje (parseo del JSON) tras entrar al viewport. En
//    páginas con transición "door", evita que ese pico sincrónico congele la apertura de
//    la puerta. Default 0 (monta apenas es visible).
//  - paused (bool): override externo de pausa (ej. controlado por hover). Se combina con
//    la visibilidad: la animación corre solo si está a la vista Y no está pausada afuera.
const LottieVisibility = ({ options, style, mountDelay = 0, paused = false, ...rest }) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      const t = setTimeout(() => { setMounted(true); setVisible(true); }, mountDelay);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    let delayTimer;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        // Una vez montado queda montado (no re-parseamos el JSON al reentrar);
        // lo que alterna con la visibilidad es solo play/pause.
        if (entry.isIntersecting && !delayTimer) {
          delayTimer = setTimeout(() => setMounted(true), mountDelay);
        }
      },
      { rootMargin: "150px 0px" } // arranca un toque antes de entrar, para que no se note el mount
    );
    io.observe(el);
    return () => { io.disconnect(); if (delayTimer) clearTimeout(delayTimer); };
  }, [mountDelay]);

  return (
    <div ref={ref} style={{ width: "100%", ...style }}>
      {mounted && (
        <Lottie
          options={{ audioFactory: silentAudio, ...options }}
          isPaused={!visible || paused}
          {...rest}
        />
      )}
    </div>
  );
};

export default LottieVisibility;
