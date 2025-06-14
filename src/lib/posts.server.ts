
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import slugify from 'slugify';
import { Post } from './posts.layout';
import { Frontmatter } from '@/types/post';


export function getAllArticleSlugs() {
  const articlesDir = path.join(process.cwd(), 'src/content/posts');
  return  fs.readdirSync(articlesDir);
}

export function getAllLogSlugs() {
  const logsDir = path.join(process.cwd(), 'src/content/logs');
  return  fs.readdirSync(logsDir);
}


export function getPostBySlug(slug: string) {
  let postsDir = path.join(process.cwd(), 'src/content/posts');
  let filePath = path.join(postsDir, `${slug}/index.mdx`);
  if (!fs.existsSync(filePath)) {
    console.log(filePath)
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

// etc.

export function getAllPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'src/content/posts');
  const logsDir = path.join(process.cwd(), 'src/content/logs');

  const assetDirs = fs.readdirSync(postsDirectory).concat(fs.readdirSync(logsDir))

  return assetDirs.map((dir) => {
    const filePath = path.join(postsDirectory, dir);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = slugify(data.title || dir.replace(/\.mdx$/, ''), {
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
