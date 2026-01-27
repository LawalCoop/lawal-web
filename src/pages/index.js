import React, {Fragment} from "react"
import { graphql } from "gatsby"
import HomepageHeader from "../components/modules/HomepageHeader"
import HomepageCulture from "../components/modules/HomepageCulture"
import HomepageLabs from "../components/modules/HomepageLabs"
import Services from "./servicios"

const Index = (props) => {
  return (
    <Fragment>
        <HomepageHeader/>
        <Services ishomepage="true" />
        <HomepageCulture />
        <HomepageLabs/>
    </Fragment>
  );
}

export default Index

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
