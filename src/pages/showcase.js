import React from "react";
import { graphql } from "gatsby";
const Showcase = ({ path }) => {
  return <div></div>;
};

export default Showcase;

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
`
