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
import { Heading, ListItem, Paragraph, Subheading } from '@/atoms/TypographySC';
import { Tag } from '@/atoms/Tag';
import { Date } from '@/atoms/Typography';

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

  const components = { Snippet, Monad, TextSet, TraversalTimer  };
  // console.log(frontmatter, mdxSource.frontmatter)
  const { title, subheading, date, tags } = frontmatter
  // layout type... log, journal, post, ... 
  return (
    <Layout articleSlugs={articleSlugs} logSlugs={logSlugs}>
      <PageContainer>
        <Row style={{ float:'right',flexFlow:'row-reverse', padding:'.8rem'}}>
          {!date?<></>:<Date>{date}</Date>} 
        </Row>
        <Heading>{title}</Heading>
        <Subheading>{subheading}</Subheading>
        <div style={{display:'flex', flexDirection:'row'}}>
          {!tags?<></>:tags.split(',').map((tag:string)=><Tag>{tag}</Tag>)}
        </div>
        <HR></HR>
        
        {/* <h1 style={{ display:'flex', flexDirection:'row',alignItems:'baseline',  justifyContent:'space-around', width:'100%'}} >{frontmatter.title.split(' ').map((word: string, i:number) => <span>{word}</span>)}</h1> */}
        <MDXRemote 
          frontmatter={frontmatter}
          {...mdxSource} 
          components={{
            ...components, 
            h1:Heading,
            h2:Subheading,
            li:ListItem,
            p:Paragraph,
          }} 
        />
      </PageContainer>
    </Layout>
  );
}
