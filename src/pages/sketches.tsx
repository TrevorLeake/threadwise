import { useState } from "react";


import styles from './sketches.module.css'
import { Object } from '../lib/sketchTypes'



type Cell = {x:number, y:number}

const dims = (v:number) => { return {width:v, height:v} }


const Gazer = () => {
  return <div style={{ 
    ...dims(50), 
    backgroundColor:'black', 
    clipPath:'circle(50%)', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center' 
  }}>
    <div style={{ ...dims(10), backgroundColor:'red', clipPath:'circle(50%)' }}/>
  </div>
}



export default function SketchPage({ frontmatter, mdxSource, slugs }: any) {
  // const fields = 'software and computer science; math; mechanical engineering; music'
  
  const CELL = 10
  const WIDTH = 5
  const HEIGHT = 3
  const [cellPosition, setCellPosition] = useState<Cell>()

  // having an infinite grid... 
  // which is made of tile strings,
  const tuning = [0,5,5,5,4,5]
  const octaveTile = '1-2-34-5-6-7'
  const octave = [0,2,4,5,7,9,11]  


  const rotate = (necklace:string, offset:number) => necklace.slice(offset % necklace.length) + necklace.slice(0, offset  % necklace.length)  
  let shiftSum = 0





  return (
    <div>

      <article style={{ lineHeight:'2em', backgroundColor:'rgba(250,40,40,.5)' }} className={'dark-mode'}  >
        {/* <Gazer></Gazer> */}
        HELLO

          {/* {new Array(10).fill(1).map((t, i) => `${i**2}, `)} */}

        <br/>
        trying to do tasks... I can feel the end of.
        <br/>
        Monad-task sketch


        Some things I'm hearing...

        <br/>
        I'm a really emotional guy - JD Vance
        {/* monad */}

        

      </article>
      
      {/* <article className={styles.dual}>
        I GREET THEE GRETA
      </article> */}


    </div>
);
}