import { useMotionValue, useSpring, useTransform } from 'motion/react';

// Tilt magnético: la card se inclina en 3D siguiendo la posición del mouse.
// Devuelve motion values (rotateX/rotateY) + handlers para el contenedor.
// Uso:
//   const tilt = useTilt();
//   <motion.div style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformPerspective: 800 }}
//              onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.reset} />
export function useTilt(max = 7) {
    // Posición normalizada del mouse dentro de la card (-0.5 a 0.5).
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const spr = { stiffness: 250, damping: 18, mass: 0.4 };
    const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spr);
    const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spr);

    const onMouseMove = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
    };
    const reset = () => {
        px.set(0);
        py.set(0);
    };

    return { rotateX, rotateY, onMouseMove, reset };
}

export default useTilt;
