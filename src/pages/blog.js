import React, { Fragment }  from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'

const PostsContainer = styled.div`

`

const Blog = ({data: {allMarkdownRemark: { edges }}})  =>  {

    const Posts = edges.map(  edge => {
      console.log(edge)
    } )

    return <PostsContainer>{Posts}</PostsContainer>

  }

export default Blog;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {type: {eq: "post"}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            type
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            image{
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`