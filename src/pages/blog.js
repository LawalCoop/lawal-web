import React, { useState, useEffect }  from 'react'
import { graphql } from 'gatsby';
import styled from 'styled-components'
import data from '../content/content.json'
import { useI18next } from "gatsby-plugin-react-i18next"

import Button from '../components/common/Button'
import PostThumbnail from '../components/modules/PostThumbnail'
import SectionIntro from '../components/common/SectionIntro'
import { buildLayout } from '../components/common/bento'

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
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 22px;
    padding: 0;
    margin: auto;
    @media (min-width: ${breakpoints.m}px) {
      max-width: 1140px;
      grid-template-columns: repeat(6, 1fr);
      gap: 30px;
    }
`

// El encabezado ocupa la fila completa del grid bento.
const BlogHeadCell = styled.div`
  grid-column: 1 / -1;
`
const Btn = styled(Button)`
  margin: 0px auto 15px auto;
`


const Blog = ({data: {allMarkdownRemark: { edges }}})  =>  {
  const { language, t } = useI18next();
  const [currentPostsList, setCurrentPostsList] = useState([])
  const [visiblePosts, setVisiblePosts] = useState([])
  const [postsLimit, setPostsLimit] = useState(9)
  const postsAdd = 6

  useEffect(() => {
    const tempPostsList = edges.filter(
      (edge) => edge.node.frontmatter.lang === language
    );
    setCurrentPostsList(tempPostsList);
  }, [edges, language]);

  useEffect(() => {
    setVisiblePosts(currentPostsList.slice(0, postsLimit));
  }, [currentPostsList, postsLimit]);
  
  const showMorePosts = () => {
    if(postsLimit<=currentPostsList.length){
      setPostsLimit(postsLimit+postsAdd)
    }
  }

  // Distribución bento (filas de 3 → 2 → 1) según cuántos posts se muestran.
  const bentoLayout = buildLayout(visiblePosts.length);


    return (
      <MainWrapper>
      <PostsContainer>
        <PostsWrapper>
            <BlogHeadCell>
              <SectionIntro
                as="h1"
                title={t("blog.title")}
                eyebrow={t("blog.eyebrow")}
                sticker={t("blog.sticker")}
                eyebrowBg={colors.yellow}
                eyebrowColor={colors.darkMainBg}
                stickerBg={colors.red}
                stickerColor={colors.white}
                stickerRot={-4}
                titleColor={colors.purplePrimary}
                underlineBg={colors.yellow}
              />
            </BlogHeadCell>

            {visiblePosts.map( (post, index) => {
                const cell = bentoLayout[index] || { span: 2, horizontal: false };
                return(
                  <PostThumbnail
                    key={post.node.id}
                    index={index}
                    span={cell.span}
                    horizontal={cell.horizontal}
                    postTitle={post.node.frontmatter.title}
                    postDescription={post.node.excerpt}
                    tags={post.node.frontmatter.tags}
                    image={post.node.frontmatter.image.childImageSharp.gatsbyImageData}
                    slug={`/${post.node.frontmatter.lang}/post${post.node.frontmatter.slug}`}
                    shortSlug={`/post${post.node.frontmatter.slug}`}
                  />
                )
            })}

          </PostsWrapper>
          {visiblePosts.length < currentPostsList.length &&
            <Btn
              isLink={false}
              type='btnPrimaryPurple'
              theme={styles}
              to="#"
              btnText={t('verMasArticulos')}
              onButtonClick = {showMorePosts}
            />
          }
        </PostsContainer>
    </MainWrapper>

    )
}

export default Blog;

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
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
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
