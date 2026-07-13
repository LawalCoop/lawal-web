import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'motion/react';
import data from '../../content/content.json';

const { colors } = data.styles;

// Barra de progreso de scroll, fija arriba de todo. Estilo neobrutalista:
// franja amarilla gruesa con borde negro inferior. Se queda por debajo de las
// "doors" (z 9998) para que la transición de página la tape limpiamente.
const Bar = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${colors.yellow};
    border-bottom: 2px solid #000;
    transform-origin: 0%;
    z-index: 9990;
    pointer-events: none;
`;

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    // Spring para que el avance sea fluido y no "salte" con cada evento de scroll.
    const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });
    return <Bar style={{ scaleX }} />;
};

export default ScrollProgress;
