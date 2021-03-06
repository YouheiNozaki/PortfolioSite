import * as React from 'react';
import { graphql } from 'gatsby';
import { FluidImage } from '../lib/images';
import { css } from '@emotion/core';

import { sizes, mq, colors } from '../theme';

import { SEO } from '../components/templates/Seo';
import {
  Title,
  SubTitle,
  Icon,
  Paragraph,
  LinkText,
  Table,
} from '../components/atoms';
import { SkillCard } from '../components/molecules';
import { CoffeeButton } from '../components/molecules/CoffeeButton';
import { Loading } from '../components/molecules/Loading';

type Props = {
  data: GatsbyTypes.PageAboutQuery;
  location: Location;
};

const AboutContainer = css({
  margin: `${sizes[16]} auto`,
  textAlign: 'center',
  '& article': {
    '& .profile': {
      margin: `${sizes[16]} auto`,
      textAlign: 'center',
      '& .paragraph': {
        marginTop: sizes[16],
      },
    },
    '& .career': {
      margin: `${sizes[32]} auto`,
      textAlign: 'center',
    },
  },
});

const SkillStack = css({
  margin: `${sizes[16]} auto`,
  '& h2': {
    textAlign: 'center',
  },
  '& .SkillStackList': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    [mq[1]]: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr ',
    },
    [mq[0]]: {
      display: 'block',
      marginLeft: sizes[8],
    },
  },
});

const About: React.FC<Props> = ({ data, location }) => {
  return (
    <>
      <SEO
        pagetitle="ABOUT"
        pagedesc="Aboutページ"
        pagepath={location.pathname}
      />
      <Title color={colors.blue}>ABOUT</Title>
      <section css={AboutContainer}>
        <SubTitle>どーも。りゅーそうです。</SubTitle>
        <Icon>
          <FluidImage
            filename="girl.png"
            alt="プロフィール画像"
          />
        </Icon>
        <article>
          <section className="profile">
            <SubTitle>私について</SubTitle>
            <div className="paragraph">
              <Paragraph>
                私は現在、学校の社会科の教員として教壇に立っています。
              </Paragraph>
              <Paragraph>
                学校のIT化を推進するために活動中で、
                <LinkText
                  href={
                    'https://microcms.io/blog/what-is-jamstack/'
                  }
                >
                  Jamstack
                </LinkText>
                製の学校HPを作成するのが最近の目標です。
              </Paragraph>
              <Paragraph>
                Spitzと猫と犬が大好きです
              </Paragraph>
            </div>
          </section>
          <section className="career">
            <SubTitle>これまでのりゅーそう</SubTitle>
            <Table />
          </section>
          <section css={SkillStack}>
            <SubTitle>技術スタック</SubTitle>
            <div className="SkillStackList">
              {data?.allMicrocmsSkills?.edges.map(
                (edge) => {
                  const skill = edge.node;
                  if (
                    skill.title == null ||
                    skill.parameter == null ||
                    skill.fields?.featuredImage?.fixed ==
                      null
                  ) {
                    return <Loading />;
                  }
                  return (
                    <React.Fragment key={skill.id}>
                      <SkillCard
                        fixedImage={
                          skill.fields?.featuredImage?.fixed
                        }
                        title={skill.title}
                        parameter={skill.parameter}
                      />
                    </React.Fragment>
                  );
                },
              )}
            </div>
          </section>
          <section>
            <CoffeeButton text="私の活動を応援してくださる方はこちらからサポートよろしくお願いします" />
          </section>
        </article>
      </section>
    </>
  );
};

export const pagequery = graphql`
  query PageAbout {
    allMicrocmsSkills {
      edges {
        node {
          id
          title
          parameter
          fields {
            featuredImage {
              fixed(height: 80, width: 80) {
                src
                base64
                srcSet
                srcSetWebp
                srcWebp
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;

export default About;
