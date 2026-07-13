import React, {Fragment} from "react"
import { graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"
import HomepageHeader from "../components/modules/HomepageHeader"
import HomepageCulture from "../components/modules/HomepageCulture"
import HomepageLabs from "../components/modules/HomepageLabs"
import HomeManifesto from "../components/modules/HomeManifesto"
import HomeCTA from "../components/modules/HomeCTA"
import Marquee from "../components/common/Marquee"
import data from "../content/content.json"
import Services from "./servicios"

const { colors } = data.styles;

const Index = (props) => {
  const { t } = useTranslation();
  return (
    <Fragment>
        <HomepageHeader/>
        <Marquee subtle separator="·" text={t("home_marquee")} bg={colors.purplePrimary} color={colors.lightGrey} sep={colors.yellow} direction={1} duration={34} />
        <Services ishomepage="true" />
        <HomepageCulture />
        <HomeManifesto />
        <HomepageLabs/>
        <Marquee subtle separator="·" text={t("home_marquee")} bg={colors.purplePrimary} color={colors.lightGrey} sep={colors.yellow} direction={-1} duration={38} />
        <HomeCTA />
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
