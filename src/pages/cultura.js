import React, { Fragment } from "react";
import styled from "styled-components";
import { motion } from "motion/react";
import data from "../content/content.json";
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/motion/Reveal";
import Stagger from "../components/common/motion/Stagger";
import { riseItem, spring } from "../components/common/motion/variants";
import { nb } from "../styles/neobrutalism";

const { styles } = data;
const { colors, breakpoints } = styles;

// Fondo crema cálido, base del sistema neobrutalista.
const CREAM = "#F4ECDF";
const DARK = "#1B232B";

// Hover con "peso" para cards (lift + sombra crece).
const cardLift = {
    y: -5,
    x: -5,
    boxShadow: "12px 12px 0 #000",
    transition: spring,
};

// ---------------------------------------------------------------------------
// Estructura
// ---------------------------------------------------------------------------
const Body = styled.div`
    background: ${CREAM};
    overflow: hidden;
`;

const Section = styled.section`
    position: relative;
    padding: 56px 20px;
    ${(p) => p.$bg && `background: ${p.$bg};`}
    /* La última sección deja hueco para el card flotante "Contactanos"
       (ContactForm se posiciona absolute con top negativo y se superpone). */
    ${(p) => p.$last && `padding-bottom: 200px;`}
    @media (min-width: ${breakpoints.m}px) {
        padding: 96px 24px;
        ${(p) => p.$last && `padding-bottom: 300px;`}
    }
`;

const Inner = styled.div`
    max-width: 1040px;
    margin: 0 auto;
    position: relative;
`;

// Encabezado de sección: eyebrow + título + subrayado de acento
const Head = styled.div`
    margin-bottom: 40px;
`;

const Eyebrow = styled.span`
    display: inline-block;
    font-size: 0.72em;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #000;
    background: ${(p) => p.$bg || nb.accent};
    border: ${nb.borderThin};
    border-radius: ${nb.radius};
    padding: 7px 15px;
    box-shadow: ${nb.shadowSm};
    margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
    font-size: 2.2em;
    line-height: 0.98;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.015em;
    color: ${(p) => p.$color || "#000"};
    margin: 0;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 3.6em;
    }
`;

// Barrita de acento debajo del título
const Underline = styled.span`
    display: block;
    width: 96px;
    height: 11px;
    background: ${(p) => p.$bg || nb.accent};
    border: ${nb.borderThin};
    border-radius: 5px;
    box-shadow: ${nb.shadowSm};
    margin-top: 18px;
`;

// Sticker rotado (rótulo decorativo con "onda")
const Sticker = styled.span`
    display: inline-block;
    transform: rotate(${(p) => p.$rot || -5}deg);
    background: ${(p) => p.$bg || colors.purpleLight};
    border: ${nb.borderThin};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadowSm};
    font-size: 0.66em;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 7px 13px;
    color: ${(p) => p.$color || "#fff"};
    margin-left: 12px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 20px;
`;

// ---------------------------------------------------------------------------
// Cards, marcos, textos
// ---------------------------------------------------------------------------
const Card = styled.div`
    background: ${(p) => p.$bg || "#fff"};
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadow};
    padding: 26px 24px 28px 24px;
    @media (min-width: ${breakpoints.m}px) {
        padding: 34px 32px 36px 32px;
    }
`;

const Paragraph = styled.p`
    font-size: 0.96em;
    line-height: 1.62;
    color: ${(p) => p.$color || colors.darkMainBg};
    margin: 0 0 16px 0;
    &:last-child {
        margin-bottom: 0;
    }
    @media (min-width: ${breakpoints.m}px) {
        font-size: 1.03em;
    }
`;

const CardTitle = styled.h3`
    font-size: 1.5em;
    font-weight: 700;
    line-height: 1.1;
    color: ${(p) => p.$color || colors.darkMainBg};
    margin: 0 0 16px 0;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 1.9em;
    }
`;

const Lead = styled.p`
    font-size: 1.12em;
    line-height: 1.5;
    font-weight: 500;
    color: ${(p) => p.$color || colors.darkMainBg};
    margin: 22px 0 0 0;
    max-width: 720px;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 1.4em;
    }
`;

// Resalte tipo "marker" (borde + sombrita) para que lea sobre cualquier fondo de
// sección y corte la monotonía del texto largo.
const Highlight = styled.b`
    background: ${nb.accent};
    color: #000;
    font-weight: 700;
    padding: 1px 6px;
    border: 2px solid #000;
    border-radius: 4px;
    box-shadow: 2px 2px 0 #000;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
`;

// Interpreta **frase** dentro de un string i18n y la envuelve en <Highlight>.
// Permite marcar lo importante desde la traducción, sin romper el texto.
const HL = (text) => {
    const parts = String(text == null ? "" : text).split(/\*\*(.+?)\*\*/g);
    return parts.map((part, i) =>
        i % 2 === 1 ? <Highlight key={i}>{part}</Highlight> : part
    );
};

