import { getAllLogs, getAllLogSlugs } from './posts.server';

export async function getSidebarLayoutProps() {

  const logSlugs = getAllLogSlugs();
  const logs = getAllLogs();

  console.log('HEREH ', logSlugs, logs)

  return { logSlugs, logs };
}
