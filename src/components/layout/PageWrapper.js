import React, { useEffect, useRef } from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { useI18next } from "gatsby-plugin-react-i18next";
import Header from "../common/Header";
import Footer from "../common/Footer";
import data from "../../content/content.json";
import Seo from "../common/Seo";
import ScrollProgress from "../common/ScrollProgress";

require("../../styles/styles.css");

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints } = styles;

// Quita el prefijo de idioma del pathname para que togglear ES/EN en la misma
// página NO dispare la transición de página (solo cambia el contenido, no la ruta lógica).
const stripLangPrefix = (path, lang) =>
  path.replace(new RegExp(`^/${lang}(?=/|$)`), "") || "/";

// Flag a nivel módulo: false en la primera carga (fresh load / recarga), true una vez
// hidratado. Persiste entre navegaciones SPA pero se reinicia al recargar la página.
// Sirve para NO disparar el wipe en la carga inicial, pero SÍ en las navegaciones.
let hasHydrated = false;

const Wrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
  background: ${colors.white};
`;
const PageContainer = styled(motion.section)`
  width: 100%;
  margin: 0 auto;
  padding-top: 62px;
  @media (min-width: ${breakpoints.xl}px) {
    padding-top: 76px;
  }
`;
// Transición de página estilo "doors": un par de paneles (arriba y abajo) se CIERRAN
// cubriendo la página vieja y luego se ABREN revelando la nueva. Sin flash blanco.
//
// Orquestación con AnimatePresence mode="wait":
//  - la sección que SALE anima sus puertas a "closed" (exit) → cierran sobre lo viejo.
//  - recién ahí se desmonta y monta la sección nueva, cuyas puertas van de "closed" a
//    "open" (initial→animate) → abren sobre lo nuevo. El swap ocurre oculto.
const doorBase = `
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9998;
  pointer-events: none;
  overflow: hidden;
  /* Promover a capa propia del compositor: la animación de la puerta corre en el hilo
     del compositor (GPU) y no se traba aunque el main thread esté ocupado montando una
     vista pesada como cultura. Los hijos (W + aro con filtros) se rasterizan una vez. */
  will-change: transform;
  backface-visibility: hidden;
`;
// Verde teal de marca para la transición (elegido por el usuario).
const doorColor = "#4E9384";
const DoorTop = styled(motion.div)`
  ${doorBase}
  top: 0;
  /* Llega hasta la costura (centro visual) + 1px de solape para tapar cualquier hairline
     entre las dos puertas. dvh sigue el viewport real en mobile; vh es el fallback. */
  height: calc(50vh + 1px);
  height: calc(50dvh + 1px);
  background: ${doorColor};
`;
const DoorBottom = styled(motion.div)`
  ${doorBase}
  /* Anclada por su borde SUPERIOR a la MISMA costura que el borde inferior de DoorTop.
     Antes se anclaba a bottom:0 + la W usaba bottom:50vh, que en mobile (barra de
     direcciones dinámica) no coincide con el top:50vh de la mitad de arriba y partía la W.
     Ahora ambas mitades referencian la misma línea desde arriba (50dvh) → W siempre entera. */
  top: 50vh;
  top: 50dvh;
  bottom: 0;
  background: ${doorColor};