// Marco de imagen: rotado + lift al hover
const Frame = styled.div`
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadowLg};
    overflow: hidden;
    background: #fff;
    transform: rotate(-1.4deg);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    img {
        display: block;
        width: 100%;
    }
    &:hover {
        transform: rotate(0deg) translate(-3px, -3px);
        box-shadow: 13px 13px 0 ${nb.accent};
    }
`;

const HistoryFrame = styled(Frame)`
    max-width: 720px;
    margin: 8px auto 36px auto;
`;

// Pull-quote grande y rotado (el significado del nombre)
const Quote = styled.blockquote`
    background: ${nb.accent};
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadowLg};
    padding: 26px 26px 28px 26px;
    margin: 0 0 32px 0;
    transform: rotate(-1.1deg);
    max-width: 760px;
    p {
        margin: 0;
        font-size: 1.16em;
        line-height: 1.42;
        font-weight: 600;
        color: #000;
        @media (min-width: ${breakpoints.m}px) {
            font-size: 1.44em;
        }
    }
`;

const TwoCol = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    @media (min-width: ${breakpoints.m}px) {
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }
`;

// Callout de énfasis
const Callout = styled(motion.div)`
    background: ${colors.purpleLight};
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadowLg};
    padding: 28px 26px 30px 26px;
    margin-top: 28px;
`;

const CalloutTitle = styled.h3`
    font-size: 1.3em;
    font-weight: 700;
    line-height: 1.18;
    color: #fff;
    margin: 0 0 14px 0;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 1.7em;
    }
`;

// Card horizontal (imagen + texto) para "Creatividad & Tecnología"
const HCard = styled(motion.div)`
    background: #fff;
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadow};
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 22px;
    margin-bottom: 24px;
    @media (min-width: ${breakpoints.m}px) {
        grid-template-columns: 320px 1fr;
        align-items: center;
        padding: 28px;
    }
`;

const HCardImg = styled.div`
    border: ${nb.borderThin};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadowSm};
    overflow: hidden;
    img {
        display: block;
        width: 100%;
    }
`;

// Card ancha con texto en 2 columnas (evita columnas altas y angostas)
const WideCard = styled(motion.div)`
    background: #fff;
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadow};
    padding: 26px 24px;
    @media (min-width: ${breakpoints.m}px) {
        padding: 34px 32px;
    }
`;

const SubHead = styled.h3`
    font-size: 1.4em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    color: ${(p) => p.$color || "#fff"};
    margin: 0 0 16px 0;
    @media (min-width: ${breakpoints.m}px) {
        font-size: 2em;
    }
`;

const Columns = styled.div`
    @media (min-width: ${breakpoints.m}px) {
        column-count: 2;
        column-gap: 40px;
    }
    p {
        margin-top: 0;
    }
`;

// Ecosistemas: cards numeradas de colores
const EcoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 22px;
    @media (min-width: ${breakpoints.m}px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const EcoCard = styled(motion.div)`
    background: ${(p) => p.$bg || "#fff"};
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadow};
    padding: 26px 22px 28px 22px;
`;

const EcoNum = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 1.35em;
    font-weight: 700;
    color: #000;
    background: #fff;
    border: ${nb.border};
    border-radius: ${nb.radius};
    box-shadow: ${nb.shadowSm};
    transform: rotate(-6deg);
    margin-bottom: 20px;
`;

