import { HR, PageContainer, Row } from "@/atoms/Container"
import { EyeLead, Heading, ListItem, Paragraph, Subheading } from "@/atoms/TypographySC"
import { Frontmatter } from "@/types/post"
import { MDXRemote } from "next-mdx-remote"
import Snippet from "../Snippet"
import Monad from "../Monad"
import TextSet from "../TextSet"
import TraversalTimer from "../TraversalTimer"
import RxInfiniteGridViewer from "@/GridViewer"
import { Tag } from "@/atoms/Tag"
import { Date } from "@/atoms/Typography"
import { ArticleLink } from "./ArticleLink"

type ArticleProps = {
  frontmatter: Frontmatter
  mdxSource:any,
}

const Article = (props: ArticleProps) => {
  const components = { 
    Snippet, 
    Monad, 
    TextSet, 
    TraversalTimer, 
    EyeLead, 
    RxInfiniteGridViewer 
  };
  const { frontmatter } = props
  const { title, subheading, publishedDate, tags, previewDescription } = frontmatter

  return (
    <PageContainer style={{gridArea:'main'}}>
      <Row style={{ flexFlow:'row-reverse', padding:'1rem'}}>
        {!publishedDate?<></>:<Date>{publishedDate}</Date>} 
      </Row>
      <Heading>{title}</Heading>
      <Subheading>{subheading}</Subheading>
      {!tags?<></>:tags.split(',').map((tag:string)=><Tag>{tag}</Tag>)}
      {/* <div style={{display:'flex', flexDirection:'column'}}> */}
        {/* <Row>
          {!tags?<></>:tags.split(',').map((tag:string)=><Tag>{tag}</Tag>)}
        </Row> */}
      {/* </div> */}
      <HR></HR> 
      
      {/* <h1 style={{ display:'flex', flexDirection:'row',alignItems:'baseline',  justifyContent:'space-around', width:'100%'}} >{frontmatter.title.split(' ').map((word: string, i:number) => <span>{word}</span>)}</h1> */}
      <MDXRemote
        frontmatter={frontmatter}
        {...props.mdxSource} 
        components={{
          ...components, 
          h1:Heading,
          h2:Subheading,
          li:ListItem,
          p:Paragraph,
          a:ArticleLink
        }} 
      />
    </PageContainer>
  )
}
export default Article