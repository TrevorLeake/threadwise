
// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostBySlug,  } from '@/lib/posts.server';
import { getSidebarLayoutProps } from '@/lib/layout';
import Layout from '@/components/Layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Snippet from '@/components/Snippet';
// import './blog.css'

import Monad from '@/components/Monad'
import Kanban from '@/components/Kanban';

// export const getStaticPaths: GetStaticPaths = async () => {
//   const slugs = getAllSlugs();
//   return {
//     paths: slugs.map((slug) => ({ params: { slug } })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const slug = params?.slug as string;
//   const post = getPostBySlug(slug);
//   if (!post) return { notFound: true };

//   const mdxSource = await serialize(post.content);
//   const layoutProps = await getSidebarLayoutProps();

//   return {
//     props: {
//       frontmatter: post.frontmatter,
//       mdxSource,
//       ...layoutProps,
//     },
//   };
// };


// export const getStaticProps = async () => {
//   const layoutProps = await getSidebarLayoutProps();

//   return {
//     props: {
//       ...layoutProps,
//     },
//   };
// };


interface Props {
  slugs: string[];
}

export default function MailingPage({ frontmatter, mdxSource, slugs }: any) {
  const fields = 'software and computer science; math; mechanical engineering; music'
  return (
    // <Layout slugs={slugs}>
      <article className='dark-mode' >
        <div>
          <div style={{  fontFamily:'var(--spectral', justifyContent:'center', width:'100%', display:'flex', flexDirection:'column'}}>
            <h1 style={{ padding:'1.19em', fontFamily:'var(--spectral-sc)' }}>Trevor Leake</h1>
            <div style={{ display:'flex', flexDirection:'column' }}>
              <ul>
                {fields.split(';').map(word => <li>{word}</li>)}
              </ul>
            </div>
          </div>
          <div style={{ height:'450px'}}>
            <Kanban></Kanban>
            {/* <img style={{ 
              height:'100%',
              width:'100%',

              objectFit:'cover'
            }} src={'/selfie.jpg'}></img> */}
          </div>

          <br/>
          <br/>
          Q: What have you been doing in the year gap in your work? 
          <br/>
          <br/>
          A: I've been asking myself questions, deconstructing and understanding the social forces I exert. Therapy, books, journaling. And coding!
          <br/>
          
        </div>
      </article>
    // </Layout>
  );
}