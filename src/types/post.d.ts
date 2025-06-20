export interface Frontmatter {
  title: string;
  publishedDate: string;
  subheading:string;
  tags:string;
  previewDescription:string;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}
