import { GetStaticProps } from 'next';
import { getSidebarLayoutProps } from '@/lib/layout';
import Layout from '@/components/Layout';
import { GridDisplay, key } from '@/components/sketchy/Grid';

export type Props = {
  logSlugs: string[];
  logs: Post[]
};




// pages/index.tsx

import { InfiniteGrid } from '@/components/sketchy/InfiniteGrid';
import String from '@/components/sketchy/String';
import Canvas from '@/components/sketchy/Canvas';
import Link from 'next/link';
import TraversalTimer from '@/components/sketchy/TraversalTimer';
import { createContext, CSSProperties, useContext, useEffect, useReducer, useRef, useState } from 'react';
import { BroadPageContainer, FlowRow, HR, PageContainer, PostPreviewSquare, Row, Section } from '@/atoms/Container';
import { Heading, ListItem, Paragraph, PostPreviewHeading, PostPreviewParagraph, SectionHeading, SectionSubheading, Subheading } from '@/atoms/TypographySC';
import { Post } from '@/lib/posts';
import { Date as DateTag } from '@/atoms/Typography';
import { Metronome } from '@/components/Metronome/Metronome';
import { Monad } from '@/components/Monad/Monad';
import { Grid } from '@/components/Grid/Grid';
import useTime from '@/components/hooks/useTime';
import { NextSeo } from 'next-seo';
import { Alarm } from '@/components/Alarm/Alarm';
import { Space } from '@/components/Alarm/Space';
import { getAllLogs } from '@/lib/posts.server';

const exampleGrid = {
  [key([0, 0])]: 'You',
  [key([1, 0])]: 'B',
  [key([0, 1])]: 'C',
  [key([-1, -1])]: 'D',
};

interface BoundContext {
  x:number,
  y:number,
  w:number,
  h:number
}

const initial:BoundContext = {x:0,y:0,w:0,h:0}
const BoundContext = createContext(initial);

// each context could be a layer of entities.. 
// semi-continuous sheaves
// 

// premapped and more rxplicitly composed controlled and lifted

const ContextChild = () => {
  const v = useContext(BoundContext)

  return (
    <div style={{position:'absolute', left: v.x*4, height:v.h, width:v.w, top:v.y }}>
      {Object.entries(v).map(n => <p>{n}</p>)}
    </div>
  )
}









const PostPreview = (props:{style?:CSSProperties, title:string, previewDescription:string, publishedDate:string, tags:string[] }) => {
  return <PostPreviewSquare>
  
    <DateTag>
      {props.publishedDate}
    </DateTag>
    <Row>
      <PostPreviewHeading>
        {props.title}
      </PostPreviewHeading>
    </Row>
    <PostPreviewParagraph>
      {props.previewDescription}
    </PostPreviewParagraph>

  </PostPreviewSquare>
}




const Timeline = (props:{dates:string[]}) => {
  const days = 20 // days
  const hrs = days * 24
  const hourPx = 10 // px /hr

  return (
  <div style={{ overflowX:'scroll' }}>
    <div style={{ width:hrs*hourPx}}>
      {props.dates.map(d => <span style={{rotate:'90deg', display:'inline-block'}}>{d}</span>)}
    </div>
  </div>
  )
}


export const selectDate = (post:Post) => post.frontmatter.publishedDate 
export const postComparator = (pa:Post, pb:Post) => selectDate(pa) > selectDate(pb) ? -1 : 1


export default function Home({ logSlugs, logs }: Props) {

  const paths = `
  lighthouse performance vitals "modern standards"
    Real performa nce, Real standards

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
 

  // so ... world context.. there are patches like this ahead for you... 
  // there are different aspectal options to hop between like subway surfer

  const [boundCtx, setBound] = useState<BoundContext>(initial)
  const prettifySlug = (slug:string) => slug.replace('-',' ')

  // gaze context... 
  // objects in sets.. 

  // spatial-temporal entity context.. 
  // a before, a now, an after, a sense of coming, a sense of leaving
  // habituality, a sense of eternal
  // a sense of completeness and coherence
  // or of avoidant decoherence

  const now = new Date()

  const { time } = useTime()
  useEffect(() => {
    
    setBound(b => ({...b, x:time}))
  }, [time])





  return (
    <Layout logSlugs={logSlugs}>
      <NextSeo
        title={'Threadwise.dev'}
        description={'+ the config thicket'}
      />
      {/* <Space></Space> */}
      {/* <Alarm></Alarm> */}
      {/* <Timeline dates={posts.map(p=>p.frontmatter.publishedDate)} /> */}
     
     <PageContainer style={{ gridArea:'main'}}>
      
      {/* <h1>Dialectical Ambivalence</h1> */}



      {/* <Grid></Grid> */}

      {/* <BoundContext value={boundCtx}>
        <div>
          <ContextChild></ContextChild>
        </div>
      </BoundContext> */}
      {/* <Monad></Monad> */}
      {/* <Metronome></Metronome> */}
      {/* <Link href={'/sketches'}>sketchbook</Link> */}
        {/* <TraversalTimer></TraversalTimer>  */}
        <Section>
          <SectionHeading>Threadwise</SectionHeading>
          <Paragraph>

          </Paragraph>
        </Section>


            {/*  LOGS.. 4 most recent; view all option  */}

        
          {/* <Section>
            <SectionHeading>Logs</SectionHeading>
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
          </Section> */}

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
      </PageContainer>

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



export async function getStaticProps() {
  const logs = await getAllLogs(); // however you fetch them
  const logSlugs = logs.map(l => l.slug);

  return {
    props: {
      logs,
      logSlugs,
    },
  };
}