`;

// Isologo "W" partido en la costura: la MISMA imagen va en ambas puertas anclada al
// centro del viewport (50vh). El overflow de cada puerta recorta su mitad; como las dos
// llevan la W en idéntica posición, al cerrar se superponen y forman la W completa (sin
// costura), y al abrir cada mitad viaja con su puerta.
const W_LOGO_SRC = "/Lawal_Iso_w_oscuro.png";
const seamLogoWidth = "clamp(240px, 46vw, 420px)";
// La W es pesada arriba (barra ancha) y liviana abajo (puntas): un pequeño empuje óptico
// hacia abajo la hace leer centrada dentro del aro. Se aplica al logo Y al reflejo por igual.
const logoNudge = "1.6%";
// Deboss: relleno en un tono apenas más oscuro que el fondo + reborde de luz abajo y
// sombra arriba (drop-shadow), para que la W parezca hundida/grabada en la superficie.
const debossFill = "#458371";
const debossFilter =
  "drop-shadow(0 2px 0.6px rgba(255,255,255,0.30)) drop-shadow(0 -1.5px 0.6px rgba(0,0,0,0.32))";
// La W se renderiza como máscara (no como <img>) para poder teñirla con el tono del deboss.
const WLogo = styled.div`
  position: absolute;
  left: 50%;
  width: ${seamLogoWidth};
  aspect-ratio: 1 / 1;
  background: ${debossFill};
  -webkit-mask: url(${W_LOGO_SRC}) center / contain no-repeat;
  mask: url(${W_LOGO_SRC}) center / contain no-repeat;
  filter: ${debossFilter};
  pointer-events: none;
  /* Las dos mitades se anclan a la MISMA costura (centro de las puertas) desde arriba:
     la de arriba a 50dvh dentro de su puerta (top:0), la de abajo a 0 dentro de la suya
     (top:50dvh). Mismo centro, mismo nudge → la W se lee entera también en mobile. */
  ${(p) =>
    p.$half === "top"
      ? `top: 50vh; top: 50dvh; transform: translate(-50%, calc(-50% + ${logoNudge}));`
      : `top: 0; transform: translate(-50%, calc(-50% + ${logoNudge}));`}
`;

// Anillo alrededor de la W, partido igual que el logo: cada puerta lleva un círculo
// anclado al centro del viewport, y al cerrar las dos mitades forman el aro completo.
const logoDark = "#202A33";
const seamRingSize = "clamp(138px, 20vw, 200px)";
const WRing = styled.div`
  position: absolute;
  left: 50%;
  width: ${seamRingSize};
  height: ${seamRingSize};
  box-sizing: border-box;
  border-radius: 50%;
  /* Aro fino y grabado: tono apenas más oscuro + reborde de luz abajo / sombra arriba */
  border: 2.5px solid #3f7a68;
  filter: drop-shadow(0 1.5px 0.5px rgba(255, 255, 255, 0.24))
    drop-shadow(0 -1px 0.5px rgba(0, 0, 0, 0.22));
  pointer-events: none;
  ${(p) =>
    p.$half === "top"
      ? `top: 50vh; top: 50dvh; transform: translate(-50%, -50%);`
      : `top: 0; transform: translate(-50%, -50%);`}
`;

// Brillo/reflejo que barre la W al unirse: una banda de luz diagonal enmascarada con la
// silueta del logo (mask con el mismo PNG), así el gleam aparece SOLO sobre la W. Se monta
// con las puertas de ENTRADA (ya cerradas), disparando justo cuando la W queda formada.
const ShineWrap = styled.div`
  position: fixed;
  left: 50%;
  top: 50vh;
  top: 50dvh;
  width: ${seamLogoWidth};
  aspect-ratio: 1 / 1;
  transform: translate(-50%, calc(-50% + ${logoNudge}));
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
  -webkit-mask: url(${W_LOGO_SRC}) center / contain no-repeat;
  mask: url(${W_LOGO_SRC}) center / contain no-repeat;
`;
const ShineBand = styled(motion.div)`
  position: absolute;
  top: -25%;
  left: 0;
  width: 42%;
  height: 150%;
  transform: rotate(18deg);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
