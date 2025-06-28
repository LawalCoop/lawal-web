import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

const Seo = () => {
  const title = "Lawal - Cooperativa de Software";
  const url = `https://lawal.coop`;
  const favicon = require("../../images/favicon.png").default;
  const og = require("../../images/og.jpg").default;
  const description =
    "Somos una cooperativa de desarrollo de software especializada en brindar servicios profesionales relacionados a tecnologías tales como Data Science, Machine Learning, Sistemas de alta concurrencia y Full-Stack";

  return (
    <Fragment>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <link rel="icon" sizes="16x16" type="image/png" href={favicon} />
        <link rel="icon" sizes="32x32" type="image/png" href={favicon} />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          type="image/png"
          href={favicon}
        />
        <link
          rel="apple-touch-startup-image"
          sizes="512x512"
          type="image/png"
          href={favicon}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <link rel="canonical" key={url} href={url} />

        <meta name="description" content={description} />

        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta property="og:image" content={og} />

        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={og} />
      </Helmet>
    </Fragment>
  );
};

export default Seo;
