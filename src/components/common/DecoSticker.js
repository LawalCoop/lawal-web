import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import data from '../../content/content.json';

const { breakpoints } = data.styles;

// Sticker decorativo rotado, arrastrable (Motion drag) y con vuelta al origen.
// Neobrutalista: borde grueso, sombra dura. Se posiciona absolute respecto a un
// contenedor con position: relative.
const Sticker = styled(motion.div)`
    position: absolute;
    z-index: 4;
    background: ${(p) => p.$bg};
    color: ${(p) => p.$color || '#000'};
    border: 3px solid #000;
    border-radius: 8px;
    box-shadow: 4px 4px 0 #000;
    padding: 8px 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.72em;
    white-space: nowrap;
    cursor: grab;
    user-select: none;
    touch-action: none;
    &:active {
        cursor: grabbing;
    }
    /* En pantallas chicas se ocultan los que quedan muy al borde para evitar solaparse. */
    ${(p) => p.$hideMobile && `
        display: none;
        @media (min-width: ${breakpoints.m}px) {
            display: block;
        }
    `}
`;

const DecoSticker = ({
    children,
    bg,
    color,
    rot = -6,
    top,
    left,
    right,
    bottom,
    hideMobile = false,
}) => {
    return (
        <Sticker
            $bg={bg}
            $color={color}
            $hideMobile={hideMobile}
            style={{ top, left, right, bottom, rotate: rot }}
            drag
            dragSnapToOrigin
            dragElastic={0.35}
            whileHover={{ scale: 1.06 }}
            whileDrag={{ scale: 1.12, rotate: 0, boxShadow: '7px 7px 0 #000' }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
            {children}
        </Sticker>
    );
};

export default DecoSticker;
