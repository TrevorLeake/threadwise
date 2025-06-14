import { GetStaticProps } from 'next';
import { getSidebarLayoutProps } from '@/lib/layout';
import Layout from '@/components/Layout';
import { GridDisplay, key } from '@/components/Grid';

type Props = {
  articleSlugs: string[];
  logSlugs: string[];
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
import { useEffect, useReducer, useRef } from 'react';
import { MailingForm } from '@/components/mailing/MailingForm';
import { PageContainer } from '@/atoms/Container';
import { Heading, ListItem, Paragraph, Subheading } from '@/atoms/TypographySC';

const exampleGrid = {
  [key([0, 0])]: 'You',
  [key([1, 0])]: 'B',
  [key([0, 1])]: 'C',
  [key([-1, -1])]: 'D',
};



export default function Home({ articleSlugs, logSlugs }: Props) {

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

  return (
    <Layout articleSlugs={articleSlugs} logSlugs={logSlugs}>
      <PageContainer>
        <Heading>web dev journals</Heading>
        <Subheading>Some things I'll be writing on...</Subheading>
        <ul>
          {paths.map(s => s ===''?<></>:<ListItem>{s}</ListItem>)}
        </ul>
        {/* <TextNodes/> */}
        {/* <TraversalTimer></TraversalTimer> */}
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


