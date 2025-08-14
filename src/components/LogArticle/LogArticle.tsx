import { BroadPageContainer, HR, PageContainer, Row } from "@/atoms/Container"
import { EyeLead, Heading, ListItem, Paragraph, Subheading } from "@/atoms/TypographySC"
import { Frontmatter } from "@/types/post"
import { MDXRemote } from "next-mdx-remote"
import Snippet from "../sketchy/Snippet"
import Monad from "../sketchy/Monad"
import TextSet from "../sketchy/TextSet"
import TraversalTimer from "../sketchy/TraversalTimer"
import RxInfiniteGridViewer from "@/GridViewer"
import { Tag } from "@/atoms/Tag"
import { Date, LogTimeMark } from "@/atoms/Typography"
import { ArticleLink } from "./ArticleLink"
import Link from "next/link"

type LogArticleProps = {
  frontmatter: Frontmatter
  mdxSource:any,
}

const StickySide = (props:{sections:string[]}) => (
  
  //  I'd prefer this in the layout... so maybe a layout portal?
<div id='sticky-nav' style={{gridArea:'left', position:'sticky', left:10, top:'60vh', width:'min-content', margin:'1em', justifyContent:'left'}}>
  {props.sections.map(section => 
  <li>
    <Link href={`#${section}`}>{section}</Link>
  </li>
  )}
</div>)

const LogArticle = (props: LogArticleProps) => {
  const components = { 
    Snippet, 
    Monad, 
    TextSet, 
    TraversalTimer, 
    EyeLead, 
    RxInfiniteGridViewer,
    Link,
    LogTimeMark,
    StickySide
  };
  const { frontmatter } = props
  const { title, subheading, publishedDate, sections, tags, previewDescription } = frontmatter

  return (
    <>
    
    {/* <StickySide sections={!sections?[]:sections.split(',')}></StickySide> */}
    
    <PageContainer style={{gridArea:'main'}}>
      <Row style={{ flexFlow:'row-reverse',  padding:'1rem'}}>
        {!publishedDate?<></>:<Date>{publishedDate}</Date>} 
      </Row>
      {/* <Heading>{title}</Heading> */}
      {/* toc hopper links instead */}
      {/* {!tags?<></>:tags.split(',').map((tag:string)=><Tag>{tag}</Tag>)} */}
      {/* <div style={{display:'flex', flexDirection:'column'}}> */}
        {/* <Row>
          {!tags?<></>:tags.split(',').map((tag:string)=><Tag>{tag}</Tag>)}
        </Row> */}
      {/* </div> */}
      
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
          a:ArticleLink,
          date:Date,
        }} 
      />
    </PageContainer>
    </>
  )
}
export default LogArticle