import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import unified from 'unified';
import parse from 'rehype-parse';
import { css } from '@emotion/core';
import htmlToText from 'html-to-text';
import {
  FaCalendar,
  FaRegCalendarCheck,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from 'react-icons/fa';
import {
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
} from 'react-share';

import { PostContext } from '../gatsby-node';
import { renderAst } from '../lib/renderHtml';
import { colors, sizes, mq, typography } from '../theme';
import { SEO } from '../components/templates/Seo';
import { CoffeeButton } from '../components/molecules/CoffeeButton';

type Props = {
  pageContext: PostContext;
  location: Location;
};

const PostContainer = css({
  '& .PostTitle': {
    color: colors.blue,
  },
  '& a': {
    textDecoration: 'none',
    '& .tagName': {
      marginRight: sizes[2],
      marginLeft: sizes[2],
      border: `solid ${sizes.px} ${colors.lightgray}`,
      borderRadius: sizes[2],
      padding: sizes[1],
      backgroundColor: colors.lightBlue,
      color: colors.white,
    },
  },
  '& .PostDay': {
    marginTop: sizes[3],
    display: 'flex',
    '& .PostDayItem': {
      color: colors.blue,
      marginLeft: sizes[2],
      display: 'flex',
      '& .icon': {
        marginRight: sizes[1],
      },
    },
  },
  '& .PostContent': {
    marginTop: sizes[8],
  },
  '& .PostPageNation': {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: sizes[8],
    '& .PostPageNationNext': {
      display: 'flex',
      alignItems: 'center',
      '& a': {
        textDecoration: 'none',
        color: colors.lightBlue,
        '& span': {
          marginRight: sizes[1],
          fontWeight: typography.fontWeights.semibold,
        },
      },
      '& a:hover': {
        color: colors.blue,
      },
    },
    '& .PostPageNationPrevious': {
      display: 'flex',
      alignItems: 'center',
      '& a': {
        textDecoration: 'none',
        color: colors.lightBlue,
        '& span': {
          marginLeft: sizes[1],
          fontWeight: typography.fontWeights.semibold,
        },
      },
      '& a:hover': {
        color: colors.blue,
      },
      [mq[0]]: {
        display: 'block',
      },
    },
  },
  '& .ShareButton': {
    display: 'flex',
    '& button': {
      marginRight: sizes[2],
      marginBottom: sizes[4],
    },
  },
});

const Post: React.FC<Props> = ({
  pageContext,
  location,
}) => {
  const post = pageContext.post;

  const htmlAst = unified()
    .use(parse, { fragment: true })
    .parse(post.content!);

  return (
    <>
      <SEO
        pagetitle={post.title!}
        pagedesc={`${htmlToText
          .fromString(post.content!, {
            ignoreImage: true,
            ignoreHref: true,
          })
          .slice(0, 70)}....`}
        pagepath={location.pathname}
        postimg={post?.image?.url!}
      />
      <div css={PostContainer}>
        <h1 className="PostTitle">{post.title}</h1>
        {post?.tags?.map(
          (tag) =>
            tag?.id && (
              <React.Fragment key={tag.id}>
                <Link to={`/tags/${tag.id}`}>
                  <span className="tagName">
                    {tag.name}
                  </span>
                </Link>
              </React.Fragment>
            ),
        )}
        <div className="PostDay">
          <div className="PostDayItem">
            <FaCalendar className="icon" />
            <p>投稿:{post.createdAt}</p>
          </div>
          <div className="PostDayItem">
            <FaRegCalendarCheck className="icon" />
            <p>更新:{post.updatedAt}</p>
          </div>
        </div>
        {post?.fields?.featuredImage?.fluid && (
          <Image
            fluid={post.fields.featuredImage.fluid}
            alt="投稿したブログのイメージ画像"
          />
        )}
        <div className="PostContent">
          {renderAst(htmlAst)}
        </div>
        <div className="ShareButton">
          <TwitterShareButton
            title={post.title!}
            url={`https://ryusou.dev/posts/${post.postsId}`}
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <FacebookShareButton
            quote={post.title!}
            url={`https://ryusou.dev/posts/${post.postsId}`}
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <LineShareButton
            title={post.title!}
            url={`https://ryusou.dev/posts/${post.postsId}`}
          >
            <LineIcon size={40} round />
          </LineShareButton>
        </div>
        <a
          href="https://b.hatena.ne.jp/entry/"
          className="hatena-bookmark-button"
          data-hatena-bookmark-layout="vertical-normal"
          data-hatena-bookmark-lang="ja"
          title="このエントリーをはてなブックマークに追加"
        >
          <img
            src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
            alt="このエントリーをはてなブックマークに追加"
            width="20"
            height="20"
            css={{ border: 'none' }}
          />
        </a>
        <CoffeeButton text="もし記事を気に入っていただけたら、サポートよろしくお願いします" />
        <div className="PostPageNation">
          {pageContext.previous && (
            <div className="PostPageNationPrevious">
              <Link
                to={`/posts/${pageContext.previous.postsId}`}
                rel="prev"
              >
                <FaArrowCircleLeft className="icons" />
                <span>{pageContext.previous.title}</span>
              </Link>
            </div>
          )}
          {pageContext.next && (
            <div className="PostPageNationNext">
              <Link
                to={`/posts/${pageContext.next.postsId}`}
                rel="next"
              >
                <span>{pageContext.next.title}</span>
                <FaArrowCircleRight className="icons" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
