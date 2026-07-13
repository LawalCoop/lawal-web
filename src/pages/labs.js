import React, { Fragment } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Lab from "../components/modules/Lab";
import { useI18next } from "gatsby-plugin-react-i18next";
import SectionHeader from "../components/common/SectionHeader";
import SectionIntro from "../components/common/SectionIntro";
import { buildLayout } from "../components/common/bento";
import data from "../content/content.json";

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints } = styles;

const PostsMainContainer = styled.div`
  background-color: ${colors.yellow};
  display: flex;
  justify-content: center;
  /* El footer de contacto (ContactWrapper) se solapa hacia arriba (top:-163px),
     así que dejamos padding-bottom extra para que la última card no quede pegada. */
  padding: 30px 20px 230px 20px;
  @media (min-width: ${breakpoints.m}px) {
    padding: 52px 20px 280px 20px;
  }
  @media (min-width: ${breakpoints.xl}px) {
    padding: 52px 0px 290px 0px;
  }
`;
const PostsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  padding: 0;
  margin: auto;
  @media (min-width: ${breakpoints.m}px) {
    max-width: 1140px;
    grid-template-columns: repeat(6, 1fr);
    gap: 30px;
  }
`;
// El encabezado ocupa la fila completa del grid bento.
const HeadCell = styled.div`
  grid-column: 1 / -1;
`;

const Labs = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const { language, t } = useI18next();

  const filtered = edges.filter((edge) => {
    const english = edge.node.frontmatter.english;
    return (english && language === "en") || (!english && language === "es");
  });
  const layout = buildLayout(filtered.length);

  const Labs = filtered.map((edge, index) => {
    const image = edge.node.frontmatter.image.childImageSharp.gatsbyImageData;
    const cell = layout[index] || { span: 2, horizontal: false };
    return (
      <Lab
        key={edge.node.frontmatter.id}
        index={index}
        span={cell.span}
        horizontal={cell.horizontal}
        image={image}
        styles={styles}
        labData={edge.node}
      ></Lab>
    );
  });

  return (
    <Fragment>
      <SectionHeader
        section="labs"
        title={t("labs.title")}
        subtitle={t("labs.subtitle")}
        description={t("labs.content")}
      />
      <PostsMainContainer>
        <PostsContainer>
          <HeadCell>
            <SectionIntro
              title={t("casos_de_exito.title")}
              eyebrow={t("casos_de_exito.eyebrow")}
              sticker={t("casos_de_exito.sticker")}
              eyebrowBg={colors.red}
              eyebrowColor={colors.white}
              stickerBg={colors.purpleLight}
              stickerColor={colors.white}
              stickerRot={4}
              underlineBg={colors.darkMainBg}
            />
          </HeadCell>
          {Labs}
        </PostsContainer>
      </PostsMainContainer>
    </Fragment>
  );
};

export default Labs;

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
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { type: { eq: "lab" } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            type
            date(formatString: "MMMM DD, YYYY")
            id
            title
            tags
            image {
              childImageSharp {
                gatsbyImageData(width: 1500, quality: 50)
              }
            }
            website
            github
            english
          }
        }
      }
    }
  }
`;
