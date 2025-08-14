
// pages/posts/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { getSidebarLayoutProps } from '@/lib/layout';
import Layout from '@/components/Layout';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Snippet from '@/components/sketchy/Snippet';
// import './blog.css'

import Monad from '@/components/sketchy/Monad'

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
  return (
    // <Layout slugs={slugs}>
      <article className='dark-mode' >
                <div style={{ justifyItems:'right', marginTop:'auto',  flexFlow:'column', display:'flex' }}>
           {`RE: { hyperpatter }`}
        </div>

        <div>
          <input placeholder={'email@address.com'} />    
        </div>
      </article>
    // </Layout>
  );
}