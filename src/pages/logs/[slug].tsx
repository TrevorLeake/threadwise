// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostBySlug, getAllArticleSlugs, getAllLogSlugs, getLogBySlug } from '@/lib/posts.server';
import { getSidebarLayoutProps } from '@/lib/layout';
import Layout from '@/components/Layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Snippet from '@/components/Snippet';
// import './blog.css'

import TextSet from '@/components/TextSet';

import Monad from '@/components/Monad'
import SpeakerDiagram from '@/components/SpeakerDiagram';
import TraversalTimer from '@/components/TraversalTimer';
import { HR, PageContainer, Row } from '@/atoms/Container';
import { Date, Heading, ListItem, Paragraph, Subheading } from '@/atoms/Typography';
import { Tag } from '@/atoms/Tag';
import { EyeLead, Link as StyledLink } from '@/atoms/TypographySC';
import { InfiniteGrid } from '@/components/InfiniteGrid';
import RxInfiniteGridViewer from '@/GridViewer';
import Link from 'next/link';
import LDJson from '@/components/SEO/LDJson';
import { NextSeo } from 'next-seo';
import Article from '@/components/Article/Article';

export const getStaticPaths: GetStaticPaths = async () => {
  const articleSlugs = getAllArticleSlugs();
  const logSlugs = getAllLogSlugs()
  return {
    paths: articleSlugs.concat(logSlugs).map((slug) => ({ params: { slug } })),
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

  const { frontmatter } = post
  return {
    props: {
      frontmatter,
      mdxSource,
      ...layoutProps,
    },
  };
};

export default function PostPage({ frontmatter, mdxSource, articleSlugs, logSlugs }: any) {
  const components = { 
    Snippet,
    Monad, 
    TextSet, 
    SpeakerDiagram, 
    TraversalTimer, 
    EyeLead, 
    RxInfiniteGridViewer,  
  };
  // console.log(frontmatter, mdxSource.frontmatter)
  const { title, subheading, publishedDate, tags, previewDescription } = frontmatter
  // layout type... log, journal, post, ... 
  return (
    <Layout articleSlugs={articleSlugs} logSlugs={logSlugs}>

      
      <LDJson {...frontmatter}></LDJson>
      <NextSeo
        title={title + " - TL.dev"}
        description={previewDescription}
      />

      <Article {...{frontmatter, mdxSource}}></Article>
    </Layout>
  );
}
