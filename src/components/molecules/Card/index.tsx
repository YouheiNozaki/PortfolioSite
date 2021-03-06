import * as React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import {
  FaCalendar,
  FaRegCalendarCheck,
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

import {
  sizes,
  colors,
  typography,
  mq,
} from '../../../theme';
import { BottomIn } from '../../../keyframes';

type Props = {
  postsId: string | null | undefined;
  title: string | null | undefined;
  fluidImage: any;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};

export const Card: React.FC<Props> = ({
  postsId,
  title,
  fluidImage,
  createdAt,
  updatedAt,
}) => {
  const [ref, inView] = useInView({
    rootMargin: '-50px 0px',
  });

  return (
    <>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          opacity: inView ? 1 : 0,
          animation: inView
            ? `${BottomIn} 0.5s ease-out`
            : 0,
          [mq[0]]: {
            padding: sizes[4],
          },
          '& a': {
            textDecoration: 'none',
            cursor: 'pointer',
            '& article': {
              border: `solid ${sizes[1]} ${colors.lightBlue}`,
              borderRadius: sizes[2],
              padding: sizes[4],
              width: sizes.largeSizes.sm,
              [mq[1]]: {
                width: sizes.largeSizes.xs,
              },
              [mq[0]]: {
                width: sizes.largeSizes.xs,
              },
              '& .PostItemTitle': {
                color: colors.blue,
                fontWeight: typography.fontWeights.medium,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              },
              '& img': {
                borderRadius: sizes[2],
              },
              '& .PostItemDay': {
                marginTop: sizes[3],
                display: 'flex',
                [mq[0]]: {
                  marginTop: sizes[1],
                },
                '& .PostItemDayItem': {
                  display: 'flex',
                  color: colors.blue,
                  marginLeft: sizes[2],
                  '& .icon': {
                    marginRight: sizes[1],
                  },
                },
                [mq[1]]: {
                  display: 'block',
                },
                [mq[0]]: {
                  display: 'block',
                },
              },
            },
          },
        }}
        ref={ref}
      >
        <Link to={`/posts/${postsId}`}>
          <article>
            <p className="PostItemTitle">{title}</p>
            <Image
              fluid={fluidImage}
              alt="ブログのイメージ画像"
            />
            <div className="PostItemDay">
              <div className="PostItemDayItem">
                <FaCalendar className="icon" />
                投稿:
                {createdAt}
              </div>
              <div className="PostItemDayItem">
                <FaRegCalendarCheck className="icon" />
                更新:
                {updatedAt}
              </div>
            </div>
          </article>
        </Link>
      </div>
    </>
  );
};
