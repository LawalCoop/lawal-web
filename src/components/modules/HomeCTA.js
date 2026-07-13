import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import data from '../../content/content.json';
import Stagger from '../common/motion/Stagger';
import { riseItem } from '../common/motion/variants';
import Button from '../common/Button';
import DecoSticker from '../common/DecoSticker';

const { styles } = data;
const { colors, breakpoints } = styles;

// Bloque de cierre de la home: titular gigante + botón, con stickers arrastrables.
const Band = styled.section`
    position: relative;
    background: ${colors.yellow};
    border-top: 4px solid #000;
    padding: 90px 20px 150px 20px;
    overflow: hidden;
    text-align: center;
    @media (min-width: ${breakpoints.m}px) {
        padding: 130px 24px 190px 24px;
    }
`;

const Inner = styled.div`
    position: relative;
    max-width: 900px;
    margin: 0 auto;
`;

const BigTitle = styled(motion.h2)`
    font-size: 3.2em;
    line-height: 0.95;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: ${colors.purplePrimary};
    margin: 0 0 18px 0;
    text-shadow: 5px 5px 0 #fff, 8px 8px 0 #000;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 6.4em;
        text-shadow: 6px 6px 0 #fff, 10px 10px 0 #000;
    }
`;

const Sub = styled(motion.p)`
    font-size: 1.1em;
    line-height: 1.5;
    font-weight: 500;
    color: ${colors.purplePrimary};
    max-width: 560px;
    margin: 0 auto 34px auto;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 1.4em;
    }
`;

// El botón grande, centrado, con sombra dura marcada.
const BtnWrap = styled(motion.div)`
    display: inline-flex;
    a {
        font-size: 18px;
        padding: 16px 40px;
        box-shadow: 6px 6px 0 #000;
    }
    a:hover {
        box-shadow: 9px 9px 0 #000;
    }
    @media (min-width: ${breakpoints.m}px) {
        a {
            font-size: 22px;
            padding: 20px 54px;
        }
    }
`;

const HomeCTA = () => {
    const { t } = useTranslation();
    return (
        <Band>
            <Inner>
                <DecoSticker bg={colors.red} color="#fff" rot={-11} top="6px" left="6%" hideMobile>
                    {t('home_cta.sticker')}
                </DecoSticker>
                <DecoSticker bg={colors.purpleSecondary} color="#fff" rot={10} top="30px" right="7%" hideMobile>
                    {t('home_cta.sticker2')}
                </DecoSticker>

                <Stagger amount={0.4}>
                    <BigTitle variants={riseItem}>{t('home_cta.title')}</BigTitle>
                    <Sub variants={riseItem}>{t('home_cta.text')}</Sub>
                    <BtnWrap variants={riseItem}>
                        <Button
                            type="btnPrimaryPurple"
                            theme={styles}
                            isLink
                            href="mailto:info@lawal.com.ar"
                            btnText={t('home_cta.btn')}
                        />
                    </BtnWrap>
                </Stagger>
            </Inner>
        </Band>
    );
};

export default HomeCTA;
