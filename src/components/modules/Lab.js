import React from 'react';
import styled from 'styled-components';
import data from '../../content/content.json';
import { GatsbyImage } from "gatsby-plugin-image";
import Tags from '../common/Tags';
import { useTranslation, Link } from "gatsby-plugin-react-i18next";
import Button from '../common/Button';

const githubIcon = require('../../images/icon_github.svg');
const styles = data.styles;

// Contenedor principal con bordes redondeados y efecto hover
const CaseWrapper = styled.div`
    margin-bottom: 40px;
    max-width: 351px;
    flex-basis: 100%;
    background: ${styles.colors.white};
    border-radius: 14px; /* Bordes redondeados */
    padding: 20px;
    border: 4px solid #000; /* Borde grueso */
    box-shadow: 8px 8px 0 #000; /* Sombra pronunciada */
    transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transición suave */

    &:hover {
        transform: translate(4px, 4px); /* Efecto de "bajar" */
        box-shadow: 4px 4px 0 #000; /* Sombra reducida */
    }

    &:last-of-type {
        margin-bottom: 96px;
    }

    @media (min-width: ${styles.breakpoints.l}px) {
        flex-basis: 33%;
        &:last-of-type {
            margin-bottom: 75px;
        }
    }
`;

// Imagen con bordes redondeados
const LabImage = styled(GatsbyImage)`
    border-radius: 6px; /* Bordes redondeados */
    margin-bottom: 15px;
    height: 182px;
    width: 100%;
    border: 2px solid #000; /* Borde grueso */
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 20px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        height: 208px;
    }
`;

// Título con estilo fuerte
const LabTitle = styled.h3`
    font-size: 2.11em;
    line-height: 42px;
    color: ${styles.colors.greenMain};
    margin-bottom: 15px;
`;

// Descripción con bordes redondeados y línea divisoria
const LabDescription = styled.p`
    font-size: 1em;
    line-height: 1.22em;
    padding-bottom: 22px;
    margin-bottom: 20px;
    color: ${styles.colors.darkMainBg};
    border-bottom: 2px solid ${styles.colors.greenLight}; /* Línea divisoria */
    @media (min-width: ${styles.breakpoints.l}px) {
        line-height: 1.44em;
    }
`;

// Título de las etiquetas
const TagsTitle = styled.h4`
    margin-bottom: 20px;
    font-size: 0.88em;
    font-weight: ${styles.fontWeight.medium};
    color: ${styles.colors.ultraDarkGrey};
`;

// Contenedor de etiquetas con bordes redondeados
const TagsContainer = styled.div`
    padding-bottom: 13px;
    margin-bottom: 20px;
    border-bottom: 2px solid ${styles.colors.greenLight}; /* Línea divisoria */
    @media (min-width: ${styles.breakpoints.l}px) {
        padding-bottom: 13px;
    }
`;

// Contenedor de botones
const BtnContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* Espacio entre botones */
`;

// Botón de GitHub con bordes redondeados
const BtnGithub = styled(Button)`
    font-size: 0.88em;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 6px; /* Bordes redondeados */
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 1em;
    }
`;

// Botón de sitio con bordes redondeados
const BtnSite = styled(Button)`
    font-size: 0.88em;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 6px; /* Bordes redondeados */
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 1em;
    }
`;

const SuccessCase = (props) => {
    const lab = props.labData;
    const { t } = useTranslation();

    return (
        <CaseWrapper>
            <LabImage
                image={props.image}
                alt={t("casos_de_exito.imageAltLine1") + lab.frontmatter.title}
            />
            <LabTitle>{lab.frontmatter.title}</LabTitle>
            <LabDescription>{lab.excerpt}</LabDescription>
            <TagsTitle>{t("casos_de_exito.tagsTitle")}</TagsTitle>
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
        </CaseWrapper>
    );
};

export default SuccessCase;