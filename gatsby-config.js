require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Ryusou Blog`,
    lang: 'ja',
    description: `りゅーそうの技術ブログ&ポートフォリオサイト`,
    author: `Yohei Nozaki`,
    siteUrl: `https://ryusou.dev/`,
    locale: `ja_JP`,
    fbappid: `${process.env.FB_APP_ID}`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${process.env.GA_TRACKING_ID}`,
        head: true,
        respectDNT: true,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: `https://ryusou.dev/`,
        sitemap: `https://ryusou.dev/sitemap.xml`,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: ` Ryusou Blog りゅーそうブログ`,
        short_name: `RyusouBlog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#faf7d9`,
        display: 'standalone',
        icon: `src/images/icon.png`,
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-emotion`,
    `gatsby-plugin-typegen`,
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: `${process.env.X_API_KEY}`,
        serviceId: 'ryusou-mtkh',
        apis: [
          {
            endpoint: 'posts',
          },
          {
            endpoint: 'works',
          },
          {
            endpoint: 'tags',
          },
          {
            endpoint: 'skills',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-imgix',
      options: {
        domain: 'https://images.microcms-assets.io',
        fields: [
          {
            nodeType: 'MicrocmsSkills',
            fieldName: 'featuredImage',
            getUrl: (node) => node.image.url,
          },
          {
            nodeType: 'MicrocmsWorks',
            fieldName: 'featuredImage',
            getUrl: (node) => node.image.url,
          },
          {
            nodeType: 'MicrocmsPosts',
            fieldName: 'featuredImage',
            getUrl: (node) => node.image.url,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: true,
        },
      },
    },
  ],
};
