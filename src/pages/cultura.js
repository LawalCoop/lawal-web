import React, { Fragment } from "react";
import styled from "styled-components";
import data from "../content/content.json";
import { useTranslation } from "gatsby-plugin-react-i18next";
import SectionHeader from "../components/common/SectionHeader";

// Import static images
import equipoMobile from "../images/equipoMobile.png";
import equipoDesktop from "../images/equipoDesktop.png";
import creatividad from "../images/creatividad.jpg";

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints, fontWeight } = styles;

const Culture = () => {
    const { t } = useTranslation();

    // Estilos neobrutalistas
    const CultureMainContainer = styled.div`
        padding-bottom: 151px;
        @media (min-width: ${breakpoints.m}px) {
            padding-bottom: 247px;
        }
    `;

    const HistoryMainContainer = styled.div`
        background-color: ${colors.marroncin};
        padding: 30px 20px 40px 20px;
        @media (min-width: ${breakpoints.m}px) {
            padding-top: 50px;
            padding-bottom: 53px;
        }
    `;

    const HistoryTitle = styled.h2`
        font-size: 1.72em;
        line-height: 37px;
        font-weight: ${fontWeight.medium};
        color: ${colors.purplePrimary};
        text-align: center;
        margin-bottom: 30px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 2.83em;
            line-height: 59px;
            margin-bottom: 42px;
        }
    `;

    const TeamImgContainer = styled.div`
        height: 169px;
        margin: 0 auto 30px auto;
        overflow: hidden;
        border: 4px solid #000; /* Borde grueso */
        border-radius: 14px; /* Bordes redondeados */
        box-shadow: 8px 8px 0 #000; /* Sombra pronunciada */
        transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transición suave */

        &:hover {
            transform: translate(4px, 4px); /* Movimiento al hover */
            box-shadow: 4px 4px 0 #000; /* Sombra reducida */
        }

        @media (min-width: ${breakpoints.s}px) {
            max-width: 500px;
            height: 220px;
        }
        @media (min-width: ${breakpoints.m}px) {
            max-width: 754px;
            height: 248px;
            margin: 0 auto 28px auto;
        }
    `;

    const TeamImgMobile = styled.img`
        display: block;
        width: 100%;
        @media (min-width: ${breakpoints.m}px) {
            display: none;
        }
    `;

    const TeamImgDesktop = styled.img`
        display: none;
        width: 100%;
        @media (min-width: ${breakpoints.m}px) {
            display: block;
        }
    `;

    const HistoryContentContainer = styled.div`
        padding: 0;
        @media (min-width: ${breakpoints.m}px) {
            max-width: 754px;
            margin: auto;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-bottom: 22px;
        }
    `;

    const HistoryContentLeftBlock = styled.div`
        @media (min-width: ${breakpoints.m}px) {
            flex-basis: calc(50% - 9px);
            max-width: 370px;
            margin-right: 15px;
        }
    `;

    const HistoryContentRightBlock = styled.div`
        margin-bottom: 30px;
        @media (min-width: ${breakpoints.m}px) {
            flex-basis: calc(50% - 8px);
            max-width: 370px;
        }
    `;

    const HistoryContentFullBlock = styled.div`
        @media (min-width: ${breakpoints.m}px) {
            width: 100%;
            max-width: 754px;
            margin: auto;
        }
    `;

    const HistorySubtitle = styled.h3`
        font-size: 1.44em;
        line-height: 34px;
        font-weight: ${fontWeight.bold};
        color: ${colors.purplePrimary};
        text-align: left;
        margin-bottom: 18px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1.66em;
            line-height: 37px;
            font-weight: ${fontWeight.regular};
            margin-bottom: 15px;
        }
    `;

    const HistoryContent = styled.p`
        font-size: 0.88em;
        line-height: 22px;
        color: ${colors.darkMainBg};
        margin-bottom: 22px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1em;
            line-height: 26px;
            margin-bottom: 25px;
        }
    `;

    const FederalMainContainer = styled.div`
        background-color: ${colors.purplePrimary};
        display: flex;
        flex-direction: column;
        padding: 30px 20px 10px 20px;
        @media (min-width: ${breakpoints.m}px) {
            padding-top: 53px;
            padding-bottom: 34px;
        }
    `;

    const TopBlock = styled.div`
        display: flex;
        flex-direction: column-reverse;
        @media (min-width: ${breakpoints.m}px) {
            width: 100%;
            max-width: 754px;
            flex-direction: row;
            justify-content: space-between;
            margin: auto;
        }
    `;

    const TopBlockImgContainer = styled.div`
        max-width: 320px;
        margin: auto;
        margin-bottom: 26px;
        border: 4px solid #000; /* Borde grueso */
        border-radius: 14px; /* Bordes redondeados */
        box-shadow: 8px 8px 0 #000; /* Sombra pronunciada */
        transition: transform 0.2s ease, box-shadow 0.2s ease; /* Transición suave */

        &:hover {
            transform: translate(4px, 4px); /* Movimiento al hover */
            box-shadow: 4px 4px 0 #000; /* Sombra reducida */
        }

        @media (min-width: ${breakpoints.m}px) {
            max-width: 346px;
            flex-basis: 50%;
            margin-right: auto;
            margin-left: 0;
            margin-bottom: 22px;
        }
    `;

    const TopBlockImg = styled.img`
        width: 100%;
        border-radius: 10px; /* Bordes redondeados para la imagen */
    `;

    const TopBlockInfoContainer = styled.div`
        @media (min-width: ${breakpoints.m}px) {
            flex-basis: 50%;
            max-width: 367px;
            margin-left: auto;
            margin-right: 0;
            padding-top: 22px;
        }
    `;

    const FederalSubtitle = styled.h3`
        font-size: 1.44em;
        line-height: 34px;
        font-weight: ${fontWeight.bold};
        color: ${colors.white};
        text-align: left;
        margin-bottom: 18px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1.66em;
            line-height: 37px;
            margin-bottom: 12px;
        }
    `;

    const FederalContent = styled.p`
        font-size: 0.88em;
        line-height: 22px;
        color: ${colors.white};
        margin-bottom: 22px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1em;
            line-height: 26px;
            margin-bottom: 25px;
        }
    `;

    const FederalContentBoldText = styled.b`
        font-weight: ${fontWeight.regular};
    `;

    const BottomBlock = styled.div`
        @media (min-width: ${breakpoints.m}px) {
            max-width: 754px;
            margin: auto;
        }
    `;

    const FactticMainContainer = styled.div`
        background-color: ${colors.white};
        padding: 30px 20px 0px 20px;
        margin: 20px;
        @media (min-width: ${breakpoints.m}px) {
            padding-top: 55px;
        }
    `;

    const FactticTitle = styled.h3`
        font-size: 1.44em;
        line-height: 34px;
        font-weight: ${fontWeight.bold};
        color: ${colors.purplePrimary};
        margin-bottom: 10px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1.72em;
            font-weight: ${fontWeight.bold};
            margin-bottom: 20px;
        }
    `;

    const FactticLead = styled.h4`
        font-size: 1em;
        line-height: 26px;
        font-weight: ${fontWeight.regular};
        color: ${colors.purplePrimary};
        margin-bottom: 15px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1.44em;
            line-height: 34px;
            font-weight: ${fontWeight.regular};
            margin-bottom: 18px;
        }
    `;

    const FactticContentContainer = styled.div`
        padding: 0;
        @media (min-width: ${breakpoints.m}px) {
            max-width: 754px;
            margin: auto;
            margin-bottom: 2px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    `;

    const FactticContentLeftBlock = styled.div`
        @media (min-width: ${breakpoints.m}px) {
            flex-basis: calc(50% - 9px);
            max-width: 370px;
            margin-right: 15px;
        }
    `;

    const FactticContentRightBlock = styled.div`
        margin-bottom: 27px;
        @media (min-width: ${breakpoints.m}px) {
            flex-basis: calc(50% - 8px);
            max-width: 370px;
        }
    `;

    const FactticContentFullBlock = styled.div`
        @media (min-width: ${breakpoints.m}px) {
            width: 100%;
            max-width: 754px;
            margin: auto;
        }
    `;

    const FactticSubtitle = styled.h3`
        font-size: 1.44em;
        line-height: 34px;
        font-weight: ${fontWeight.bold};
        color: ${colors.purplePrimary};
        text-align: left;
        margin-bottom: 18px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1.72em;
            line-height: 32px;
            font-weight: ${fontWeight.bold};
            margin-bottom: 15px;
        }
    `;

    const FactticContent = styled.p`
        font-size: 0.88em;
        line-height: 22px;
        color: ${colors.darkMainBg};
        margin-bottom: 22px;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1em;
            line-height: 26px;
            margin-bottom: 25px;
        }
    `;

    const FactticContentBoldText = styled.b``;

    const history = t("culture_historia.content_col1");
    return (
        <Fragment>
            <SectionHeader
                section="cultura"
                title={t("culture.title")}
                subtitle={t("culture.subtitle")}
                description={t("culture.description")}
            />
            <CultureMainContainer>
                <HistoryMainContainer>
                    <HistoryTitle>{t("culture_historia.title")}</HistoryTitle>
                    <TeamImgContainer>
                        <TeamImgMobile
                            src={equipoMobile}
                            alt={t("culture_historia.imageAltMobile")}
                        />
                        <TeamImgDesktop
                            src={equipoDesktop}
                            alt={t("culture_historia.imageAlt")}
                        />
                    </TeamImgContainer>
                    <HistoryContentContainer>
                        <HistoryContentLeftBlock>
                            <HistoryContent>{t("culture_historia.content_line1")}</HistoryContent>
                            <HistoryContent>{t("culture_historia.content_line2")}</HistoryContent>
                        </HistoryContentLeftBlock>
                        <HistoryContentRightBlock>
                            <HistoryContent>{t("culture_historia.content_line3")}</HistoryContent>
                            <HistoryContent>{t("culture_historia.content_line4")}</HistoryContent>
                        </HistoryContentRightBlock>
                    </HistoryContentContainer>
                    <HistoryContentFullBlock>
                        <HistorySubtitle>{t("culture_historia.subtitle")}</HistorySubtitle>
                        <HistoryContent>{t("culture_historia.content_line5")}</HistoryContent>
                    </HistoryContentFullBlock>
                </HistoryMainContainer>
                <FederalMainContainer>
                    <TopBlock>
                        <TopBlockImgContainer>
                            <TopBlockImg
                                src={creatividad}
                                alt={t("culture_federales.imageAlt")}
                            />
                        </TopBlockImgContainer>
                        <TopBlockInfoContainer>
                            <FederalSubtitle>{t("culture_federales.title1")}</FederalSubtitle>
                            <FederalContent>{t("culture_federales.content1")}</FederalContent>
                            <FederalContent>{t("culture_federales.content2")}</FederalContent>
                        </TopBlockInfoContainer>
                    </TopBlock>
                    <BottomBlock>
                        <FederalSubtitle>{t("culture_federales.title2")}</FederalSubtitle>
                        <FederalContent>{t("culture_federales.content3")}</FederalContent>
                    </BottomBlock>
                </FederalMainContainer>
                <FactticMainContainer>
                    <FactticContentContainer>
                        <FactticTitle>{t("culture_facttic.title")}</FactticTitle>
                        <FactticLead>{t("culture_facttic.subtitle")}</FactticLead>
                        <FactticContentLeftBlock>
                            <FactticContent>
                                {t("culture_facttic.content_line1_part1")}
                                <FactticContentBoldText>{t("culture_facttic.content_line1_facttic")}</FactticContentBoldText>
                                {t("culture_facttic.content_line1_part2")}
                            </FactticContent>
                        </FactticContentLeftBlock>
                        <FactticContentRightBlock>
                            <FactticContent>{t("culture_facttic.content_line2")}</FactticContent>
                            <FactticContent>{t("culture_facttic.content_line3")}</FactticContent>
                        </FactticContentRightBlock>
                    </FactticContentContainer>
                    <FactticContentFullBlock>
                        <FactticSubtitle>{t("culture_internacional.title")}</FactticSubtitle>
                        <FactticContent>{t("culture_internacional.content_line1")}</FactticContent>
                        <FactticContent>{t("culture_internacional.content_line2")}</FactticContent>
                        <FactticContent>{t("culture_internacional.content_line3")}</FactticContent>
                    </FactticContentFullBlock>
                </FactticMainContainer>
            </CultureMainContainer>
        </Fragment>
    );
};

export default Culture;