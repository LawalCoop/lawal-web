import React from 'react';
import data from '../../content/content.json'
import styled from 'styled-components'
import LottieVisibility from './LottieVisibility'
import cultureAnimation from '../../images/animations/cultura.json'
import labsAnimation from '../../images/animations/labs.json'
import { nb } from '../../styles/neobrutalism'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints, fontWeight } = styles;

const iluLabs = require('../../images/illustrations/labs.svg');
const iluCultura = require('../../images/illustrations/cultura.svg');




const HeaderContainer = styled.div`
    background: ${colors.greenLight};
    padding-bottom: 80px;
    display: flex;
    justify-content: center;
    padding: 40px 20px 50px 20px;
    margin-bottom: 0px;
    background: ${props => props.type.background};
    /* Divisor duro neobrutalista entre el hero y el cuerpo */
    border-bottom: 5px solid #000;
    @media (min-width: ${breakpoints.m}px) {
        margin-bottom: 0px;
        padding-top: 55px;
        padding-bottom: 79px;
        ${props => {
            if (props.section === 'cultura') {
                return  `max-width: 429px;
                margin-right: 17px;
                padding-bottom: 45px;`
            }
        }}
    }
`
const HeaderWrapper = styled.div`
    max-width: 946px;
    width: 100%;
    display: flex;
    flex-direction: column;
    @media (min-width: ${breakpoints.m}px) {
        flex-direction: row;
        justify-content: center;
        /* Centrar verticalmente la ilustración respecto al bloque de texto (si no, el
           Lottie ancho/bajo de labs queda pegado arriba en vez de centrado como en cultura). */
        align-items: center;
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
        max-width: 463px;
        align-items: flex-start;
        margin: 0;
        margin-right: auto;
    }
`
const ImageContainer = styled.div`
    display: none;
    @media (min-width: ${breakpoints.m}px) {
        display: block;
        flex-basis: 50%;
        max-width: 463px;
        text-align: right;
        ${props => {
            if (props.section === 'cultura') {
                return  `max-width: 429px;
                margin-right: 17px;`
            }
        }}
        ${props => {
            if (props.section === 'labs') {
                return  `
                svg {
                    width: 100%!important;
                    height: auto!important;
                }
                `
            }
        }}
    }
    @media (min-width: ${breakpoints.m}px) and (max-width: ${breakpoints.l}px){
        ${props => {
            if (props.section === 'cultura') {
                return  `
                svg {
                    width: 100%!important;
                    height: auto!important;
                }
                `
            }
        }}
    }
    
`
const SectionHeaderSubtitle = styled.h2`
    font-size: 1.44em;
    font-weight: ${fontWeight.medium};
    line-height: 34px;
    color: ${props => props.type.color};
    margin-bottom: 25px;
    ${props => {
        if (props.section === 'cultura') {
            return  `font-weight: ${fontWeight.regular};`
        }
    }}
    @media (min-width: ${breakpoints.m}px) {
        margin-bottom: 35px;
        ${props => {
            if (props.section === 'cultura') {
                return  `margin-bottom: 25px;`
            }
        }}
    }
`
const SectionHeaderTitle = styled.h1`
    font-size: 2.38em;
    font-weight: ${fontWeight.bold};
    text-align: center;
    color: ${props => props.type.color};
    margin-bottom: 25px;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 3em;
        text-align: left;
        margin-bottom: 30px;
        
    ${props => {
        if (props.section === 'cultura') {
            return  `margin-bottom: 8px;`
        }
    }}
    }
`
const SectionHeaderDescription = styled.p`
    font-size: 1em;
    line-height: 26px;
    font-weight: ${fontWeight.regular};
    color: ${props => props.type.color};

`

// Barrita de acento debajo del título (mismo lenguaje que el cuerpo)
const Underline = styled.span`
    display: block;
    width: 84px;
    height: 11px;
    background: ${nb.accent};
    border: ${nb.borderThin};
    border-radius: 5px;
    box-shadow: ${nb.shadowSm};
    margin: 0 auto 25px auto;
    @media (min-width: ${breakpoints.m}px) {
        margin: 0 0 30px 0;
    }
`

const SectionHeaderImgMobile = styled.img`
    width: 100%;
    max-width: 307px;
    margin-bottom: 27px;
    ${props => {
        if (props.section === 'cultura') {
            return  `max-width: 320px;`
        }
    }}
    @media (min-width: ${breakpoints.m}px) {
        display: none;
    }

`

const SectionHeader = (props) => {
    const getSectionAnimation = (section) => {
        switch (section) {
          case "labs":
            return labsAnimation
          case "cultura":
            return cultureAnimation
          default:
            return labsAnimation
        }
      } 
    
    const getAnimationOptions = (section) => {
      return {
        loop: false,
        autoplay: true,
        animationData: getSectionAnimation(section),
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }
    }
  
    const getHeadStyles = (type) =>{
        switch (type) {
            case "cultura" : 
                return {
                    background : colors.red,
                    color : colors.white,
                    image: iluCultura,
                 }
            case "labs" : 
                return {
                    background : colors.greenLight,
                    color : colors.white,
                    image : iluLabs
                 }
            default : 
                return {
                    background : colors.greenLight,
                    color : colors.darkMainBg,
                    image : iluLabs
                }
        }   
    }

    return (
        <HeaderContainer type={getHeadStyles(props.section)}>
            <HeaderWrapper>
                <InfoContainer>
                    <SectionHeaderTitle type={getHeadStyles(props.section)}>{props.title}</SectionHeaderTitle>
                    <Underline />
                    <SectionHeaderImgMobile section={props.section} src={getHeadStyles(props.section).image.default}></SectionHeaderImgMobile>
                    <SectionHeaderSubtitle section={props.section} type={getHeadStyles(props.section)}>{props.subtitle}</SectionHeaderSubtitle>
                    <SectionHeaderDescription type={getHeadStyles(props.section)}> {props.description} </SectionHeaderDescription>
                </InfoContainer>
                <ImageContainer section={props.section}>
                    {/* mountDelay difiere el parseo del Lottie ~1.2s para no congelar la
                        apertura de la puerta al entrar a la vista (mismo motivo que antes). */}
                    <LottieVisibility
                        options={getAnimationOptions(props.section)}
                        width="100%"
                        mountDelay={1200}
                    />
                </ImageContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default SectionHeader;
