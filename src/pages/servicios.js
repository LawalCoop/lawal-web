import React, {Fragment} from "react"
import styled from 'styled-components'
import { motion } from 'motion/react'
import data from '../content/content.json'
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import FeaturedService from '../components/modules/FeaturedService'
import Button from '../components/common/Button'
import Service from '../components/modules/Service'
import SectionIntro from '../components/common/SectionIntro'
import Reveal from '../components/common/motion/Reveal'
import SplitText from '../components/common/motion/SplitText'
import { staggerContainer, riseItem } from '../components/common/motion/variants'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles, services } = data;
const { colors, breakpoints } = styles;

const MainWrapper = styled.div`
  /* El featured "capacitación" (InfoContainer absoluto) desborda su contenedor y el
     footer de contacto se solapa 163px hacia arriba; dejamos aire extra para que no
     queden pegados. */
  padding-bottom: 270px;
  ${props => {
    if (props.ishomepage) {
        return `
        padding-bottom: 0;
        `
    }
  }}
  @media (min-width: ${breakpoints.m}px) {
    padding-bottom: 350px;
    ${props => {
      if (props.ishomepage) {
          return `
          padding-bottom: 0;
          `
      }
    }}
  }
`
const ServicesContainer = styled.div`
  background-color: ${colors.purpleLight};
  padding: 40px 20px 200px 20px;
  ${props => {
    if (props.ishomepage) {
        return `
        padding-bottom: 177px;
        text-align: center;
        `
    }
  }}
  @media (min-width: ${breakpoints.m}px) {
    padding-bottom: 155px;
    ${props => {
      if (props.ishomepage) {
          return `
          padding-top: 60px;
          padding-bottom: 220px;
          `
      }
    }}
  }
  @media (min-width: ${breakpoints.lpx}) {
    padding-top: 55px;
    padding-left: 0;
    padding-right: 0;
  }
`
const ServicesWrapper = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    max-width: 946px;
    justify-content: space-between;
    margin: auto;
    ${props => {
        if (props.ishomepage) {
            return ` 
            display: inline-flex;
            max-width: unset;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 1102px;
              gap: 24px;
              margin-bottom: 34px;
            @media (min-width: ${breakpoints.m}px) {
              gap: 56px;
              margin-bottom: 50px;
            }
            @media (min-width: ${breakpoints.xl}px) {
                justify-content: flex-start;
            }
            `
        }
    }}
`
// En la home, título + underline van juntos en un contenedor para que el `gap`
// del flex (grande) no los separe; el grupo entero es un item de fila completa.
const ServicesHomeHead = styled.div`
  flex-basis: 100%;
  width: 100%;
  text-align: center;
  @media (min-width: ${breakpoints.m}px) {
    margin-bottom: -16px;
  }
`
// Barrita de acento neobrutalista bajo el título (igual que Cultura/Labs en la home).
const ServicesHomeUnderline = styled(motion.span)`
  display: block;
  width: 88px;
  height: 11px;
  background: ${colors.yellow};
  border: 3px solid #000;
  border-radius: 5px;
  box-shadow: 3px 3px 0 #000;
  margin: 14px auto 26px auto;
`
const ServicesHomeTitle = styled.h2`
  flex-basis: 100%;
  font-size: 2.38em;
  line-height: 49px;
  color: ${colors.white};
  margin: 0 auto 25px auto;
  text-align: center;
  ${props => {
      if (props.ishomepage) {
          return `
          margin-bottom: 0;
          `
      }
  }}
  @media (min-width: ${breakpoints.m}px) {
    text-align: left;
    font-size: 3em;
    line-height: 62px;
    margin-bottom: 40px;
    ${props => {
        if (props.ishomepage) {
            return `
            text-align: center!important;
            font-size: 3.33em;
            line-height: 62px;
            margin-bottom: 0;
            `
        }
    }}
  }
`
// En la página /servicios el encabezado usa el lenguaje neobrutalista de Cultura
// (SectionIntro). Ocupa el ancho completo dentro del wrapper flex del grid.
const ServicesHeadCell = styled.div`
  flex-basis: 100%;
  width: 100%;
`
const Btn = styled(Button)`
    //display: none;
    width: max-content;
    ${props => {
      if (props.ishomepage) {
          return `
          display: flex;
          margin: 0 auto;
          @media (min-width: ${breakpoints.m}px) {
            margin: 35px auto 0 auto;
          }
          `
      }
    }}
    @media (min-width: ${breakpoints.m}px) {
      //display: none;
      ${props => {
        if (props.ishomepage) {
            return `
            display: flex;
            margin: 0 auto 15px auto;
            `
        }
      }}
    }
`

const Services = (props) => {

    const { t } = useTranslation();
    // El grid solo escalona su entrada en la homepage (en /servicios es lista vertical).
    const staggerProps = props.ishomepage
      ? {
          variants: staggerContainer,
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, amount: 0.15 },
        }
      : {};
    return (
      <MainWrapper ishomepage={props.ishomepage}>
        <ServicesContainer ishomepage={props.ishomepage}>
          <ServicesWrapper ishomepage={props.ishomepage} {...staggerProps}>
            {
                props.ishomepage ?
                <ServicesHomeHead>
                  <ServicesHomeTitle ishomepage={props.ishomepage}>
                    <SplitText text={t("services.title")} />
                  </ServicesHomeTitle>
                  <ServicesHomeUnderline variants={riseItem} />
                </ServicesHomeHead>
                : <ServicesHeadCell>
                    <SectionIntro
                      as="h1"
                      title={t("services.title")}
                      eyebrow={t("services.eyebrow")}
                      sticker={t("services.sticker")}
                      eyebrowBg={colors.yellow}
                      eyebrowColor={colors.darkMainBg}
                      stickerBg={colors.red}
                      stickerColor={colors.white}
                      stickerRot={-4}
                      titleColor={colors.white}
                      underlineBg={colors.yellow}
                    />
                  </ServicesHeadCell>
            }
            <Fragment>
              {services.services.map( (service) =>{
                return(
                  <Service
                    ishomepage={props.ishomepage}
                    key = {service.id}
                    image = {service.image}
                    id = {service.id}
                    service = {service}
                    styles = {styles}
                  >
                  </Service>
                )
              })}
            </Fragment>
            {
                props.ishomepage ?
                <FeaturedService ishomepage={props.ishomepage}>{t("services.title")}</FeaturedService>
                : ""
            }
          </ServicesWrapper>
          {
            props.ishomepage &&
                <Reveal amount={0.4}>
                  <Btn
                    ishomepage={props.ishomepage}
                    type='btnPrimaryYellow'
                    theme={styles}
                    btnText={t("services.btnText")}
                    isLink
                    href="servicios"
                  />
                </Reveal>
          }
        </ServicesContainer>
        {
          props.ishomepage ? 
          ""
          : <FeaturedService /> 
        }
      </MainWrapper>
  );
};

export default Services;

export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
