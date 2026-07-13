import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { staggerContainer, wordItem } from "./variants";

// Divide un string en palabras y las anima una por una al entrar en viewport.
// Robusto para i18n (divide por palabra, no por caracter). Con prefers-reduced-motion
// renderiza el texto plano sin animar.
//
// Props:
//   text    - string a animar
//   as      - tag del wrapper (default "span")
//   amount  - fracción visible que dispara (default 0.6)
//   ...rest - className, style, etc.
const SplitText = ({ text, as = "span", amount = 0.6, className, style, ...rest }) => {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.span;

  if (reduce) {
    return (
      <Comp className={className} style={style} {...rest}>
        {text}
      </Comp>
    );
  }

  // split conservando los espacios como tokens para no perder el interletrado
  const tokens = String(text).split(/(\s+)/);

  return (
    <Comp
      className={className}
      style={{ display: "inline-block", ...style }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer}
      {...rest}
    >
      {tokens.map((tok, i) =>
        tok.trim() === "" ? (
          <span key={i}>{tok}</span>
        ) : (
          <motion.span
            key={i}
            variants={wordItem}
            style={{ display: "inline-block", willChange: "transform" }}
          >
            {tok}
          </motion.span>
        )
      )}
    </Comp>
  );
};

export default SplitText;
