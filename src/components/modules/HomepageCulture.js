import React, {useState} from 'react';
import data from '../../content/content.json'
import styled from 'styled-components'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useTranslation } from "gatsby-plugin-react-i18next"
import Lottie from 'react-lottie'
import {Waypoint} from 'react-waypoint'
import cultureAnimation from '../../images/animations/cultura.json'
import Button from '../../components/common/Button'
import { staggerContainer, riseItem } from '../common/motion/variants'
import useMediaQuery from '../common/motion/useMediaQuery'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints, fontWeight } = styles;

const HomepageCultureContainer = styled.div`
    position: relative;
    background: ${colors.greenLight};
    display: flex; 
    justify-content: center;
    padding: 0px 20px 35px 20px;
    margin-bottom: 0px;
    background: ${colors.purplePrimary};
    @media (min-width: ${breakpoints.m}px) {
        margin-bottom: 0px;
        padding-top: 0px;
        padding-bottom: 90px;
    }
`
const HomepageCultureWrapper = styled.div`
    max-width: 946px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    @media (min-width: ${breakpoints.m}px) {
        text-align: left;
        max-width: 959px;
    }
`
const InfoContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 320px;
    margin: auto;
    @media (min-width: ${breakpoints.m}px) {
        align-items: flex-start;
        flex-basis: 100%;
        max-width: 657px;
        margin-left: auto;
        margin-right:0;
        margin-top: 10px;
        text-align: left;
    }
    @media (min-width: ${breakpoints.l}px) {
        margin-top: -22px;
    }
`
const HomepageCultureTitle = styled(motion.h2)`
    font-size: 2.38em;
    line-height: 49px;
    font-weight: ${fontWeight.bold};
    text-align: center;
    color: ${colors.white};
    margin-bottom: 23px;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 3.33em;
        line-height: 64px;
        text-align: left;
        margin-bottom: 18px;
    }
`
// Subrayado de acento neobrutalista bajo el título (amarillo, visible sobre fondo oscuro).
const TitleUnderline = styled(motion.span)`
    display: block;
    width: 88px;
    height: 11px;
    background: ${colors.yellow};
    border: 3px solid #000;
    border-radius: 5px;
    margin: 0 auto 26px auto;
    @media (min-width: ${breakpoints.m}px) {
        margin: 0 0 30px 0;
    }
`
const HomepageCultureDescription = styled(motion.p)`
    font-size: 1em;
    line-height: 26px;
    font-weight: ${fontWeight.regular};
    color: ${colors.white};
    margin-bottom: 40px;
    @media (min-width: ${breakpoints.m}px) {
        margin-bottom: 26px;
        font-size: 1.44em;
        line-height: 34px;
    }
`
// Resalte tipo "marker" como los del hero, pero más chico y en naranja
// (contrasta sobre el fondo oscuro y se diferencia del amarillo de los títulos).
const Marker = styled.span`
    background: ${colors.orangeMain};
    color: #000;
    font-weight: ${fontWeight.bold};
    padding: 1px 7px;
    border: 2px solid #000;
    border-radius: 4px;
    box-shadow: 2px 2px 0 #000;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
`
const ImageContainer = styled(motion.div)`
    margin: -105px auto 8px auto;
    max-width: 314px;
    @media (min-width: ${breakpoints.m}px) {
        max-width: 400px;
        flex-basis: 100%;
        margin: unset;
        margin-top: -220px;
    }
    @media (min-width: ${breakpoints.l}px) {
        max-width: 548px;
    }
    
`
const HomepageCultureBird = styled(motion.img)`
    display: none;
    @media (min-width: ${breakpoints.m}px) {
        position: absolute;
        display: block;
        top: -52px;
        right: 50px;
        width: 47.45px;
    }
`
const HomepageCultureImg = styled.div`
    width: 100%;
`
const Btn = styled(Button)`
  /* inline-flex: que no se estire a full-width dentro del contenedor. */
  display: inline-flex;
  margin: 0px auto 15px auto;
  /* Sombra dura AMARILLA: la negra es invisible sobre el fondo oscuro de la sección. */
  box-shadow: 5px 5px 0 ${colors.yellow};
  &:hover {
    box-shadow: 7px 7px 0 ${colors.yellow};
  }
  &:active {
    box-shadow: 2px 2px 0 ${colors.yellow};
  }
  @media (min-width: ${breakpoints.m}px) {
    margin: 0px auto 0 0;
  }
`

const HomepageCulture = (props) => {
    const [renderLottie, setRenderLottie] = useState(false)
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    // El parallax solo corre en desktop: en mobile este Lottie SÍ es visible y moverlo en
    // cada frame de scroll lo repinta entero → tirones. Se apaga en mobile y reduced-motion.
    const isDesktop = useMediaQuery(`(min-width: ${breakpoints.m}px)`);
    const parallaxOn = isDesktop && !reduce;

    // Parallax suave del Lottie según scroll (desactivado en mobile y con reduced-motion)
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

    const animationOptions= {
        loop: false,
        autoplay: true,
        animationData: cultureAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    }


    return (
        <HomepageCultureContainer>
            <HomepageCultureBird
                src={require('../../images/illustrations/bird.svg').default}
                alt={t("homepageCulture.birdImageAlt")}
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <HomepageCultureWrapper>
                <ImageContainer
                    style={{ y: parallaxOn ? yParallax : 0 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <HomepageCultureImg>
                        <Waypoint onEnter={()=>setRenderLottie(true)}/>
                        { renderLottie && <Lottie
                            options = {animationOptions}
                            width = "100%"/>
                        }
                    </HomepageCultureImg>
                </ImageContainer>
                <InfoContainer
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={staggerContainer}
                >
                    <HomepageCultureTitle variants={riseItem}>{t("homepageCulture.title")}</HomepageCultureTitle>
                    <TitleUnderline variants={riseItem} />
                    <HomepageCultureDescription variants={riseItem}>
                        {t("homepageCulture.descriptionLine1")}
                        <Marker>{t("homepageCulture.underlinedText")}</Marker>
                        {t("homepageCulture.descriptionLine2")}
                    </HomepageCultureDescription>
                    <motion.div variants={riseItem} style={{ width: '100%' }}>
                        <Btn
                          type='btnPrimaryWhite'
                          theme={styles}
                          href="cultura"
                          isLink
                          btnText={t("homepageCulture.btnText")}
                        />
                    </motion.div>
                </InfoContainer>
            </HomepageCultureWrapper>
        </HomepageCultureContainer>
    );
};

export default HomepageCulture;
