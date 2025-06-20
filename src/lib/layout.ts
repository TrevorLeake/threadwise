import { getAllArticleSlugs, getAllLogs, getAllLogSlugs, getAllPosts } from './posts.server';

export async function getSidebarLayoutProps() {
  const articleSlugs = getAllArticleSlugs();
  const logSlugs = getAllLogSlugs();
  const posts = getAllPosts();
  const logs = getAllLogs();

  return { articleSlugs, logSlugs, posts, logs };
}
