import React from "react"
import styled from 'styled-components'
import data from '../content/content.json'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { breakpoints } = styles;


const Showcase = ({path}) => {
  // This should not load (hack applied to PageWrapper)
  const ShowcaseMainContainer = styled.div`
    padding-bottom: 151px;
    align-items: center; /* Center vertically */
    display: flex; /* Use flexbox */
    @media (min-width: ${breakpoints.m}px) {
        justify-content: center; /* Center horizontally */
        padding-bottom: 167px;
    }
  `
  return (
      <div></div>
  );
}

export default Showcase;