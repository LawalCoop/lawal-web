import React from "react";
import { motion } from "motion/react";
import { staggerContainer } from "./variants";

// Container que escalona la entrada de sus hijos al aparecer en viewport.
// Los hijos deben usar variants={riseItem} (o similar con estados "hidden"/"visible")
// SIN initial/animate propios: heredan el estado del container.
//
// Props:
//   amount  - fracción visible que dispara (default 0.2)
//   as      - tag a renderizar (default "div")
//   ...rest - se pasan al motion component
const Stagger = ({ amount = 0.2, as = "div", children, ...rest }) => {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Stagger;
