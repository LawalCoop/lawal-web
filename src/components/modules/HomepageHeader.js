import React from 'react';
import data from '../../content/content.json'
import styled from 'styled-components'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useTranslation } from "gatsby-plugin-react-i18next"
import LottieVisibility from '../common/LottieVisibility'
import homepageAnimation from '../../images/animations/ina.json'
import { staggerContainer, wordItem } from '../common/motion/variants'
import useMediaQuery from '../common/motion/useMediaQuery'
import { nb } from '../../styles/neobrutalism'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints, fontWeight } = styles;

// Palabra animada del hero (inline-block para permitir transform)
const Word = styled(motion.span)`
    display: inline-block;
    will-change: transform;
`
// Estilo de los segmentos destacados (bold + tipografía especial)
const boldWordStyle = { fontFamily: '"Saira Stencil One"', fontWeight: fontWeight.bold }

// Resaltado tipo marcador neobrutalista: sticker amarillo con borde negro.
// box-decoration-break: clone hace que el resaltado se recorte prolijo al partir en líneas.
const Marker = styled.span`
    background: ${nb.accent};
    color: #000;
    padding: 3px 10px;
    border-radius: 5px;
    border: 3px solid #000;
    box-shadow: ${nb.shadowSm};
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
`

// Divide un string en palabras animadas (conserva los espacios como tokens)
const splitWords = (text, keyPrefix, style) =>
    String(text).split(/(\s+)/).map((tok, i) =>
        tok.trim() === ""
            ? <span key={`${keyPrefix}-s${i}`}>{tok}</span>
            : <Word key={`${keyPrefix}-w${i}`} variants={wordItem} style={style}>{tok}</Word>
    )

const HeaderContainer = styled.div`
    background: ${colors.greenLight};
    display: flex; 
    justify-content: center;
    padding: 48px 20px 50px 20px;
    background: ${colors.purplePrimary};
    /* Divisor duro hacia la sección de servicios */
    border-bottom: 5px solid #000;
    @media (min-width: ${breakpoints.m}px) {
        padding: 75px 20px 80px 20px;
    }
    @media (min-width: ${breakpoints.xl}px) {
        padding: 75px 0 80px 0px;
    }
`
const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1083px;
    @media (min-width: ${breakpoints.m}px) {
        flex-direction: row;        
        align-items: center;
        justify-content: space-between;        
    }    
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;
    margin: auto;
    @media (min-width: ${breakpoints.m}px) {
        flex-basis: 50%;
        align-items: flex-start;
        max-width: 560px;
        margin: 0;
        margin-right: auto;
    }
`
const ImageContainer = styled(motion.div)`
    display: none;
    @media (min-width: ${breakpoints.m}px) {
        display: block;
        flex-basis: 50%;
        max-width: 350px;
        margin-left: auto;
        text-align: right;
    }
    @media (min-width: ${breakpoints.l}px) {
        max-width: 611px;
    }
`

const ImageContainerMobile = styled.div`
    width: 100%;
    @media (min-width: ${breakpoints.m}px) {
        display: none;
    }
`

const SectionHeaderDescription = styled(motion.p)`
    font-size: 1.44em;
    font-weight: ${fontWeight.regular};
    line-height: 44px;
    text-align: center;
    color: ${colors.white};
    @media (min-width: ${breakpoints.m}px) {
        font-size: 2em;
        line-height: 54px;
        text-align: left;
        min-width: 402px;
    }
    @media (min-width: ${breakpoints.l}px) {
        font-size: 2.38em;
        line-height: 64px;
        text-align: left;
    }
`
const SectionHeaderImg = styled.div`

    width: 100%;
    height: 450px;
    @media (min-width: ${breakpoints.m}px) {
        max-width: 320px;
    }
    @media (min-width: ${breakpoints.l}px) {
        max-width: 611px;
    }
`
const HomepageHeader = (props) => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    // El parallax solo corre en desktop: en mobile mueve el contenedor del Lottie en cada
    // frame de scroll (repintado pesado) y produce tirones, sin aportar casi nada visual.
    const isDesktop = useMediaQuery(`(min-width: ${breakpoints.m}px)`);
    const parallaxOn = isDesktop && !reduce;

    // Parallax del Lottie según el scroll (desactivado en mobile y con reduced-motion)
    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 600], [0, -80]);

    const animationOptions = {
        loop: true,
        autoplay: true,
        animationData: homepageAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <InfoContainer>
                    <ImageContainerMobile>
                        <SectionHeaderImg>
                            <LottieVisibility
                                options={animationOptions}
                                width="100%"
                            />
                        </SectionHeaderImg>
                    </ImageContainerMobile>
                    {reduce ? (
                        <SectionHeaderDescription>
                            {t("homepage.leadLine1")}{" "}
                            <Marker>{t("homepage.leadUnderlined").trim()}</Marker>{" "}
                            {t("homepage.leadLine2")}{" "}
                            <Marker>{t("homepage.leadBold").trim()}</Marker>{" "}
                            {t("homepage.leadLine3")}
                        </SectionHeaderDescription>
                    ) : (
                        <SectionHeaderDescription
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            {splitWords(t("homepage.leadLine1"), "l1")}{" "}
                            <Marker>{splitWords(t("homepage.leadUnderlined").trim(), "lu", boldWordStyle)}</Marker>{" "}
                            {splitWords(t("homepage.leadLine2"), "l2")}{" "}
                            <Marker>{splitWords(t("homepage.leadBold").trim(), "lb", boldWordStyle)}</Marker>{" "}
                            {splitWords(t("homepage.leadLine3"), "l3")}
                        </SectionHeaderDescription>
                    )}

                </InfoContainer>
                <ImageContainer style={{ y: parallaxOn ? yParallax : 0 }}>
                    <SectionHeaderImg>
                        <LottieVisibility
                            options={animationOptions}
                            width="100%"
                        />
                    </SectionHeaderImg>
                </ImageContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default HomepageHeader;