`;
const Shine = () => (
  <ShineWrap>
    <ShineBand
      initial={{ x: "-160%", opacity: 0 }}
      animate={{ x: ["-160%", "320%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.6, delay: 0.12, times: [0, 0.15, 0.85, 1], ease: "easeInOut" }}
    />
  </ShineWrap>
);

// closed = cubriendo (y:0); open = fuera de pantalla (arriba/abajo).
// Cerrar: rápido y sin demora. Abrir: con delay para sostener la W unida + el spark.
const doorEase = [0.83, 0, 0.17, 1];
const doorClose = { duration: 0.42, ease: doorEase };
const doorOpen = { duration: 0.5, ease: doorEase, delay: 0.6 };
const doorTopVariants = {
  closed: { y: "0%", transition: doorClose },
  open: { y: "-101%", transition: doorOpen },
};
const doorBottomVariants = {
  closed: { y: "0%", transition: doorClose },
  open: { y: "101%", transition: doorOpen },
};

// `firstLoad` evita el barrido en la carga inicial: las puertas arrancan directamente
// abiertas (sin animar) y solo cierran/abren en navegaciones posteriores.
const Doors = ({ firstLoad }) => (
  <React.Fragment>
    <DoorTop
      variants={doorTopVariants}
      initial={firstLoad ? "open" : "closed"}
      animate="open"
      exit="closed"
    >
      <WRing $half="top" />
      <WLogo $half="top" />
    </DoorTop>
    <DoorBottom
      variants={doorBottomVariants}
      initial={firstLoad ? "open" : "closed"}
      animate="open"
      exit="closed"
    >
      <WRing $half="bottom" />
      <WLogo $half="bottom" />
    </DoorBottom>
    {/* El brillo solo en navegaciones (no en la carga inicial), al unirse la W. */}
    {!firstLoad && <Shine />}
  </React.Fragment>
);
// Resetea el scroll al top cuando la nueva vista monta. Va DENTRO del PageContainer
// (que remonta por ruta), y con AnimatePresence mode="wait" ese montaje ocurre con las
// puertas ya cerradas cubriendo la pantalla → el salto de scroll no se ve. No lo hacemos
// si hay hash en la URL (deep-link a una sección: lo maneja el plugin de anchor links).
const ScrollTop = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);
  return null;
};

const PageWrapper = (props) => {
  const ishomepage = "false";
  const { language } = useI18next();
  // En la primera carga no animamos el wipe (evita flash), pero los hijos animan normal.
  const isFirstLoad = !hasHydrated;
  useEffect(() => {
    hasHydrated = true;
  }, []);

  const path = props.location.pathname;
  // Clave que ignora el prefijo de idioma: cambiar ES/EN no desmonta la sección (sin wipe),
  // navegar entre páginas sí cambia la clave y dispara la transición.
  const routeKey = stripLangPrefix(path, language);

  // --- Scroll "pinneado" durante la transición ------------------------------------
  // Gatsby (restauración + focus de reach-router) scrollea al top ni bien cambia la ruta,
  // y como el door tarda en cubrir, se veía la vista vieja saltar arriba. Solución: fijar
  // el scroll en su posición previa mientras la puerta cierra, y recién con la pantalla ya
  // cubierta resetear a 0 para la vista nueva. Todo el cambio de scroll queda oculto.
  const lastScrollRef = useRef(0);
  const pinningRef = useRef(false);
  const pinnedKeyRef = useRef(routeKey);
  useEffect(() => {
    const onScroll = () => {
      if (!pinningRef.current) lastScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (pinnedKeyRef.current === routeKey) return;
    pinnedKeyRef.current = routeKey;
    if (isFirstLoad) return;
    if (typeof window === "undefined" || window.location.hash) return;
    const y = lastScrollRef.current;
    pinningRef.current = true;
    // Corregir el scroll a la posición previa: por evento (reacciona al instante cuando
    // Gatsby scrollea) y por rAF (continuo). El evento cubre el caso headless/throttle.
    const force = () => window.scrollTo(0, y);
    force();
    window.addEventListener("scroll", force, { passive: true });
    let raf;
    const loop = () => {
      force();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const COVER_MS = 440; // ~ duración del cierre de la puerta (doorClose 0.42s)
    const t = setTimeout(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", force);
      window.scrollTo(0, 0);
      pinningRef.current = false;
    }, COVER_MS);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", force);
      clearTimeout(t);
      pinningRef.current = false;
    };
  }, [routeKey, isFirstLoad]);

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
    <MotionConfig reducedMotion="user">
      <Wrapper>
        <ScrollProgress />
        <Seo></Seo>
        <Header
          menuLinks={data.site.siteMetadata.menuLinks}
          location={props.location}
          ishomepage={ishomepage}
        ></Header>
        <AnimatePresence mode="wait">
          <PageContainer key={routeKey}>
            <ScrollTop />
            {props.children}
            <Doors firstLoad={isFirstLoad} />
          </PageContainer>
        </AnimatePresence>
        <Footer></Footer>
      </Wrapper>
    </MotionConfig>
  );
};

export default PageWrapper;
