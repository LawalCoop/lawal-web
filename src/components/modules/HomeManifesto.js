import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import data from '../../content/content.json';
import Reveal from '../common/motion/Reveal';
import { riseItem, spring } from '../common/motion/variants';
import DecoSticker from '../common/DecoSticker';
import { nb } from '../../styles/neobrutalism';

const { colors, breakpoints } = data.styles;

const Band = styled.section`
    position: relative;
    background: ${colors.purplePrimary};
    padding: 64px 20px;
    overflow: hidden;
    @media (min-width: ${breakpoints.m}px) {
        padding: 90px 24px;
    }
`;

const Inner = styled.div`
    position: relative;
    max-width: 720px;
    margin: 0 auto;
`;

// Pull-quote rotado con sombra dura (lenguaje del Quote de Cultura). Cartel compacto.
const QuoteCard = styled(motion.blockquote)`
    position: relative;
    background: ${nb.accent};
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadowLg};
    padding: 30px 24px 26px 24px;
    margin: 0;
    transform: rotate(-1.4deg);
    @media (min-width: ${breakpoints.m}px) {
        padding: 42px 44px 38px 44px;
    }
`;

// Comilla decorativa arriba a la izquierda.
const Mark = styled.span`
    position: absolute;
    top: -26px;
    left: 16px;
    font-size: 4.2em;
    line-height: 1;
    font-weight: 700;
    color: ${colors.red};
    -webkit-text-stroke: 3px #000;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 5.5em;
        top: -34px;
    }
`;

const QuoteText = styled.p`
    margin: 0;
    font-size: 1.28em;
    line-height: 1.25;
    font-weight: 700;
    color: #000;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 2.05em;
    }
`;

// Cierre / firma: "Lawal es a largo plazo." en oscuro (queda mejor que en rojo sobre el amarillo).
const Closer = styled.p`
    margin: 16px 0 0 0;
    font-size: 1.05em;
    font-weight: 700;
    color: ${colors.purplePrimary};
    @media (min-width: ${breakpoints.m}px) {
        font-size: 1.5em;
        margin-top: 22px;
    }
`;

const HomeManifesto = () => {
    const { t } = useTranslation();
    return (
        <Band>
            <Inner>
                <DecoSticker bg={colors.red} color="#fff" rot={-9} top="-18px" left="4%" hideMobile>
                    {t('home_manifesto.sticker')}
                </DecoSticker>
                <DecoSticker bg={colors.purpleLight} color="#fff" rot={8} bottom="-16px" right="6%" hideMobile>
                    🌱 {t('home_manifesto.sticker2')}
                </DecoSticker>

                <Reveal variants={riseItem} amount={0.3}>
                    <QuoteCard whileHover={{ rotate: 0, y: -4, transition: spring }}>
                        <Mark aria-hidden>“</Mark>
                        <QuoteText>{t('home_manifesto.quote')}</QuoteText>
                        <Closer>{t('home_manifesto.closer')}</Closer>
                    </QuoteCard>
                </Reveal>
            </Inner>
        </Band>
    );
};

export default HomeManifesto;
