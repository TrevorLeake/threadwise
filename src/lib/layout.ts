import { getAllArticleSlugs, getAllLogSlugs } from './posts.server';

export async function getSidebarLayoutProps() {
  const articleSlugs = getAllArticleSlugs();
  const logSlugs = getAllLogSlugs();

  return { articleSlugs, logSlugs };
}
