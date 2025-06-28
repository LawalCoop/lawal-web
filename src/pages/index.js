import React, {Fragment} from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import HomepageHeader from "../components/modules/HomepageHeader"
import HomepageCulture from "../components/modules/HomepageCulture"
import HomepageLabs from "../components/modules/HomepageLabs"
import Services from "./servicios"

const Index = (props) => {
  const { t } = useTranslation();

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