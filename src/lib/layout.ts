import { getAllLogs, getAllLogSlugs } from './posts.server';

export async function getSidebarLayoutProps() {
  const logSlugs = getAllLogSlugs();
  const logs = getAllLogs();

  return { logSlugs, logs };
}
