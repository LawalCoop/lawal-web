// Presets de animación compartidos para toda la web (estilo "alto impacto").
// Se usan con Motion (motion/react). Ver Reveal.js / Stagger.js / SplitText.js.

// Springs base (para interacciones cortas: hover/tap de cards, NO para entradas).
export const spring = { type: "spring", stiffness: 420, damping: 28, mass: 0.9 };
export const springSoft = { type: "spring", stiffness: 260, damping: 30 };

// Tween de entrada acelerable por el compositor. Clave para la fluidez en mobile:
// un spring lo simula Motion en el hilo principal frame a frame, y como las entradas
// se disparan con whileInView (justo mientras scrolleás), pierde frames y se "traba".
// Un tween de transform/opacity, en cambio, Motion lo delega a la Web Animations API,
// que corre fuera del hilo principal → la entrada queda suave aunque dispare en pleno scroll.
export const revealTween = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

// Container que escalona la entrada de sus hijos
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

// Item que sube + aparece (cards, bloques de texto). Solo translate+opacity (acelerables);
// sin scale, que sobre texto grande con text-shadow obliga a re-rasterizar y agrega jank.
export const riseItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: revealTween },
};

// Palabra individual para efectos split-text (sube y aparece; el escalonado lo da el container)
export const wordItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

// Variante "plana" (solo opacity) para prefers-reduced-motion
export const fadeOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

// Palabra del hero: entra con delay creciente según su índice (custom `i`)
export const heroWord = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
  }),
};

// Hover neobrutalista: la card se LEVANTA (lift) y la sombra CRECE y se tiñe de color.
// Press: la card se HUNDE y la sombra casi desaparece (sensación de "apretado").
// Objetos para whileHover/whileTap inline.
export const cardHover = {
  x: -4,
  y: -4,
  boxShadow: "10px 10px 0 #FFBE69",
  transition: spring,
};
export const cardTap = {
  x: 2,
  y: 2,
  boxShadow: "2px 2px 0 #000",
  transition: { type: "spring", stiffness: 600, damping: 30 },
};

// Transición de página: wipe vertical con clip-path (entra de abajo→arriba, sale hacia arriba)
export const pageVariants = {
  initial: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  enter: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
  },
  exit: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
    transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] },
  },
};
