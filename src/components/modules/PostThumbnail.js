import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import data from '../../content/content.json';
import { Link, useTranslation } from "gatsby-plugin-react-i18next";
import Button from '../common/Button';
import { GatsbyImage } from "gatsby-plugin-image";
import { spring } from '../common/motion/variants';

const styles = data.styles;
const { colors } = styles;

// Paleta de sombras duras que rota por tarjeta (look bento / RetroUI).
// Sin amarillo ni celeste: el fondo de la sección ya es celeste (celestin).
const shadowColors = [colors.red, colors.purpleLight, colors.purpleSecondary, colors.greenMain];

// Tarjeta bento. El ancho (span sobre un grid de 6 columnas) y la orientación
// (vertical vs. horizontal "featured") vienen dados por props según la fila.
const CardWrapper = styled(motion.div)`
    position: relative;
    background: ${colors.white};
    border-radius: 8px;
    border: 4px solid #000;
    box-shadow: 8px 8px 0 ${props => props.$shadow};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @media (min-width: ${styles.breakpoints.m}px) {
        grid-column: span ${props => props.$span};
        flex-direction: ${props => (props.$horizontal ? 'row' : 'column')};
        align-items: stretch;
    }
`;

const ImageSide = styled(Link)`
    position: relative;
    display: block;
    flex-shrink: 0;
    border-bottom: 4px solid #000;
    @media (min-width: ${styles.breakpoints.m}px) {
        ${props => props.$horizontal
            ? `width: 40%; border-bottom: none; border-right: 4px solid #000;`
            : `width: 100%;`}
    }
`;

const Image = styled(GatsbyImage)`
    height: 190px;
    width: 100%;
    display: block;
    @media (min-width: ${styles.breakpoints.m}px) {
        ${props => props.$horizontal
            ? `height: 100%; min-height: 230px;`
            : `height: 180px;`}
    }
`;

// Eyebrow en la esquina de la imagen (tag corto en mayúsculas, estilo RetroUI).
const Eyebrow = styled.span`
    position: absolute;
    z-index: 2;
    top: 14px;
    left: 14px;
    background: ${props => props.$shadow};
    color: #fff;
    font-size: 0.72em;
    font-weight: ${styles.fontWeight.bold};
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 5px 11px;
    border: 3px solid #000;
    border-radius: 6px;
    box-shadow: 3px 3px 0 #000;
`;

const ContentSide = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    @media (min-width: ${styles.breakpoints.m}px) {
        padding: ${props => (props.$horizontal ? '26px 30px' : '20px 22px')};
    }
`;

const CardTitle = styled(Link)`
    display: block;
    font-size: 1.28em;
    line-height: 1.2;
    font-weight: bold;
    color: ${colors.darkMainBg};
    text-decoration: none;
    margin-bottom: 12px;
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: ${props => (props.$horizontal ? '1.7em' : '1.35em')};
    }
    h3 {
        margin: 0;
        font-size: inherit;
        line-height: inherit;
    }
`;

// Descripción acotada a pocas líneas para que las tarjetas queden compactas.
const CardDescription = styled.p`
    font-size: 0.92em;
    line-height: 1.5;
    color: ${colors.darkGrey};
    margin-bottom: 18px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => (props.$horizontal ? 3 : 4)};
    overflow: hidden;
`;

// Botón empujado al fondo con separador arriba.
const BtnContainer = styled.div`
    margin-top: auto;
    padding-top: 16px;
    border-top: 3px solid #000;
    display: flex;
`;

const Btn = styled(Button)`
    font-size: 0.88em;
    margin: 0;
    padding: 7px 15px;
    border: 2px solid #000;
    border-radius: 8px;
    background: ${colors.white};
    color: #000;
    box-shadow: 4px 4px 0 #000;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0 #000;
    }
`;

const PostThumbnail = (props) => {
    const { t } = useTranslation();
    const shadow = shadowColors[(props.index || 0) % shadowColors.length];
    const horizontal = !!props.horizontal;
    const span = props.span || 2;
    const eyebrow = (props.tags && props.tags[0]) || t("blog.eyebrow");

    return (
        <CardWrapper
            $shadow={shadow}
            $span={span}
            $horizontal={horizontal}
            whileHover={{ x: -4, y: -4, boxShadow: `12px 12px 0 ${shadow}`, transition: spring }}
            whileTap={{ x: 2, y: 2, boxShadow: `4px 4px 0 ${shadow}`, transition: spring }}
        >
            <ImageSide to={props.shortSlug} $horizontal={horizontal}>
                <Eyebrow $shadow={shadow}>{eyebrow}</Eyebrow>
                <Image $horizontal={horizontal} image={props.image} alt="" />
            </ImageSide>
            <ContentSide $horizontal={horizontal}>
                <CardTitle to={props.shortSlug} $horizontal={horizontal}>
                    <h3>{props.postTitle}</h3>
                </CardTitle>
                <CardDescription $horizontal={horizontal}>{props.postDescription}</CardDescription>
                <BtnContainer>
                    <Btn
                        type='btnSecondary'
                        theme={styles}
                        isLink
                        href={props.shortSlug}
                        btnText={t("button.read")}
                    />
                </BtnContainer>
            </ContentSide>
        </CardWrapper>
    );
};

export default PostThumbnail;
