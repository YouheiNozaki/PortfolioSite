import React from 'react';
import Link from 'gatsby-link';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { css } from '@emotion/core';
import { color, translateX } from 'csx';
import { FaReact } from 'react-icons/fa';
import { TiPencil } from 'react-icons/ti';
import { FiMail } from 'react-icons/fi';
import { MdWork } from 'react-icons/md';

import {
  colors,
  fontSizes,
  typography,
  sizes,
} from '../../theme';

const NavContainer = css({
  '& nav': {
    position: 'absolute',
    zIndex: 1,
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: `${color(colors.blue).fade(0.8)}`,
    transform: translateX('-100%'),
    '& ul': {
      margin: 'auto',
      '& li': {
        listStyle: 'none',
        '& a': {
          textDecoration: 'none',
          color: colors.white,
          fontSize: fontSizes['4xl'],
          fontWeight: typography.fontWeights.bold,
          '& ul': {
            display: 'flex',
            '& .NavListIcon': {},
            '& li': {
              margin: sizes[2],
            },
          },
        },
        '& a:hover': {
          color: colors.yellow,
        },
      },
    },
  },
  "& nav[aria-expanded='true']": {
    transform: translateX(0),
  },
});

type Props = {
  open: boolean;
  setOpen?: Function;
};

export const Nav: React.FC<Props> = ({ open }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          fixed(width: 36, height: 36) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <div css={NavContainer}>
      <nav aria-expanded={open}>
        <ul>
          <li>
            <Link to="/">
              <ul>
                <li className="NavListIcon">
                  <Img
                    fixed={data.file.childImageSharp.fixed}
                    alt="Logo"
                  />
                </li>
                <li>HOME</li>
              </ul>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <ul>
                <li className="NavListIcon">
                  <FaReact size={36} />
                </li>
                <li>ABOUT</li>
              </ul>
            </Link>
          </li>
          <li>
            <Link to="/posts">
              <ul>
                <li className="NavListIcon">
                  <TiPencil size={36} />
                </li>
                <li>POST</li>
              </ul>
            </Link>
          </li>
          <li>
            <Link to="/works">
              <ul>
                <li className="NavListIcon">
                  <MdWork size={36} />
                </li>
                <li>WORK</li>
              </ul>
            </Link>
          </li>
          <li>
            <Link to="/contacts">
              <ul>
                <li className="NavListIcon">
                  <FiMail size={36} />
                </li>
                <li>CONTACT</li>
              </ul>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
