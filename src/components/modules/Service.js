import React, {useState} from 'react';
import styled from 'styled-components'
import data from '../../content/content.json'
import Tags from '../common/Tags'
import Button from '../common/Button'
import { useIntl, Link } from "gatsby-plugin-react-intl"
import Lottie from 'react-lottie';
import { Waypoint } from 'react-waypoint';

const styles = data.styles

const ServiceWrapper = styled.div`
    background: ${styles.colors.white};    
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    max-width: 320px;
    padding: 20px 20px 30px 20px;
    margin-top: 0px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    min-width: unset;
    flex-basis: 100%;
    &:last-of-type {
        margin-bottom: 61px;
        ${props => {
            if (props.isHome) {
                return ` 
                margin-bottom: 30px;
                `
            }
        }}
    }
    @media (min-width: ${styles.breakpoints.m}px) {
        flex-direction: row;
        padding: 30px 45px 30px 67px;
        max-width: 946px;
        &:last-of-type {
            margin-bottom: 87px;
        }
    }
    
    ${props => {
        if (props.isHome) {
            return `
            display: flex!important;   
            flex-direction: column!important;
            padding: 0;
            margin-bottom: 0;
            margin: 0;
            @media (min-width: ${styles.breakpoints.m}px) {
                min-width: 330px;                
                margin-bottom: 50px;
                padding: 0;
                &:last-of-type {
                    margin-bottom: 0px;
                }
                min-width: unset;
                max-width: 330px; 
                flex-basis: 50%;
                margin: 0;
                &:hover {
                    outline: solid 3px ${styles.colors.purplePrimary};
                }
                @media (min-width: ${styles.breakpoints.l}px) {
                    flex-basis: 33.33%;
                }
            }
            `
        }
    }}

`
const ServiceLink = styled(Link)`
    padding: 18px 20px 22px 20px;
    @media (min-width: ${styles.breakpoints.m}px) {
        padding: 15px 20px 25px 20px;
    }
    width: 100%;
    text-decoration: none; 
`
const LeftBlock = styled.div`
    order: 3;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: flex;
        order: unset;
        flex-direction: column;
        flex-basis: 45%;
        align-items: flex-start;        
        margin-right: 3px;
    }
    ${props => {
        if (props.isHome) {
            return `       
            margin-right: 0px!important;
            `
        }
    }}
`
const RightBlock = styled.div`
    order: 2;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: flex;
        order: unset;
        flex-direction: column;
        flex-basis: 60%;
        margin-left: 40px;
    }
    ${props => {
        if (props.isHome) {
            return ` 
            margin-left: 0!important;
            `
        }
    }}
`

const TextContainer = styled.div`
`
const ServiceTitle = styled.h3`
    font-size: 1.44em;
    color: ${styles.colors.purplePrimary};
    margin: 0px 0px 18px 0;
    text-align: center;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 2.11em;
        text-align: left;
        padding-top: 8px;
        margin-top: 0;
    }
    ${props => {
        if (props.isHome) {
            return ` 
            margin-bottom: 0;
            padding-top: 0!important;
            font-size: 1.44em!important;
            text-align: center!important;
            margin-top: 0;
            @media (min-width: ${styles.breakpoints.m}px) {
                margin-top: 30px!important;
                margin-top: 10px!important;
            }
            `
        }
    }}
`
const ServiceDescription = styled.p`
    font-size: 0.88em;
    line-height: 22px;
    color: ${styles.colors.darkMainBg};
    margin-bottom: 25px;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 1em;
        line-height: 26px;
        margin-bottom: auto;
        padding-bottom: 35px;
    }
    ${props => {
        if (props.isHome) {
            return ` 
            display: none;
            `
        }
    }}
`

const TagsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: 15px;
    margin-bottom: 0;
    ${props => {
        if (props.isHome) {
            return ` 
            display: none!important;
            `
        }
    }}
`
const TagsTitle = styled.h4`
    font-size: 0.88em;
    color: ${styles.colors.purplePrimary};
    margin-bottom: 23px;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 1em;
        line-height: 24px;
        margin-bottom: 15px;
        margin-top: 25px;
    }
`
const ImageContainer = styled.div`
    display: none;
    max-width: 200px;
    margin: auto;
    order: 1;
    @media (min-width: ${styles.breakpoints.m}px) {
        order: unset;
        margin-left: 0;
        margin-right: auto;
        margin-bottom: auto;
        margin-bottom: 0;
        margin-top: 0;
        max-width: 330px;
        width: 100%;
        display: flex;
    }
    ${props => {
        if (props.isHome) {
            return ` 
            margin-left: auto!important;
            `
        }
    }}
` 
const Tag = styled(Tags)`
`

const ImageContainerMobile = styled.div`
    display: flex;
    max-width:290px;
    margin: auto;
    order: 1;
    display: flex;
    margin-bottom: 0px;
    margin-top: 0;
    //max-width: unset!important;
    @media (min-width: ${styles.breakpoints.m}px) {
        display: none;
        order: unset;
        margin-left: 0;
        margin-right: auto;
        margin-bottom: auto;
        margin-top: 0;
    }
`
const ServiceImage = styled.div`
    pointer-events: none;
    width: 100%;
    max-height: 170px;
    text-align: center;

    @media (min-width: ${styles.breakpoints.m}px) {
        max-height: 300px;
        div svg {
            height: auto;
            width: 100%!important;
            max-height: 300px!important;
        }
    }
    ${props => {
        if (props.isHome) {
            return `
            max-height: 160px;
            div {
             height: 100%;
             width: 100%!important;   
            }
            @media (min-width: ${styles.breakpoints.m}px) {
                max-height: 134px;
                max-height: 175px;
            }
            div svg {
             width: auto!important;   
            }
            `
        }
    }}
