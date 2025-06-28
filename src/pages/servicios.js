import React, {Fragment} from "react"
import styled from 'styled-components'
import data from '../content/content.json'
import { useTranslation } from "gatsby-plugin-react-i18next"
import FeaturedService from '../components/modules/FeaturedService'
import Button from '../components/common/Button'
import Service from '../components/modules/Service'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles, services } = data;
const { colors, breakpoints } = styles;

const MainWrapper = styled.div`
  padding-bottom: 187px;
  ${props => {
    if (props.ishomepage) {
        return `
        padding-bottom: 0;
        `
    }
  }}
  @media (min-width: ${breakpoints.m}px) {
    padding-bottom: 243px;
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
const ServicesWrapper = styled.div`
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
          margin-bottom: 14px;
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
            margin-bottom: -16px;
            `
        }
    }}
  }
`
const ServicesTitle = styled.h1`
  flex-basis: 100%;
  font-size: 2.38em;
  line-height: 49px;
  color: ${colors.white};
  margin: 0 auto 25px auto;
  text-align: center;
  @media (min-width: ${breakpoints.m}px) {
    text-align: left;
    font-size: 3em;    
    line-height: 62px;
    margin-bottom: 40px;
    ${props => {
        if (props.ishomepage) {
            return ` 
            text-align: center!important;
            `
        }
    }}
  }
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
    return (
      <MainWrapper ishomepage={props.ishomepage}>
        <ServicesContainer ishomepage={props.ishomepage}>
          <ServicesWrapper ishomepage={props.ishomepage}>
            {
                props.ishomepage ? 
                <ServicesHomeTitle ishomepage={props.ishomepage}>{t("services.title")}</ServicesHomeTitle>
                : <ServicesTitle ishomepage={props.ishomepage}>{t("services.title")}</ServicesTitle>
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
                <Btn
                  ishomepage={props.ishomepage}
                  type='btnPrimaryYellow'
                  theme={styles}
                  btnText={t("services.btnText")}
                  isLink
                  href="servicios"
                />
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