import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import {
  FaCalendar,
  FaRegCalendarCheck,
} from 'react-icons/fa';

import { PageTagQuery } from '../../graphql-types';
import { TagsContext } from '../../gatsby-node';
import { PostList } from './posts';
import { SEO } from '../components/templates/Seo';
import { Title } from '../components/Atom';
import { Card } from '../components/molecules/Card';

type Props = {
  data: PageTagQuery;
  location: Location;
  pageContext: TagsContext;
};

const Tags: React.FC<Props> = ({
  data,
  location,
  pageContext,
}) => (
  <>
    <SEO
      pagetitle={pageContext.tagsname}
      pagedesc={`カテゴリー別ページ | ${pageContext.tagsname}`}
      pagepath={location.pathname}
    />
    <Title>{pageContext.tagsname}</Title>
    <section css={PostList}>
      {data.allMicrocmsPosts?.edges?.map((edge) => {
        const posts = edge.node;
        return (
          <React.Fragment key={posts.id}>
            <Card
              postsId={posts.postsId}
              title={posts.title}
              fluidImage={
                posts.fields?.featuredImage?.fluid
              }
              createdAt={posts.createdAt}
              updatedAt={posts.updatedAt}
            />
          </React.Fragment>
        );
      })}
    </section>
    <div>
      {!pageContext.isFirst && (
        <div>
          <Link
            to={
              pageContext.currentPage === 2
                ? `/posts/`
                : `/posts/${pageContext.currentPage - 1}`
            }
            rel="prev"
          >
            <span>前のページ</span>
          </Link>
        </div>
      )}
      {!pageContext.isLast && (
        <div>
          <Link
            to={`/posts/${pageContext.currentPage + 1}/`}
            rel="next"
          >
            <span>次のページ</span>
          </Link>
        </div>
      )}
    </div>
  </>
);

export const query = graphql`
  query PageTag(
    $tagsId: String!
    $skip: Int!
    $limit: Int!
  ) {
    allMicrocmsPosts(
      sort: { fields: day, order: DESC }
      skip: $skip
      limit: $limit
      filter: {
        tags: { elemMatch: { slug: { eq: $tagsId } } }
      }
    ) {
      edges {
        node {
          id
          postsId
          title
          createdAt(locale: "ja", formatString: "YYYY/M/DD")
          updatedAt(locale: "ja", formatString: "YYYY/M/DD")
          tags {
            id
            name
          }
          fields {
            featuredImage {
              fluid(maxHeight: 120, maxWidth: 360) {
                src
                sizes
                base64
                aspectRatio
                srcSet
                srcSetWebp
                srcWebp
              }
            }
          }
        }
      }
    }
  }
`;

export default Tags;
