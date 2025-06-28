import React from 'react';
import styled from 'styled-components'
import data from '../../content/content.json'
import { useTranslation, Link } from "gatsby-plugin-react-i18next"
import Button from '../common/Button'


const styles = data.styles

const RelatedPostsContainer = styled.div`
    border-top: 1px solid ${styles.colors.darkGrey};
    padding-top: 25px;
    @media (min-width: ${styles.breakpoints.m}px) {
        padding-top: 33px;
    }
`
const RelatedPostThumbnailWrapper = styled.div`
    margin-bottom: 50px;
    max-width: 300px;
    flex-basis: 100%;
    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 300px;
        flex-basis: unset;
        margin-bottom: 35px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 300px;
    }
` 

const RelatedPostThumbnailImageWrapper = styled.div`
    //overflow: hidden;
    height: 230px;
    border-radius: 6px;
    margin-bottom: 15px;
    background-image: url('${require('../../images/blogThumbnail.png').default}');
    background-position: top left;
    background-size: cover;
`
const RelatedPostThumbnailImage = styled.img`
    border-radius: 6px;
    margin-bottom: 10px;
    height: 100%;
    width: 100%;
    object-fit:cover;
    display: none;
`
const RelatedPostThumbnailTitle = styled.h3`
    font-size: 1.16em;
    line-height: 27px;
    color: ${styles.colors.darkMainBg};
    font-weight: ${styles.fontWeight.bold};
    margin-bottom: 15px;    
    @media (min-width: ${styles.breakpoints.m}px) {
       margin-bottom: 9px;
    }
`
const RelatedPostThumbnailDescription =styled.p`
    font-size: .88em;
    line-height: 20px;
    margin-bottom: 20px;
    color: ${styles.colors.darkGrey};
    max-height: 60px;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    box-orient: vertical;  
    -webkit-box-orient: vertical;  
    overflow: hidden;
}

    @media (min-width: ${styles.breakpoints.ml}px) {
        margin-bottom: 15px;
    }
`
const BtnContainer =  styled.div`
    display: flex;
    flex-wrap: wrap;
`
const Btn =  styled(Button)`
    font-size: .88em;
    margin: 0;
    padding: 6px 12px;
    box-shadow: none;
    border-radius: 10px;
    &:hover {
        box-shadow: 0px 3px 0px ${styles.colors.lightGrey};
    }
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: .77em;
        padding: 7px 15px;
    }
`

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    //padding-top: 25px;
    margin-bottom: 0px;
    display: inline-flex;
    gap: 10px;
    @media (min-width: ${styles.breakpoints.m}px) {
        gap: 23px;
    }
`
const TagsTitle = styled.h4`
    font-size: .72em;
    margin-bottom: 18px;
    color: ${styles.colors.purplePrimary}!important;
    font-weight: ${styles.fontWeight.medium};
    flex-basis: 100%;
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 20px;
    }
`

const RelatedPosts = (props) => {
    const { t } = useTranslation();

    return (
        <RelatedPostsContainer>
            <TagsTitle>Artículos relacionados</TagsTitle>
            <TagsContainer>
                <RelatedPostThumbnailWrapper>
                    <RelatedPostThumbnailImageWrapper>
                        <RelatedPostThumbnailImage
                            src={require(`../../images/blogThumbnail.png`).default}
                            alt=""
                        />
                    </RelatedPostThumbnailImageWrapper>
                    <RelatedPostThumbnailTitle>Experiencia de Intercooperación</RelatedPostThumbnailTitle>
                    <RelatedPostThumbnailDescription>En Fiqus comenzamos este 2020 con una gran experiencia de trabajo e intercooperación y comenzamos este 2020 con una gran experiencia de trabajo e intercooperación.</RelatedPostThumbnailDescription>
                    <BtnContainer>
                        <Btn
                        type='btnSecondary'
                        theme={styles}
                        isLink
                        href="#"
                        btnText='leer'
                        />
                    </BtnContainer>
                </RelatedPostThumbnailWrapper>
                <RelatedPostThumbnailWrapper>
                    <RelatedPostThumbnailImageWrapper>
                        <RelatedPostThumbnailImage
                            src={require(`../../images/blogThumbnail.png`).default}
                            alt="" 
                        />
                    </RelatedPostThumbnailImageWrapper>
                    <RelatedPostThumbnailTitle>Experiencia de Intercooperación</RelatedPostThumbnailTitle>
                    <RelatedPostThumbnailDescription>En Fiqus comenzamos este 2020 con una gran experiencia de trabajo e intercooperación y comenzamos este 2020 con una gran experiencia de trabajo e intercooperación.</RelatedPostThumbnailDescription>
                    <BtnContainer>
                        <Btn
                            type='btnSecondary'
                            theme={styles}
                            isLink
                            href="#"
                            btnText='leer'
                        />
                    </BtnContainer>
                </RelatedPostThumbnailWrapper>
            </TagsContainer>
        </RelatedPostsContainer>
    );
};

export default RelatedPosts;