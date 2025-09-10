
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';
import { Post } from './posts.layout';
import { Frontmatter } from '@/types/post';


export function getLogBySlug(slug: string) {
  console.log('getLogBySlug', slug)

  let postsDir = path.join(process.cwd(), 'src/content/logs');
  let filePath = path.join(postsDir, `${slug}/index.mdx`);
  if (!fs.existsSync(filePath)) {
    postsDir = path.join(process.cwd(), 'src/content/logs');
    filePath = path.join(postsDir, `${slug}/index.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: parsedContent } = matter(content);
    return { slug, content: parsedContent, frontmatter: data };

  };

  
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: parsedContent } = matter(content);

  return { slug, content: parsedContent, frontmatter: data };
}




export function getAllLogSlugs() {
  const logsDir = path.join(process.cwd(), 'src/content/logs');

  console.log('getAllLogSlugs', logsDir)

  return  fs.readdirSync(logsDir);
}




export function getAllLogs(): Post[] {
  const logsDir = path.join(process.cwd(), 'src/content/logs');

  console.log('getAllLogs', logsDir)

  const sluggedAssetDirs = fs.readdirSync(logsDir)

  return sluggedAssetDirs.map((sluggedDir) => {
    const filePath = path.join(logsDir, `${sluggedDir}/index.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = slugify(data.title || sluggedDir, {
      lower: true,
      strict: true,
    });

    return {
      slug,
      frontmatter: data as Frontmatter,
      content,
    };
  });
}
