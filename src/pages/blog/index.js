import * as React from 'react';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import { Link, graphql } from 'gatsby';

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <Link to={`./${node.frontmatter.slug}`}>
            <h2>{node.frontmatter.title}</h2>
          </Link>
          <p>Posted: {node.frontmatter.date}</p>
          <p>Updated: {node.parent.modifiedTime}</p>
          <p>{node.excerpt}</p>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMM DD, YYYY")
          slug
        }
        id
        excerpt
        parent {
          ... on File {
            id
            modifiedTime(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

export const Head = () => <Seo title="My Blog Posts" />;

export default BlogPage;
