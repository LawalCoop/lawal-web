const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve("src/blogTemplates/blogPost.js");
  const query = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              date
              slug
              lang
              title
            }
          }
        }
      }
    }
  `);

  if (query.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
  }

  const postsBySlug = new Map();
  query.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const slug = node.frontmatter.slug;
    if (!postsBySlug.has(slug)) {
      postsBySlug.set(slug, node);
    }
  });

  // Post template pages and context
  postsBySlug.forEach((node) => {
    createPage({
      path: `/post${node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });

};
