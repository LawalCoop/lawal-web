import React from "react";
import { motion } from "motion/react";
import { riseItem } from "./variants";
import useRevealVariants from "./useRevealVariants";

// Wrapper genérico de scroll-reveal: el contenido entra al aparecer en viewport (una sola vez).
// Respeta prefers-reduced-motion vía useRevealVariants.
//
// Props:
//   variants  - variants a usar (default: riseItem)
//   amount    - fracción visible que dispara la animación (0-1, default 0.25)
//   as        - tag/elemento a renderizar (default "div")
//   ...rest   - se pasan al motion component (style, className, etc.)
const Reveal = ({
  variants = riseItem,
  amount = 0.25,
  as = "div",
  children,
  ...rest
}) => {
  const v = useRevealVariants(variants);
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={v}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
