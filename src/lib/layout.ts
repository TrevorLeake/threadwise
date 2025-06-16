import { getAllArticleSlugs, getAllLogSlugs, getAllPosts } from './posts.server';

export async function getSidebarLayoutProps() {
  const articleSlugs = getAllArticleSlugs();
  const logSlugs = getAllLogSlugs();
  const posts = getAllPosts();


  return { articleSlugs, logSlugs, posts };
}