`

const BtnMobile = styled(Button)`
        margin-top: 26px!important;
        display: none;
        display: flex;
        margin-left: 0;
        max-width: max-content;
        /*
        Este componente no se muestra porque todavía no está lista la landing page de cada servicio. 
        Cuando estén listas hay que comentar o eliminar únicamente el display none que está debajo de este comentario.
        */
        display: none;
        
    @media (min-width: ${styles.breakpoints.m}px) {
        display: none;
    }
    ${props => {
        if (props.isHome) {
            return ` 
            display: none;
            `
        }
    }}
`
const Btn = styled(Button)`
    display: none;
    max-width: max-content;
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-top: auto!important;
        margin-bottom: 35px;
        display: flex;
        display: flex;
        /*
        Este componente no se muestra porque todavía no está lista la landing page de cada servicio.
        Cuando estén listas hay que comentar o eliminar únicamente el display none que está debajo de este comentario.
        */
        display: none;
        ${props => {
            if (props.isHome) {
                return ` 
                display: none;
                `
            }
        }}
    }
    ${props => {
        if (props.isHome) {
            return ` 
            display: none;
            `
        }
    }}
`

const Service = (props) => {
    const [renderLottie, setRenderLottie] = useState(false)
    const service = props.service;
    const intl = useIntl();
    return (
        props.isHome ? 
        <ServiceWrapper isHome={props.isHome}>
            <ServiceLink
                isHome={props.isHome}
                theme={styles}
                /*
                Cuando estén listas las landings individuales de cada servicio hay que descomentar este atributo, comentar el que está debajo (to='servicios') y
                reemplazar service.link en los archivos de idiomas con el link que corresponda.
                
                to={'/' + intl.formatMessage({id: `${props.id}.link`})}
                */                
                to='/servicios'
            >
                <Waypoint onEnter={()=>setRenderLottie(true)} />
                <ImageContainerMobile>
                    <ServiceImage 
                        isHome={props.isHome}>
                        {renderLottie && <Lottie
                            options = {props.animationOptions}
                            width = "70%"
                        />}
                    </ServiceImage>
                </ImageContainerMobile>
                <LeftBlock isHome={props.isHome}>
                    <ImageContainer isHome={props.isHome}>
                        <ServiceImage isHome={props.isHome}>
                            <Lottie
                                options = {props.animationOptions}
                                width = "100%"
                            />
                        </ServiceImage>
                    </ImageContainer>
                    <TagsContainer isHome={props.isHome}>
                        <TagsTitle>{intl.formatMessage({id: "services.tagsTitle"})}</TagsTitle>
                        <Tag
                            tagsType="services"
                            tags={service.tags}
                            styles={props.styles} 
                        />
                    </TagsContainer>
                    <BtnMobile
                        isHome={props.isHome}
                        type='btnPrimaryPurple'
                        theme={styles}
                        //href={intl.formatMessage({id: `${props.id}.link`})}
                        href='servicios'
                        isLink
                        btnText={intl.formatMessage({id: "button.verMas"})}
                    />
                </LeftBlock>
                <RightBlock isHome={props.isHome}>
                    <TextContainer>
                        <ServiceTitle isHome={props.isHome}>{intl.formatMessage({id:`${props.id}.service`})}</ServiceTitle>
                        <ServiceDescription isHome={props.isHome}>{intl.formatMessage({id: `${props.id}.description`})}</ServiceDescription>
                    </TextContainer>
                    <Btn
                        isHome={props.isHome}
                        type='btnPrimaryPurple'
                        theme={styles}
                        href={intl.formatMessage({id: `${props.id}.link`})}
                        isLink
                        btnText={intl.formatMessage({id: "button.verMas"})}
                    />
                </RightBlock>
            </ServiceLink>
        </ServiceWrapper>
        :
        <ServiceWrapper isHome={props.isHome}>
            <Waypoint onEnter={()=>setRenderLottie(true)} />
            <ImageContainerMobile>
                    <ServiceImage 
                        isHome={props.isHome}>
                        {renderLottie && <Lottie
                            options = {props.animationOptions}
                            width = "70%"
                        />}
                    </ServiceImage>
            </ImageContainerMobile>
            <LeftBlock>
                <ImageContainer isHome={props.isHome}>
                    <ServiceImage isHome={props.isHome}>
                        <Lottie
                            options = {props.animationOptions}
                            width = "100%"
                        />
                    </ServiceImage>
                </ImageContainer>
                <TagsContainer isHome={props.isHome}>
                    <TagsTitle>{intl.formatMessage({id: "services.tagsTitle"})}</TagsTitle>
                    <Tag
                        tagsType="services"
                        tags={service.tags}
                        styles={props.styles} 
                    />
                </TagsContainer>
                <BtnMobile
                    type='btnPrimaryPurple'
                    theme={styles}
                    href={intl.formatMessage({id: `${props.id}.link`})}
                    btnText={intl.formatMessage({id: "button.verMas"})}
                    isHome={props.isHome}
                    isLink
                />
            </LeftBlock>
            <RightBlock isHome={props.isHome}>
                <TextContainer>
                    <ServiceTitle isHome={props.isHome}>{intl.formatMessage({id:`${props.id}.service`})}</ServiceTitle>
                    <ServiceDescription isHome={props.isHome}>{intl.formatMessage({id: `${props.id}.description`})}</ServiceDescription>
                </TextContainer>
                <Btn type='btnPrimaryPurple' 
                    theme={styles} 
                    href={intl.formatMessage({id: `${props.id}.link`})}
                    isLink
                    btnText={intl.formatMessage({id: "button.verMas"})}
                    isHome={props.isHome}
                />
            </RightBlock>
        </ServiceWrapper>
    )
}

export default Service;