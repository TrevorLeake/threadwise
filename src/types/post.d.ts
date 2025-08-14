export interface Frontmatter {
  title: string;
  publishedDate: string;
  subheading:string;
  tags:string;//comma separated
  previewDescription:string;
  sections:string;//comma separated
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}
