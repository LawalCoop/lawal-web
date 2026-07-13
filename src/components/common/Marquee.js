import React, { Fragment } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'motion/react';
import data from '../../content/content.json';

const { colors, breakpoints } = data.styles;

// Cinta / marquee infinito: banda con texto en mayúsculas que scrollea sin fin.
// Dos estilos:
//   - por defecto: neobrutalista fuerte (borde grueso, texto bold grande).
//   - subtle: tira fina y discreta (letra chica con tracking, gris tenue, borde fino).
const Band = styled.div`
    overflow: hidden;
    background: ${(p) => p.$bg || '#000'};
    white-space: nowrap;
    ${(p) => p.$subtle
        ? `
            padding: 10px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.10);
            border-bottom: 1px solid rgba(255, 255, 255, 0.10);
        `
        : `
            padding: 13px 0;
            border-top: 4px solid #000;
            border-bottom: 4px solid #000;
        `}
`;

const Track = styled(motion.div)`
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    will-change: transform;
`;

const Group = styled.span`
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
`;

const Item = styled.span`
    text-transform: uppercase;
    color: ${(p) => p.$color || '#fff'};
    ${(p) => p.$subtle
        ? `
            font-size: 0.8em;
            font-weight: 500;
            letter-spacing: 0.22em;
            opacity: 0.85;
            padding: 0 14px;
            @media (min-width: ${breakpoints.m}px) {
                font-size: 0.95em;
                padding: 0 22px;
            }
        `
        : `
            font-size: 1.35em;
            font-weight: 700;
            letter-spacing: 0.02em;
            padding: 0 10px;
            @media (min-width: ${breakpoints.m}px) {
                font-size: 2em;
                padding: 0 16px;
            }
        `}
`;

const Sep = styled.span`
    color: ${(p) => p.$sep || colors.yellow};
    ${(p) => p.$subtle
        ? `
            font-size: 0.6em;
            opacity: 0.7;
            padding: 0 2px;
            @media (min-width: ${breakpoints.m}px) {
                font-size: 0.7em;
            }
        `
        : `
            font-size: 1.35em;
            padding: 0 2px;
            @media (min-width: ${breakpoints.m}px) {
                font-size: 2em;
            }
        `}
`;

// Convierte el string i18n ("A ✳ B ✳ C") en items + separadores.
const Marquee = ({
    text,
    bg = '#000',
    color = '#fff',
    sep = colors.yellow,
    duration = 24,
    direction = 1,
    subtle = false,
    separator = '✳',
}) => {
    const reduce = useReducedMotion();
    const items = String(text || '').split('✳').map((s) => s.trim()).filter(Boolean);

    const group = (
        <Group>
            {items.map((it, i) => (
                <Fragment key={i}>
                    <Item $color={color} $subtle={subtle}>{it}</Item>
                    <Sep $sep={sep} $subtle={subtle}>{separator}</Sep>
                </Fragment>
            ))}
        </Group>
    );

    return (
        <Band $bg={bg} $subtle={subtle}>
            <Track
                animate={reduce ? undefined : { x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={reduce ? undefined : { duration, ease: 'linear', repeat: Infinity }}
            >
                {group}
                {group}
            </Track>
        </Band>
    );
};

export default Marquee;
