export interface Frontmatter {
  title: string;
  date: string;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}
