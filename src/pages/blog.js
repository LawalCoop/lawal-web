import React, { useState, useEffect, Fragment }  from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'
import data from '../content/content.json'
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"

import Button from '../components/common/Button'
import PostThumbnail from '../components/modules/PostThumbnail'

// Desestructurar las propiedades para evitar warnings de webpack
const { styles } = data;
const { colors, breakpoints } = styles;

const MainWrapper = styled.div`
  background-color: ${colors.celestin};
  padding-bottom: 180px;
  @media (min-width: ${breakpoints.m}px) {
    padding-bottom: 228px;
  }
`
const PostsContainer = styled.div`
  padding: 40px 20px 0 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (min-width: ${breakpoints.lpx}) {
    padding-top: 55px;
    padding-left: 0;
    padding-right: 0;
  }
`
const PostsWrapper = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    gap: 10px;
    padding: 0;
    max-width: 946px;
    @media (min-width: ${breakpoints.m}px) {
      justify-content: flex-start;
      margin: auto;
      gap: 23px;
      padding: 0;
    }
    @media (min-width: ${breakpoints.l}px) {
     width: 946px;
    }
`

const BlogTitle = styled.h1`
  flex-basis: 100%;
  font-size: 2.38em;
  line-height: 49px;
  color: ${colors.purplePrimary};
  margin: 0 auto 25px auto;
  text-align: center;
  @media (min-width: ${breakpoints.m}px) {
    text-align: left;
    font-size: 3em;    
    line-height: 62px;
    margin-bottom: 35px;
  }
`
const Btn = styled(Button)`
  margin: 0px auto 15px auto;
`


const Blog = ({data: {allMarkdownRemark: { edges }}})  =>  {
  const { t } = useTranslation();
  const { language } = useI18next();
  const [currentPostsList, setCurrentPostsList] = useState([])
  const [visiblePosts, setVisiblePosts] = useState([])
  const [postsLimit, setPostsLimit] = useState(6)
  const postsAdd = 6

  useEffect(()=>{
    let tempPostsList = []
    edges.forEach(edge => {
      if(edge.node.frontmatter.lang === language){
        tempPostsList.push(edge)
      }
      setCurrentPostsList([...tempPostsList])
    });
  }, [])

  useEffect(()=>{
    if(currentPostsList.length !== 0){
      setVisiblePosts(currentPostsList.slice(0,postsLimit))
    }
  }, [currentPostsList])

  useEffect (()=>{
    setVisiblePosts(currentPostsList.slice(0,postsLimit))
  }, [postsLimit])
  
  const showMorePosts = () => {
    if(postsLimit<=currentPostsList.length){
      setPostsLimit(postsLimit+postsAdd)
    }
  }


    return (
      <MainWrapper>
      <PostsContainer>
        <PostsWrapper>
            <BlogTitle>Blog</BlogTitle>

            {visiblePosts.map( post => {
                return(
                  <PostThumbnail 
                    postTitle={post.node.frontmatter.title}
                    postDescription={post.node.excerpt}
                    image={post.node.frontmatter.image.childImageSharp.gatsbyImageData}
                    slug={`/${post.node.frontmatter.lang}/post${post.node.frontmatter.slug}`}
                    shortSlug={`/post${post.node.frontmatter.slug}`}
                  />
                )
            })}

          </PostsWrapper>
          <Btn
            isLink={false}
            type='btnPrimaryPurple'
            theme={styles}
            to="#"
            btnText={t( 'verMasArticulos')}
            onButtonClick = {showMorePosts}
          />
        </PostsContainer>
    </MainWrapper>

    )
}

export default Blog;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {type: {eq: "post"}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 95)
          frontmatter {
            lang
            type
            title
            author
            slug
            date
            tags
            image{
              childImageSharp {
                gatsbyImageData(width: 800)
              }
            }
            imageCredits
          }
        }
      }
    }
  }
`