import * as React from "react"
import {useIntl} from "gatsby-plugin-react-intl"
import data from '../content/content.json'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints, fontWeight } = styles;
import styled from 'styled-components'
import Button from '../components/common/Button'

const iluPage404 = require('../images/illustrations/page404.svg');

const Page404Container = styled.div`
    background: ${colors.greenLight};
    display: flex; 
    justify-content: center;
    padding: 48px 20px 142px 20px;
    background: ${colors.purpleLight};
    @media (min-width: ${breakpoints.m}px) {
        padding: 45px 20px 240px 20px;
    }
`
const Page404Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1083px;
    @media (min-width: ${breakpoints.m}px) {
        flex-direction: row-reverse;        
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
        align-items: flex-start;
        max-width: 435px;
        margin: 0;
        margin-right: auto;
        margin-top: 150px;
        margin-left: 35px;
    }
    @media (min-width: ${breakpoints.l}px) {
        max-width: 587px;
        margin-left: 4px;
    }
`
const Page404Title = styled.h1`
    font-size: 2.44em;
    font-weight: ${fontWeight.bold};
    line-height: 50px;
    margin-bottom: 7px;
    color: ${colors.purplePrimary};
    @media (min-width: ${breakpoints.m}px) {
        margin-bottom: 0;
    }

`
const Page404DescriptionContainer = styled.div`
    margin-bottom: 15px;
    @media (min-width: ${breakpoints.m}px) {
        margin-bottom: 37px;
    }
`
const Page404Description = styled.p`
    font-size: 1em;
    font-weight: ${fontWeight.regular};    
    line-height: 26px;
    text-align: center;
    color: ${colors.purplePrimary};
    @media (min-width: ${breakpoints.m}px) {
        text-align: left;
        font-size: 1.44em;
        line-height: 34px;
    }
`
const LineBreak = styled.br`
    display: block;
`
const Btn = styled(Button)`
    margin: 0px auto 15px auto;
    @media (min-width: ${breakpoints.m}px) {
        margin: 0px auto 0 0;
    }
`
const ImageContainer = styled.div`
    display: none;
    @media (min-width: ${breakpoints.m}px) {
        display: block;
        flex-basis: 50%;
        max-width: 320px;
        margin-right: auto;
        text-align: right;
    }
    @media (min-width: ${breakpoints.l}px) {
        max-width: 401px;
        margin-left: 7px;
    }
`
const Page404Img = styled.img`
    width: 100%;
    @media (min-width: ${breakpoints.m}px) {
        max-width: 320px;
    }
    @media (min-width: ${breakpoints.l}px) {
        max-width: 411px;
    }
`
const Page404ImgMobile = styled.img`
    width: 100%;
    max-width: 249px;
    margin-bottom: 25px;
    @media (min-width: ${breakpoints.m}px) {
        display: none;
    }
`

const Page404 = () => {
  const intl = useIntl();
  return (
    <Page404Container>
        <Page404Wrapper>
            <InfoContainer>
                <Page404ImgMobile
                    src={iluPage404.default}
                    alt={intl.formatMessage({id: "page404.imageAltMobile"})}
                />
                <Page404Title>{intl.formatMessage({id: "page404.title"})}</Page404Title>
                <Page404DescriptionContainer>
                    <Page404Description>{intl.formatMessage({id: "page404.descriptionLine1"})}</Page404Description>
                    <LineBreak />
                    <Page404Description>{intl.formatMessage({id: "page404.descriptionLine2"})}</Page404Description>
                </Page404DescriptionContainer>
                <Btn 
                    type='btnPrimaryPurple' 
                    theme={styles} 
                    isLink={true}
                    href="/"
                    btnText={intl.formatMessage({id: "page404.btnText"})}
                />
            </InfoContainer>
            <ImageContainer>
                <Page404Img
                    src={iluPage404.default}
                    alt={intl.formatMessage({id: "page404.imageAlt"})} 
                />
            </ImageContainer>
        </Page404Wrapper>
    </Page404Container>
  )
}

export default Page404