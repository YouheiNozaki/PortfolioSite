import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type Props = {
  pagetitle?: string;
  pagedesc?: string;
  pagepath?: string;
  pageimg?: string;
  postimg?: string;
  pageimgw?: string;
  pageimgh?: string;
};

export const SEO: React.FC<Props> = (props) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          lang
          description
          siteUrl
          locale
          fbappid
        }
      }
    }
  `);

  const title = props.pagetitle
    ? `${props.pagetitle} | ${data.site.siteMetadata.title}`
    : data.site.siteMetadata.title;
  const description =
    props.pagedesc || data.site.siteMetadata.description;
  const url = props.pagepath
    ? `${data.site.siteMetadata.siteUrl}${props.pagepath}`
    : data.site.siteMetadata.siteUrl;
  const imgurl = props.pageimg
    ? `${data.site.siteMetadata.siteUrl}${props.pageimg}`
    : props.postimg ||
      `${data.site.siteMetadata.siteUrl}/thumb.png`;
  const imgw = props.pageimgw || '1280px';
  const imgh = props.pageimgh || '640px';

  return (
    <Helmet>
      <html lang={data.site.siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        property="og:site_name"
        content={data.site.siteMetadata.title}
      />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description}
      />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta
        property="og:locale"
        content={data.site.siteMetadata.locale}
      />
      <meta
        property="fb:app_id"
        content={data.site.siteMetadata.fbappid}
      />
      <meta property="og:image" content={imgurl} />
      <meta property="og:image:width" content={imgw} />
      <meta property="og:image:height" content={imgh} />
      <meta
        name="twitter:card"
        content="summary_large_image"
      />
      {/* はてなブックマークのスクリプト */}
      <script
        type="text/javascript"
        src="https://b.st-hatena.com/js/bookmark_button.js"
        charset="utf-8"
        // @ts-ignore
        async="async"
      ></script>
    </Helmet>
  );
};
