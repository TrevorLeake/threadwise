// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostBySlug, getAllArticleSlugs, getAllLogSlugs } from '@/lib/posts.server';
import { getSidebarLayoutProps } from '@/lib/layout';
import Layout from '@/components/Layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Snippet from '@/components/Snippet';
// import './blog.css'

import Monad from '@/components/Monad'
import TextSet from '@/components/TextSet';
import TraversalTimer from '@/components/TraversalTimer';
import { HR, PageContainer, Row } from '@/atoms/Container';
import { EyeLead, Heading, ListItem, Paragraph, Subheading } from '@/atoms/TypographySC';
import { Tag } from '@/atoms/Tag';
import { Date } from '@/atoms/Typography';
import Column from '@/components/Column/Column';

import { NextSeo } from 'next-seo';
import RxInfiniteGridViewer from '@/GridViewer';
import LDJson from '@/components/SEO/LDJson';
import Article from '@/components/Article/Article';

export const getStaticPaths: GetStaticPaths = async () => {
  const articleSlugs = getAllArticleSlugs();
  const logSlugs = getAllLogSlugs()
  return {
    paths: articleSlugs.concat(logSlugs).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
// 
  //   remarkPlugins: [
  //     require('remark-gfm'),
  //     require('remark-mdx-frontmatter')
  //     // require('katex'),
  //     // require('remark-tex')
  //   ],
  //   rehypePlugins: [require('rehype-katex')]
  // },

// import katex from 'katex'


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  
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

  const components = { Snippet, Monad, TextSet, TraversalTimer, EyeLead, RxInfiniteGridViewer };
  // console.log(frontmatter, mdxSource.frontmatter)
  const { title, subheading, publishedDate, tags, previewDescription } = frontmatter
  // layout type... log, journal, post, ... 
  return (
    <Layout articleSlugs={articleSlugs} logSlugs={logSlugs}>
      <LDJson {...frontmatter}></LDJson>
      <NextSeo
        title={title+" - TL.dev"}
        description={previewDescription}
      />

      <Article 
        frontmatter={frontmatter} 
        mdxSource={mdxSource} 
      />

    </Layout>
  );
}
