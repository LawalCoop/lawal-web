import React, {useState} from 'react';
import data from '../../content/content.json'
import styled from 'styled-components'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useTranslation } from "gatsby-plugin-react-i18next"
import Lottie from 'react-lottie'
import {Waypoint} from 'react-waypoint'
import labsAnimation from '../../images/animations/labs.json'
import Button from '../../components/common/Button'
import { staggerContainer, riseItem } from '../common/motion/variants'
import useMediaQuery from '../common/motion/useMediaQuery'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints, fontWeight } = styles;

const HomepageLabsContainer = styled.div`
    background: ${colors.greenLight};
    display: flex; 
    justify-content: center;
    padding: 32px 20px 180px 20px;
    margin-bottom: 0px;
    //margin-top: 200px;
    background: ${colors.white};
    @media (min-width: ${breakpoints.m}px) {
        margin-bottom: 0px;
        padding-top: 81px;
        padding-bottom: 255px;
    }
`
const HomepageLabsWrapper = styled.div`
    max-width: 946px;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    @media (min-width: ${breakpoints.m}px) {
        flex-direction: row;
        justify-content: center;
        text-align: left;
        max-width: 1140px;
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
        flex-basis: 50%;
        max-width: 559px;
        align-items: flex-start;
        margin: 0;
        margin-right: auto;
    }
`
const ImageContainer = styled(motion.div)`
    display: none;
    @media (min-width: ${breakpoints.m}px) {
        display: block;
        flex-basis: 50%;
        max-width: 532px;
        text-align: right;
        margin-right: 15px;
    }

`
const HomepageLabsSubtitle = styled(motion.h3)`
    font-size: 1.72em;
    line-height: 37px;
    font-weight: ${fontWeight.bold};
    color: ${colors.greenMain};
    margin-bottom: 10px;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 2.38em;
        line-height: 49px;
    }
`
const HomepageLabsTitle = styled(motion.h2)`
    font-size: 2.38em;
    line-height: 49px;
    font-weight: ${fontWeight.bold};
    text-align: center;
    color: ${colors.darkMainBg};
    margin-bottom: 35px;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 3.33em;
        line-height: 64px;
        text-align: left;
        margin-bottom: 33px;
    }
`
// Subrayado de acento neobrutalista bajo el título.
const TitleUnderline = styled(motion.span)`
    display: block;
    width: 88px;
    height: 11px;
    background: ${colors.yellow};
    border: 3px solid #000;
    border-radius: 5px;
    box-shadow: 3px 3px 0 #000;
    margin: -22px auto 32px auto;
    @media (min-width: ${breakpoints.m}px) {
        margin: -24px 0 34px 0;
    }
`
const HomepageLabsDescription = styled(motion.p)`
    font-size: 1em;
    line-height: 26px;
    font-weight: ${fontWeight.regular};
    color: ${colors.darkMainBg};
    margin-bottom: 40px;
    @media (min-width: ${breakpoints.m}px) {
        margin-bottom: 30px;
        font-size: 1.44em;
        line-height: 34px;
    }
`
const DescriptionBold = styled.span`
    font-weight: ${fontWeight.bold};
`

const HomepageLabsImg = styled.div`
    margin-top: 98px;
    @media (min-width: ${breakpoints.m}px) {
        max-width: 400px;
        width: 100%;
    }
    @media (min-width: ${breakpoints.l}px) {
        max-width: 532px;
    }
`
const HomepageLabsImgMobile = styled(motion.img)`
    width: 100%;
    max-width: 270px;
    margin-bottom: 40px;
    @media (min-width: ${breakpoints.m}px) {
        display: none;
    }
    
`
const Btn = styled(Button)`
  /* inline-flex: botón compacto (no full-width). Sombra dura más marcada. */
  display: inline-flex;
  margin: 0px auto 15px auto;
  box-shadow: 5px 5px 0 #000;
  &:hover {
    box-shadow: 7px 7px 0 #000;
  }
  &:active {
    box-shadow: 2px 2px 0 #000;
  }
  @media (min-width: ${breakpoints.m}px) {
    margin: 0px auto 0 0;
  }
`

const HomepageLabs = (props) => {
    const [renderLottie, setRenderLottie] = useState(false)
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    // El parallax solo corre en desktop: en mobile produce tirones al scrollear sin aporte visual.
    const isDesktop = useMediaQuery(`(min-width: ${breakpoints.m}px)`);
    const parallaxOn = isDesktop && !reduce;

    // Parallax suave del Lottie según scroll (desactivado en mobile y con reduced-motion)
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const animationOptions= {
        loop: false,
        autoplay: true,
        animationData: labsAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <HomepageLabsContainer>
            <HomepageLabsWrapper>
                <InfoContainer
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerContainer}
                >
                    <HomepageLabsTitle variants={riseItem}>{t("homepageLabs.title")}</HomepageLabsTitle>
                    <TitleUnderline variants={riseItem} />
                    <HomepageLabsImgMobile
                        variants={riseItem}
                        src={require('../../images/illustrations/' + t("homepageLabs.image")).default}
                        alt={t("homepageLabs.imageAltMobile")}
                    />
                    <HomepageLabsSubtitle variants={riseItem}>{t("homepageLabs.subtitle")}</HomepageLabsSubtitle>
                    <HomepageLabsDescription variants={riseItem}>
                        {t("homepageLabs.descriptionLine1")}
                        <DescriptionBold>{t("homepageLabs.descriptionBold1")}</DescriptionBold>
                        {t("homepageLabs.descriptionComma")}
                        {t("homepageLabs.descriptionLine2")}
                        <DescriptionBold>{t("homepageLabs.descriptionBold2")}</DescriptionBold>
                        {t("homepageLabs.descriptionComma")}
                        <DescriptionBold>{t("homepageLabs.descriptionBold3")}</DescriptionBold>
                        {t("homepageLabs.descriptionLine4")}
                        <DescriptionBold>{t("homepageLabs.descriptionBold4")}</DescriptionBold>
                        {t("homepageLabs.descriptionDot")}
                    </HomepageLabsDescription>
                    <motion.div variants={riseItem} style={{ width: '100%' }}>
                        <Btn
                          type='btnPrimaryWhite'
                          theme={styles}
                          href="labs"
                          isLink
                          btnText={t("homepageLabs.btnText")}
                        />
                    </motion.div>
                </InfoContainer>
                <ImageContainer
                    style={{ y: parallaxOn ? yParallax : 0 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <HomepageLabsImg>
                        <Waypoint onEnter={()=>setRenderLottie(true)}/>
                        { renderLottie && <Lottie
                            options = {animationOptions}
                            width = "100%"/>
                        }
                    </HomepageLabsImg>
                </ImageContainer>
            </HomepageLabsWrapper>
        </HomepageLabsContainer>
    );
};

export default HomepageLabs;
