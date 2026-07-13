import React from 'react';
import styled from 'styled-components';
import { motion } from 'motion/react';
import data from '../../content/content.json';
import { GatsbyImage } from "gatsby-plugin-image";
import Tags from '../common/Tags';
import { useTranslation } from "gatsby-plugin-react-i18next";
import Button from '../common/Button';
import { spring } from '../common/motion/variants';

const githubIcon = require('../../images/icon_github.svg');
const styles = data.styles;
const { colors } = styles;

// Paleta de sombras duras que rota por tarjeta (look bento / RetroUI).
// Sin amarillo: el fondo de la sección es amarillo y la sombra se perdería.
const shadowColors = [colors.red, colors.purpleLight, colors.purpleSecondary, colors.greenMain];

// Tarjeta bento. El ancho (span sobre un grid de 6 columnas) y la orientación
// (vertical vs. horizontal "featured") vienen dados por props según la fila.
const CaseWrapper = styled(motion.div)`
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

// Lado de la imagen. En vertical es una franja superior; en horizontal, lateral.
const ImageSide = styled.div`
    position: relative;
    flex-shrink: 0;
    border-bottom: 4px solid #000;
    @media (min-width: ${styles.breakpoints.m}px) {
        ${props => props.$horizontal
            ? `width: 40%; border-bottom: none; border-right: 4px solid #000;`
            : `width: 100%;`}
    }
`;

const LabImage = styled(GatsbyImage)`
    height: 180px;
    width: 100%;
    display: block;
    @media (min-width: ${styles.breakpoints.m}px) {
        ${props => props.$horizontal
            ? `height: 100%; min-height: 240px;`
            : `height: 170px;`}
    }
`;

// Eyebrow en la esquina de la imagen (tag corto en mayúsculas, estilo RetroUI).
const Eyebrow = styled.span`
    position: absolute;
    z-index: 2;
    top: 14px;
    left: 14px;
    background: ${props => props.$shadow};
    color: #000;
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

const LabTitle = styled.h3`
    font-size: 1.5em;
    line-height: 1.2;
    color: ${colors.greenMain};
    margin-bottom: 12px;
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: ${props => (props.$horizontal ? '2em' : '1.6em')};
    }
`;

// Descripción acotada a pocas líneas para que las tarjetas queden compactas.
const LabDescription = styled.p`
    font-size: 0.95em;
    line-height: 1.5;
    color: ${colors.darkMainBg};
    margin-bottom: 18px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props => (props.$horizontal ? 3 : 4)};
    overflow: hidden;
`;

// Etiquetas empujadas al fondo para alinear los botones abajo.
const TagsContainer = styled.div`
    margin-top: auto;
    padding-top: 16px;
    margin-bottom: 18px;
    border-top: 3px solid #000;
`;

const BtnContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const BtnGithub = styled(Button)`
    font-size: 0.88em;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 6px;
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 1em;
    }
`;

const BtnSite = styled(Button)`
    font-size: 0.88em;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 6px;
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 1em;
    }
`;

const SuccessCase = (props) => {
    const lab = props.labData;
    const { t } = useTranslation();
    const shadow = shadowColors[(props.index || 0) % shadowColors.length];
    const horizontal = !!props.horizontal;
    const span = props.span || 2;
    const eyebrow = (lab.frontmatter.tags && lab.frontmatter.tags[0]) || t("casos_de_exito.tagsTitle");

    return (
        <CaseWrapper
            $shadow={shadow}
            $span={span}
            $horizontal={horizontal}
            whileHover={{ x: -4, y: -4, boxShadow: `12px 12px 0 ${shadow}`, transition: spring }}
            whileTap={{ x: 2, y: 2, boxShadow: `4px 4px 0 ${shadow}`, transition: spring }}
        >
            <ImageSide $horizontal={horizontal}>
                <Eyebrow $shadow={shadow}>{eyebrow}</Eyebrow>
                <LabImage
                    $horizontal={horizontal}
                    image={props.image}
                    alt={t("casos_de_exito.imageAltLine1") + lab.frontmatter.title}
                />
            </ImageSide>
            <ContentSide $horizontal={horizontal}>
                <LabTitle $horizontal={horizontal}>{lab.frontmatter.title}</LabTitle>
                <LabDescription $horizontal={horizontal}>{lab.excerpt}</LabDescription>
                <TagsContainer>
                    <Tags styles={props.styles} type="labs" tags={lab.frontmatter.tags}></Tags>
                </TagsContainer>
                <BtnContainer>
                    {props.labData.frontmatter.website && (
                        <BtnSite
                            type='btnLabeled'
                            theme={styles}
                            isLink
                            target="_blank"
                            href={props.labData.frontmatter.website}
                            btnText={t("casos_de_exito.btnTextVerMas")}
                        />
                    )}
                    {props.labData.frontmatter.github && (
                        <BtnGithub
                            type='btnLabeled'
                            theme={styles}
                            isLink
                            src={githubIcon.default}
                            github={true}
                            href={props.labData.frontmatter.github}
                            target="_blank"
                            btnText={t("casos_de_exito.btnTextGithub")}
                        />
                    )}
                </BtnContainer>
            </ContentSide>
        </CaseWrapper>
    );
};

export default SuccessCase;
