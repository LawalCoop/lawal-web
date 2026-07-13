// Desactivamos el scroll automático de Gatsby en las navegaciones.
//
// Por defecto Gatsby hace scroll-to-top al cambiar de ruta, y como algunos CTAs están
// al pie de la página, se veía la vista vieja "saltar" al top ANTES de que la transición
// "door" la cubriera. En cambio, el reset de scroll lo maneja PageWrapper (componente
// ScrollTop) cuando la nueva vista MONTA, que con AnimatePresence mode="wait" ocurre ya
// con las puertas cerradas cubriendo la pantalla → el salto queda oculto.
export const shouldUpdateScroll = () => false;
