import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import data from "../../content/content.json";
import Seo from "../common/Seo";

require("../../styles/styles.css");

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints } = styles;

const Wrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  background: ${colors.white};
`;
const PageContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  padding-top: 62px;
  @media (min-width: ${breakpoints.xl}px) {
    padding-top: 76px;
  }
`;
const PageWrapper = (props) => {
  const ishomepage = "false";

  // Hack to redirect /showcase to the showcase.pdf
  let path = props.location.pathname;

  const data = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);

  if (path.includes("/showcase")) {
    const pdfUrl = "/showcase.pdf";

    if (typeof window !== `undefined`) {
      // redirect if window is available (client)
      window.location.href = `${window.location.origin}${pdfUrl}`;
    }

    return <div></div>;
  }

  return (
    <Wrapper>
      <Seo></Seo>
      <Header
        menuLinks={data.site.siteMetadata.menuLinks}
        location={props.location}
        ishomepage={ishomepage}
      ></Header>
      <PageContainer> {props.children}</PageContainer>
      <Footer></Footer>
    </Wrapper>
  );
};

export default PageWrapper;
