import { GetStaticProps } from 'next';
import { getSidebarLayoutProps } from '@/lib/layout';
import Layout from '@/components/Layout';
import { GridDisplay, key } from '@/components/Grid';

export type Props = {
  articleSlugs: string[];
  logSlugs: string[];
  posts: Post[]
  logs: Post[]
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const layoutProps = await getSidebarLayoutProps();
  return { props: layoutProps };
};



// pages/index.tsx

import { InfiniteGrid } from '@/components/InfiniteGrid';
import String from '@/components/String';
import Canvas from '@/components/Canvas';
import Link from 'next/link';
import TraversalTimer from '@/components/TraversalTimer';
import { CSSProperties, useEffect, useReducer, useRef } from 'react';
import { BroadPageContainer, FlowRow, HR, PageContainer, PostPreviewSquare, Section } from '@/atoms/Container';
import { Heading, ListItem, Paragraph, PostPreviewHeading, PostPreviewParagraph, SectionHeading, SectionSubheading, Subheading } from '@/atoms/TypographySC';
import { Post } from '@/lib/posts';
import { Date } from '@/atoms/Typography';

const exampleGrid = {
  [key([0, 0])]: 'You',
  [key([1, 0])]: 'B',
  [key([0, 1])]: 'C',
  [key([-1, -1])]: 'D',
};



const PostPreview = (props:{style?:CSSProperties, title:string, previewDescription:string, publishedDate:string, tags:string[] }) => {
  return <PostPreviewSquare>
    <PostPreviewHeading>
      {props.title}
    </PostPreviewHeading>
    {/* <Date>
      {props.publishedDate}
    </Date> */}
    <PostPreviewParagraph>
      {props.previewDescription}
    </PostPreviewParagraph>

  </PostPreviewSquare>
}


export default function Home({ articleSlugs, logSlugs, posts, logs }: Props) {

  const paths = `
  lighthouse performance vitals "modern standards"
    Real performance, Real standards

  common needs from various clients
    common audiences/users

  what web dev is

  over-engineering
  -ilities

  API boundaries, audiences
  routing

  iterability

  working together in the thicket

  space for LLMs
  
  document design and distribution
  symbols and systems
  `.split('\n')

  const text = 'blahblahblah'
  const a1 = Array(100).fill(1).reduce((prev, acc) => text+prev)
  
  const prettifySlug = (slug:string) => slug.replace('-',' ')
  return (
    <Layout articleSlugs={articleSlugs} logSlugs={logSlugs}>
      <BroadPageContainer>
        {/* <TraversalTimer></TraversalTimer>  */}
        <Heading>Emptiness</Heading>
        <Section>
          <SectionHeading>Articles</SectionHeading>
          <SectionSubheading>
            design sketching, w
            layers,
            opinionation,
            paradigms of representation,
            marking
          </SectionSubheading>
          <FlowRow>
              {posts.map((post,i) => (
                <Link href={`/posts/${post.slug}`}>
                  <PostPreview {...post.frontmatter}/>
                </Link>
              ))}
          </FlowRow>
        </Section>

        
          <Section>
            <SectionHeading>Daily Logs</SectionHeading>
            <SectionSubheading>
              working with self, developing self, working with others
              understanding the thicket, 
            </SectionSubheading>
            <FlowRow>
              {logs.map((log,i) => (
                <Link href={`/logs/${log.slug}`}>
                  <PostPreview {...log.frontmatter}/>
                </Link>
              ))}
            </FlowRow>
          </Section>

         {/* <Section>
            <FlowRow>
              {logSlugs.map(slug => <div>{slug.replace('-',' ')}</div>)}
              {
               posts.map(post => (
                 <Link href={`/posts/${post.slug}`}>
                   <PostPreview {...post.frontmatter}/>
                 </Link>
               ))
              }
            </FlowRow>
          </Section> */}
           


        {/* <h3>writing</h3> */}
        {/* <Subheading>Some things I'll be writing on...</Subheading>
        <ul>
          {paths.map(s => s ===''?<></>:<ListItem>{s}</ListItem>)}
        </ul>
        {/* <TextNodes/> */}
      </BroadPageContainer>

    </Layout>
  )
}



type NodeClass = 'object' 
  | 'intersubjective' 
  | 'phenomenal-universal' 
  | 'spatial-predicate'
  | 'process' 
  | 'continued;form-deferred'





interface TextNode {
  token:string
  nodeClass:NodeClass
}



const initalNodes: TextNode[] = [
  {token:'hypergraphia', nodeClass:'object'},
  {token:'your', nodeClass:'intersubjective'},
  {token:'desires', nodeClass:'phenomenal-universal'},
  {token:'drives', nodeClass:'phenomenal-universal'},
  {token:'dry', nodeClass:'process'},
  {token:'ink', nodeClass:'object'},
  {token:'instead of', nodeClass:'spatial-predicate'},
  {token:'...', nodeClass:'continued;form-deferred'}
]

// noticing.. css uses classes not types... because things can coexist like FP or categories 

type MarkupReducerAction = 'CREATE_NODE' 

const TextNodes = () => {
  const initialSense  = 'hypergraphia means your desires and drives dry in ink instead of...'
  

  const [state, dispatch] = useReducer((prev, action) => {
    return prev 
  }, initalNodes)
  


  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const wrapped = (ev:any) => { 
      console.log((ev.currentTarget as Window).getSelection()?.toString())
    }
    window.addEventListener('selectionchange', wrapped)

    const onKey = (ev:KeyboardEvent) => {
      if(ev.key === 'u') {
        const word = window.getSelection()?.toString()
      }
    }

    return () => {
      window.removeEventListener('selectionchange', wrapped)
    }
  }, [])


  return (
    <div style={{
      display:'flex',
      alignItems:'center',
      justifyItems:'center',
      width:'100%',
      height:'100%',
      flexDirection:'column',
      backgroundColor:'rgba(100,100,0,0.2)'
    }}>
      <div style={{
        width:'100%', 
        height:200,
        display:'flex',
        flexDirection:'row'  
      }}>
        {state.map((node, i) => {
          const r = (node.nodeClass.length * 40 %255)
          return <div style={{color:`rgba(${r}, 10, 10,1)`}}>
            {node.token}
          </div>
        })}
      </div>
      <input ref={inputRef} value={initialSense} type="text" style={{
        backgroundColor:'transparent',
        width:'100%',
        border:'1px solid salmon',
        WebkitUserSelect:'-moz-none',
        outline:'none'
      }} placeholder={initialSense} />
    </div>
  )
}


