import React from 'react';
import styled from 'styled-components';
import Reveal from './motion/Reveal';
import { riseItem } from './motion/variants';
import { nb } from '../../styles/neobrutalism';
import data from '../../content/content.json';

// Encabezado de sección reutilizable con el lenguaje neobrutalista de Cultura:
// eyebrow (pill) + sticker rotado opcional + título grande en mayúsculas + subrayado.
// Los colores son configurables porque cada sección tiene un fondo distinto.

const { breakpoints } = data.styles;

const Head = styled.div`
    margin-bottom: 36px;
    ${(p) => p.$align === 'center' && `
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    `}
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 18px;
    ${(p) => p.$align === 'center' && `justify-content: center;`}
`;

const Eyebrow = styled.span`
    display: inline-block;
    font-size: 0.72em;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${(p) => p.$color || '#000'};
    background: ${(p) => p.$bg || nb.accent};
    border: ${nb.borderThin};
    border-radius: ${nb.radius};
    padding: 7px 15px;
    box-shadow: ${nb.shadowSm};
`;

const Sticker = styled.span`
    display: inline-block;
    transform: rotate(${(p) => p.$rot || -5}deg);
    background: ${(p) => p.$bg || '#468D81'};
    border: ${nb.borderThin};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadowSm};
    font-size: 0.66em;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 7px 13px;
    color: ${(p) => p.$color || '#fff'};
    margin-left: 12px;
`;

const Title = styled.h2`
    font-size: 2.2em;
    line-height: 0.98;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.015em;
    color: ${(p) => p.$color || '#000'};
    margin: 0;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 3.6em;
    }
`;

const Underline = styled.span`
    display: block;
    width: 96px;
    height: 11px;
    background: ${(p) => p.$bg || nb.accent};
    border: ${nb.borderThin};
    border-radius: 5px;
    box-shadow: ${nb.shadowSm};
    margin-top: 18px;
`;

const SectionIntro = ({
    eyebrow,
    sticker,
    title,
    as = 'h2',
    align = 'left',
    amount = 0.3,
    eyebrowBg,
    eyebrowColor,
    stickerBg,
    stickerColor,
    stickerRot,
    titleColor,
    underlineBg,
}) => {
    return (
        <Reveal variants={riseItem} amount={amount}>
            <Head $align={align}>
                {eyebrow && (
                    <Row $align={align}>
                        <Eyebrow $bg={eyebrowBg} $color={eyebrowColor}>{eyebrow}</Eyebrow>
                        {sticker && (
                            <Sticker $bg={stickerBg} $color={stickerColor} $rot={stickerRot}>
                                {sticker}
                            </Sticker>
                        )}
                    </Row>
                )}
                <Title as={as} $color={titleColor}>{title}</Title>
                <Underline $bg={underlineBg} />
            </Head>
        </Reveal>
    );
};

export default SectionIntro;
