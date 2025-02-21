import React from 'react';
import {styles} from '../../content/content.json'
import styled from 'styled-components'
import { useIntl } from "gatsby-plugin-react-intl"
import Lottie from 'react-lottie'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import homepageAnimation from '../../images/animations/ina.json'

const iluHomepage = require('../../images/illustrations/ina.png');


const setSharedStyles = (type) => {
    return `
        font-size: ${type.fontSize};
        font-weight: ${type.fontWeight};
        color: ${type.color };
        background-color: ${type.background};
        border-color: ${type.borderColor};
        box-shadow:  0px 4px 0px ${type.boxShadow};
    `
} 
const HeaderContainer = styled.div`
    background: ${styles.colors.greenLight};
    display: flex; 
    justify-content: center;
    padding: 48px 20px 50px 20px;
    background: ${styles.colors.purplePrimary};
    @media (min-width: ${styles.breakpoints.m}px) {
        padding: 75px 20px 80px 20px;
    }
    @media (min-width: ${styles.breakpoints.xl}px) {
        padding: 75px 0 80px 0px;
    }
`
const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1083px;
    @media (min-width: ${styles.breakpoints.m}px) {
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
    @media (min-width: ${styles.breakpoints.m}px) {
        flex-basis: 50%;
        align-items: flex-start;
        max-width: 560px;
        margin: 0;
        margin-right: auto;
    }
`
const ImageContainer = styled.div`
    display: none;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: block;
        flex-basis: 50%;
        max-width: 350px;
        margin-left: auto;
        text-align: right;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 611px;
    }
`

const ImageContainerMobile = styled.div`
    width: 100%;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: none;
    }
`

const SectionHeaderDescription = styled.p`
    font-size: 1.44em;
    font-weight: ${styles.fontWeight.regular};    
    line-height: 34px;
    text-align: center;
    color: ${styles.colors.white};
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 2em;
        line-height: 42px;
        text-align: left;
        min-width: 402px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 2.38em;
        line-height: 49px;
        text-align: left;
    }
`
const SectionHeaderUnderlineSpan = styled.span`
    color: ${styles.colors.white};
    font-weight: ${styles.fontWeight.bold};
    font-family: "Saira Stencil One";
`
const SectionHeaderSpan = styled.span`
    font-weight: ${styles.fontWeight.bold};
    font-family: "Saira Stencil One";
    color: ${styles.colors.white};
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 2rem;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 2.38rem;
    }
`
const SectionHeaderImg = styled.div`

    width: 100%;
    height: 450px;
    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 320px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 611px;
    }
`
const SectionHeaderImgMobile = styled.img`
    width: 100%;
    max-width: 249px;
    margin-bottom: 25px;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: none;
    }
`

const HomepageHeader = (props) => {
    const intl = useIntl();

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <InfoContainer>
                    <ImageContainerMobile>
                        <SectionHeaderImg> 
                            <DotLottieReact
                                src="/static/ina.json"
                                autoplay
                                loop
                                layout={{ fit: "fit-width", align: [0.5, 0.5]}}
                            />
                        </SectionHeaderImg>
                    </ImageContainerMobile>
                    <SectionHeaderDescription>
                        {intl.formatMessage({id: "homepage.leadLine1"})}
                        <SectionHeaderUnderlineSpan>{intl.formatMessage({id: "homepage.leadUnderlined"})}</SectionHeaderUnderlineSpan>
                        {intl.formatMessage({id: "homepage.leadLine2"})}
                        <SectionHeaderSpan>{intl.formatMessage({id: "homepage.leadBold"})}</SectionHeaderSpan>
                        {intl.formatMessage({id: "homepage.leadLine3"})}
                    </SectionHeaderDescription>

                </InfoContainer>
                <ImageContainer>
                    <SectionHeaderImg> 
                        <DotLottieReact
                            src="/static/ina.json"
                            autoplay
                            loop
                            layout={{ fit: "fit-width", align: [0.5, 0.5]}}
                        />
                    </SectionHeaderImg>
                </ImageContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default HomepageHeader;