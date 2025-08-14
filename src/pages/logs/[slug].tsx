// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { getAllLogSlugs, getLogBySlug } from '@/lib/posts.server';
import { getSidebarLayoutProps } from '@/lib/layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Snippet from '@/components/sketchy/Snippet';
// import './blog.css'

import TextSet from '@/components/sketchy/TextSet';

import Monad from '@/components/sketchy/Monad'
import SpeakerDiagram from '@/components/sketchy/SpeakerDiagram';
import TraversalTimer from '@/components/sketchy/TraversalTimer';
import { HR, PageContainer, Row } from '@/atoms/Container';
import { Date, Heading, ListItem, Paragraph, Subheading } from '@/atoms/Typography';
import { Tag } from '@/atoms/Tag';
import { EyeLead, Link as StyledLink } from '@/atoms/TypographySC';
import { InfiniteGrid } from '@/components/sketchy/InfiniteGrid';
import RxInfiniteGridViewer from '@/GridViewer';
import Link from 'next/link';
import LDJson from '@/components/SEO/LDJson';
import { NextSeo } from 'next-seo';
import Article from '@/components/Article/Article';
import Layout from '@/components/Layout';
import LogArticle from '@/components/LogArticle/LogArticle';
import { postComparator } from '..';

export const getStaticPaths: GetStaticPaths = async () => {
  const logSlugs = getAllLogSlugs()

  return {
    paths: logSlugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getLogBySlug(slug);
  
  if (!post) return { notFound: true };

  const mdxSource = await serialize(post.content, {
    // parseFrontmatter:true,
    mdxOptions: {
      // You can add other remarkPlugins here if needed, but not remark-frontmatter
    },
    // scope: post.frontmatter,
  });
  const layoutProps = await getSidebarLayoutProps();

  const posts = layoutProps.logs.sort(postComparator)


  const { frontmatter } = post
  return {
    props: {
      frontmatter,
      mdxSource,
      ...layoutProps,
      posts
    },
  };
};

const Grid = () => {
  const width = 6
  const height = 6
  
}



export default function PostPage({ frontmatter, mdxSource, logSlugs }: any) {
  const components = { 
    Snippet,
    Monad,
    Link, 
    TextSet, 
    SpeakerDiagram, 
    TraversalTimer, 
    EyeLead, 
    RxInfiniteGridViewer,  
    Grid,
  };
  // console.log(frontmatter, mdxSource.frontmatter)
  const { title, subheading, publishedDate, tags, previewDescription } = frontmatter
  // layout type... log, journal, post, ... 
  return (
    <Layout logSlugs={logSlugs}>

      <LDJson {...frontmatter}></LDJson>
      <NextSeo
        title={title}
        description={previewDescription}
      />

      <LogArticle frontmatter={frontmatter} mdxSource={mdxSource}/>
    </Layout>
  );
}