const Culture = () => {
    const { t } = useTranslation();

    // Las 3 cards tienen resalte amarillo, así que ninguna va en amarillo (si no, el
    // marker se pierde). Blanco, beige y celeste-slate: los tres contrastan con el marker.
    const ecoColors = ["#fff", colors.marroncin, colors.celestin];

    return (
        <Fragment>
            <SectionHeader
                section="cultura"
                title={t("culture.title")}
                subtitle={t("culture.subtitle")}
                description={t("culture.description")}
            />

            <Body>
                {/* ---------- 1. LA RAÍZ COLECTIVA ---------- */}
                <Section>
                    <Inner>
                        <Reveal variants={riseItem} amount={0.3}>
                            <Head>
                                <Row>
                                    <Eyebrow>{t("culture_historia.eyebrow")}</Eyebrow>
                                    <Sticker $rot={4} $bg={colors.red}>
                                        {t("culture_historia.sticker")}
                                    </Sticker>
                                </Row>
                                <SectionTitle>{t("culture_historia.title")}</SectionTitle>
                                <Underline />
                            </Head>
                        </Reveal>

                        <Reveal variants={riseItem} amount={0.15}>
                            <HistoryFrame>
                                <img
                                    src={require("../images/" + t("culture_historia.imageDesktop") + ".png").default}
                                    alt={t("culture_historia.imageAlt")}
                                />
                            </HistoryFrame>
                        </Reveal>

                        <Reveal variants={riseItem} amount={0.2}>
                            <Quote>
                                <p>{t("culture_historia.content_line2")}</p>
                            </Quote>
                        </Reveal>

                        <Stagger amount={0.15}>
                            <TwoCol>
                                <Card as={motion.div} variants={riseItem} whileHover={cardLift}>
                                    <Paragraph>{HL(t("culture_historia.content_line1"))}</Paragraph>
                                </Card>
                                <Card as={motion.div} variants={riseItem} whileHover={cardLift}>
                                    <Paragraph>{HL(t("culture_historia.content_line3"))}</Paragraph>
                                    <Paragraph>{t("culture_historia.content_line4")}</Paragraph>
                                </Card>
                            </TwoCol>
                        </Stagger>

                        <Reveal variants={riseItem} amount={0.2}>
                            <Callout whileHover={cardLift}>
                                <CalloutTitle>{t("culture_historia.subtitle")}</CalloutTitle>
                                <Paragraph $color="#fff">
                                    {HL(t("culture_historia.content_line5"))}
                                </Paragraph>
                            </Callout>
                        </Reveal>
                    </Inner>
                </Section>

                {/* ---------- 2. CREATIVIDAD & EXPLORACIÓN ---------- */}
                <Section $bg={colors.purpleSecondary}>
                    <Inner>
                        <Reveal variants={riseItem} amount={0.3}>
                            <Head>
                                <Eyebrow>{t("culture_federales.eyebrow")}</Eyebrow>
                                <SectionTitle $color="#fff">
                                    {t("culture_federales.title1")}
                                </SectionTitle>
                                <Underline />
                            </Head>
                        </Reveal>

                        <Reveal variants={riseItem} amount={0.15}>
                            <HCard whileHover={cardLift}>
                                <HCardImg>
                                    <img
                                        src={require("../images/" + t("culture_federales.imageCreatividad") + ".jpg").default}
                                        alt={t("culture_federales.imageAlt")}
                                    />
                                </HCardImg>
                                <div>
                                    <Paragraph>{HL(t("culture_federales.content1"))}</Paragraph>
                                    <Paragraph>{HL(t("culture_federales.content2"))}</Paragraph>
                                </div>
                            </HCard>
                        </Reveal>

                        <Reveal variants={riseItem} amount={0.1}>
                            <SubHead>{t("culture_federales.title2")}</SubHead>
                            <WideCard whileHover={cardLift}>
                                <Columns>
                                    <Paragraph>{HL(t("culture_federales.content3"))}</Paragraph>
                                </Columns>
                            </WideCard>
                        </Reveal>
                    </Inner>
                </Section>

                {/* ---------- 3. PUENTES HACIA EL TERRITORIO (Hackerspace) ---------- */}
                <Section $bg={DARK}>
                    <Inner>
                        <Reveal variants={riseItem} amount={0.25}>
                            <Head>
                                <Row>
                                    <Eyebrow $bg={colors.red} $color="#fff">
                                        {t("culture_facttic.eyebrow")}
                                    </Eyebrow>
                                    <Sticker $rot={5} $bg={nb.accent} $color="#000">
                                        {t("culture_facttic.sticker")}
                                    </Sticker>
                                </Row>
                                <SectionTitle $color="#fff">
                                    {t("culture_facttic.title")}
                                </SectionTitle>
                                <Underline />
                                <Lead $color={CREAM}>{t("culture_facttic.subtitle")}</Lead>
                            </Head>
                        </Reveal>

                        <Reveal variants={riseItem} amount={0.15}>
                            <Card as={motion.div} $bg={CREAM} whileHover={cardLift}>
                                <Paragraph>
                                    {t("culture_facttic.content_line1_part1")}
                                    <Highlight>{t("culture_facttic.content_line1_facttic")}</Highlight>
                                    {t("culture_facttic.content_line1_part2")}
                                </Paragraph>
                                <Paragraph>{HL(t("culture_facttic.content_line2"))}</Paragraph>
                                <Paragraph>{HL(t("culture_facttic.content_line3"))}</Paragraph>
                            </Card>
                        </Reveal>
                    </Inner>
                </Section>

                {/* ---------- 4. LOS ECOSISTEMAS QUE INTEGRAMOS ---------- */}
                <Section $bg={colors.red} $last>
                    <Inner>
                        <Reveal variants={riseItem} amount={0.3}>
                            <Head>
                                <Eyebrow>{t("culture_internacional.eyebrow")}</Eyebrow>
                                <SectionTitle $color="#fff">
                                    {t("culture_internacional.title")}
                                </SectionTitle>
                                <Underline />
                            </Head>
                        </Reveal>

                        <Stagger amount={0.12}>
                            <EcoGrid>
                                {[
                                    t("culture_internacional.content_line1"),
                                    t("culture_internacional.content_line2"),
                                    t("culture_internacional.content_line3"),
                                ].map((line, i) => (
                                    <EcoCard
                                        key={i}
                                        $bg={ecoColors[i]}
                                        variants={riseItem}
                                        whileHover={cardLift}
                                    >
                                        <EcoNum>{i + 1}</EcoNum>
                                        <Paragraph>{HL(line)}</Paragraph>
                                    </EcoCard>
                                ))}
                            </EcoGrid>
                        </Stagger>
                    </Inner>
                </Section>
            </Body>
        </Fragment>
    );
};

export default Culture;

export const pageQuery = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
