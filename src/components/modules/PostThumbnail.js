import React from 'react';
import styled from 'styled-components';
import data from '../../content/content.json';
import { useIntl, Link } from "gatsby-plugin-react-intl";
import Button from '../common/Button';
import Img from "gatsby-image";

const styles = data.styles;

// Contenedor principal con estilo neobrutalista y bordes redondeados
const PostThumbnailWrapper = styled.div`
    margin-bottom: 50px;
    max-width: 320px;
    flex-basis: 100%;
    background: ${styles.colors.white};
    border: 4px solid #000; /* Borde grueso */
    border-radius: 14px; /* Bordes redondeados */
    padding: 20px;
    box-shadow: 8px 8px 0 #000; /* Sombra pronunciada */
    transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transición suave */

    &:hover {
        transform: translate(4px, 4px); /* Efecto de "bajar" */
        box-shadow: 4px 4px 0 #000; /* Sombra reducida */
    }

    @media (min-width: ${styles.breakpoints.m}px) {
        max-width: 351px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        flex-basis: 50%;
        min-width: 300px;
        max-width: 460px;
        margin-bottom: 55px;
    }
`;

// Enlace de la imagen con estilo neobrutalista y bordes redondeados
const PostThumbnailImage = styled(Link)`
    display: block;
    border-radius: 10px; /* Bordes redondeados */
    margin-bottom: 10px;
    height: 230px;
    max-width: 320px;
    overflow: hidden;
    border: 2px solid #000; /* Borde grueso */
    @media (min-width: ${styles.breakpoints.l}px) {
        height: 215px;
        margin-bottom: 15px;
    }
`;

// Imagen con estilo neobrutalista
const Image = styled(Img)`
    height: 100%;
    width: 100%;
    object-fit: cover; /* Asegura que la imagen cubra el espacio */
`;

// Título con estilo neobrutalista
const PostThumbnailTitle = styled(Link)`
    display: block;
    font-size: 1.16em;
    line-height: 27px;
    color: ${styles.colors.darkMainBg};
    text-decoration: none;
    margin-bottom: 10px;
    font-weight: bold; /* Texto en negrita */
    @media (min-width: ${styles.breakpoints.l}px) {
        margin-bottom: 8px;
    }
`;

// Descripción con estilo neobrutalista y línea divisoria
const PostThumbnailDescription = styled.p`
    font-size: 0.88em;
    line-height: 20px;
    margin-bottom: 20px;
    color: ${styles.colors.darkGrey};
    border-bottom: 2px solid #000; /* Línea divisoria gruesa */
    padding-bottom: 10px; /* Espacio debajo de la descripción */
    @media (min-width: ${styles.breakpoints.l}px) {
        margin-bottom: 15px;
    }
`;

// Contenedor de botones con estilo neobrutalista
const BtnContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

// Botón con estilo neobrutalista y bordes redondeados
const Btn = styled(Button)`
    font-size: 0.88em;
    margin: 0;
    padding: 6px 12px;
    border: 2px solid #000; /* Borde grueso */
    border-radius: 10px; /* Bordes redondeados */
    background: ${styles.colors.white};
    color: #000;
    box-shadow: 4px 4px 0 #000; /* Sombra pronunciada */
    transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transición suave */

    &:hover {
        transform: translate(2px, 2px); /* Efecto de "bajar" */
        box-shadow: 2px 2px 0 #000; /* Sombra reducida */
    }

    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 0.77em;
        padding: 7px 15px;
    }
`;

const PostThumbnail = (props) => {
    const intl = useIntl();

    return (
        <PostThumbnailWrapper>
            <PostThumbnailImage to={props.shortSlug}>
                <Image
                    fluid={props.fluid}
                    alt=""
                />
            </PostThumbnailImage>
            <PostThumbnailTitle to={props.shortSlug}>
                <h3>{props.postTitle}</h3>
            </PostThumbnailTitle>
            <PostThumbnailDescription>{props.postDescription}</PostThumbnailDescription>
            <BtnContainer>
                <Btn
                    type='btnSecondary'
                    theme={styles}
                    isLink
                    href={props.slug}
                    btnText={intl.formatMessage({ id: 'button.read' })}
                />
            </BtnContainer>
        </PostThumbnailWrapper>
    );
};

export default PostThumbnail;