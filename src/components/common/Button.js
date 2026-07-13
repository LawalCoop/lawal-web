import React from "react";
// Link localizado de i18next: prefija el idioma (/es/…, /en/…) y navega client-side sin
// romper la transición de página. El Link plano de gatsby generaba rutas sin prefijo
// (/servicios) que interrumpían el "door" (se veía la nueva vista antes de cerrar).
import { Link } from "gatsby-plugin-react-i18next";
import styled from "styled-components";

const BtnImg = styled.img`
  display: ${(props) => props.imgDisplay};
  height: 20px;
  margin-right: 6px;
`;
const setSharedStyles = (type) => {
  return `
        margin: 0 10px 10px 0;
        padding: 11px 24px;
        font-size: ${type.fontSize || "16px"};
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        color: ${type.color};
        background-color: ${type.background};
        border-radius: 6px;
        border: 3px solid #000;
        box-shadow: 4px 4px 0 #000;
        transition: transform 0.12s ease, box-shadow 0.12s ease;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0 #000;
        }
        &:active {
            transform: translate(2px, 2px);
            box-shadow: 1px 1px 0 #000;
        }
        &:focus-visible {
            outline: 3px solid ${type.background === "#FFBE69" ? "#000" : "#FFBE69"};
            outline-offset: 3px;
        }
    `;
};

const BtnLink = styled(Link)`
  ${(props) => setSharedStyles(props.$btnStyles)}
`;
// Ancla plana para links externos (target _blank / URLs http, mailto, tel).
const BtnAnchor = styled.a`
  ${(props) => setSharedStyles(props.$btnStyles)}
`;
const BtnCta = styled.button`
  ${(props) => setSharedStyles(props.$btnStyles)}
`;

const Button = (props) => {
  const getBtnStyles = (type) => {
    switch (type) {
      case "btnPrimaryOrange":
        return {
          background: props.theme.colors.orangeMain,
          borderColor: props.theme.colors.darkMainBg,
          boxShadow: props.theme.colors.darkMainBg,
          fontWeight: props.theme.fontWeight.bold,
          color: props.theme.colors.white,
          imgDisplay: "none",
        };
      case "btnPrimaryWhite":
        return {
          background: props.theme.colors.white,
          borderColor: props.theme.colors.darkMainBg,
          boxShadow: props.theme.colors.darkMainBg,
          fontWeight: props.theme.fontWeight.bold,
          color: props.theme.colors.darkMainBg,
          imgDisplay: "none",
        };
      case "btnPrimaryOrangePurple":
        return {
          background: props.theme.colors.orangeMain,
          borderColor: props.theme.colors.purplePrimary,
          boxShadow: props.theme.colors.purplePrimary,
          fontWeight: props.theme.fontWeight.bold,
          color: props.theme.colors.white,
          imgDisplay: "none",
        };
      case "btnPrimaryYellow":
        return {
          background: props.theme.colors.yellow,
          borderColor: props.theme.colors.purplePrimary,
          boxShadow: props.theme.colors.purplePrimary,
          fontWeight: props.theme.fontWeight.bold,
          color: props.theme.colors.purplePrimary,
          imgDisplay: "none",
        };
      case "btnPrimaryPurple":
        return {
          background: props.theme.colors.white,
          borderColor: props.theme.colors.purplePrimary,
          boxShadow: props.theme.colors.purplePrimary,
          fontWeight: props.theme.fontWeight.bold,
          color: props.theme.colors.purplePrimary,
          imgDisplay: "none",
        };
      case "btnSecondary":
        return {
          background: props.theme.colors.transparent,
          borderColor: props.theme.colors.lightGrey,
          boxShadow: props.theme.colors.lightGrey,
          fontSize: "14px",
          fontWeight: props.theme.fontWeight.medium,
          color: props.theme.colors.darkGrey,
          imgDisplay: "none",
        };
      case "btnLabeled":
        return {
          background: props.theme.colors.white,
          borderColor: props.theme.colors.darkMainBg,
          boxShadow: props.theme.colors.darkMainBg,
          fontWeight: props.theme.fontWeight.bold,
          color: props.theme.colors.darkMainBg,
          imgDisplay: "static",
        };
      default:
        return {
          background: props.theme.colors.white,
          borderColor: props.theme.colors.darkMainBg,
          boxShadow: props.theme.colors.darkMainBg,
          fontWeight: props.theme.fontWeight.bold,
          color: props.theme.colors.darkMainBg,
          imgDisplay: "none",
        };
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (props.onButtonClick) props.onButtonClick(event);
  };

  // Un link es externo si abre en otra pestaña o apunta a un protocolo/host absoluto.
  const href = props.href || "";
  const isExternal =
    props.target === "_blank" ||
    /^(https?:)?\/\//.test(href) ||
    /^(mailto:|tel:)/.test(href);
  // Para internos, normalizo a ruta absoluta para que el Link de i18next la localice.
  const internalTo = href && !href.startsWith("/") ? `/${href}` : href;
  const btnIcon = (
    <BtnImg
      imgDisplay={getBtnStyles(props.type).imgDisplay}
      src={
        props.github
          ? require("../../images/icon_github.svg").default
          : require("../../images/icon_website.svg").default
      }
    />
  );

  return props.isLink ? (
    isExternal ? (
      <BtnAnchor
        href={props.href}
        className={props.className}
        $btnStyles={getBtnStyles(props.type)}
        theme={props.theme}
        target={props.target}
        rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {btnIcon}
        {props.btnText}
      </BtnAnchor>
    ) : (
      <BtnLink
        to={internalTo}
        className={props.className}
        $btnStyles={getBtnStyles(props.type)}
        theme={props.theme}
      >
        {btnIcon}
        {props.btnText}
      </BtnLink>
    )
  ) : (
    <BtnCta
      className={props.className}
      $btnStyles={getBtnStyles(props.type)}
      theme={props.theme}
      onClick={handleClick}
    >
      <BtnImg
        imgDisplay={getBtnStyles(props.type).imgDisplay}
        src={
          props.github
            ? require("../../images/icon_github.svg").default
            : require("../../images/icon_website.svg").default
        }
      />
      {props.btnText}
    </BtnCta>
  );
};
export default Button;
