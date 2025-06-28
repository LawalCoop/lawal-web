import React, { Fragment } from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Lab from "../components/modules/Lab";
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next";
import SectionHeader from "../components/common/SectionHeader";
import data from "../content/content.json";

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints, fontWeight } = styles;

const PostsMainContainer = styled.div`
  background-color: ${colors.yellow};
  display: flex;
  justify-content: center;
  padding: 30px 20px 109px 20px;
  @media (min-width: ${breakpoints.m}px) {
    padding: 52px 20px 163px 20px;
  }
  @media (min-width: ${breakpoints.xl}px) {
    padding: 52px 0px 168px 0px;
  }
`;
const PostsContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 0;
  @media (min-width: ${breakpoints.m}px) {
    max-width: 1140px;
    justify-content: flex-start;
    margin: auto;
    gap: 36px;
    padding: 0;
  }
`;
const PostsTitle = styled.h2`
  flex-basis: 100%;
  font-size: 1.72em;
  font-weight: ${fontWeight.medium};
  line-height: 37px;
  text-align: center;
  color: ${colors.darkMainBg};
  margin-bottom: 20px;
  @media (min-width: ${breakpoints.m}px) {
    font-size: 2.83em;
    line-height: 59px;
    margin-bottom: 24px;
  }
`;

const Labs = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const { t } = useTranslation();
  const { language } = useI18next();

  const Labs = edges.map((edge) => {
    const image = edge.node.frontmatter.image.childImageSharp.gatsbyImageData;
    const english = edge.node.frontmatter.english;

    if ((english && language == "en") || (!english && language == "es")) {
      return (
        <Lab
          key={edge.node.frontmatter.id}
          image={image}
          styles={styles}
          labData={edge.node}
        ></Lab>
      );
    }
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
          <PostsTitle>
            {t("casos_de_exito.title")}
          </PostsTitle>
          {Labs}
        </PostsContainer>
      </PostsMainContainer>
    </Fragment>
  );
};

export default Labs;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
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
