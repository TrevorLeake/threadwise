import { useCallback, useRef, useState } from "react"

import { useAnimation } from "../hooks/useAnimation"
import styles from './TraversalTimer.module.css'

export default () => {
  const [length, setLength] = useState<number>(60 * 16)
  const [animating, setAnimating] = useState<boolean>(true)
  const timerCallback = useCallback((dt: number) => {
    setLength(t => t-dt)
  }, [animating])
  useAnimation(animating, timerCallback)

  
  const pinkStep10 = (n:number) => `hsl(from deeppink calc(h*.02*${n+.4+length}) calc(s*1.3) calc(l*.98))` 
  

  const Tick = () => <div>.</div>
  const Step = () => <div>*</div>


  return (
    <div className="timer-body">

        {length.toString().split('.')[0]}
      <br/>
      <br/>
      <br/>
      Dev philosophy post... 
      addressing that... I feel I'm speaking from no ground. I'm lying in a sense, or feeling myself a hipocrit. But also truly not. 

      exposure of 24 hrs a day.. meals.. 

      write on... the todo lattice and the phenomenal real.. or mix with youtube huberman, colocating others.. 


      some todos...
      meal budget
      bill ping and plan.. earmark monies.. in out by week check.. hours setting.. and frontload..
        earning stability, space... 

      space, body, self, stability
      
      <br/>

      <div style={{ display:'flex', flexDirection:'row', justifyContent:'space-evenly', overflowX:'scroll' }}>
        {new Array(800).fill(1).map((v,i) => (i%10)===0 ? <b>{i}</b>: <div>.</div>)}
        <div>

        </div>
      </div>

      <br/>
      <br/>
      <br/>
      <article className={styles['timer-display']} style={{ position:'relative' }}>
        {/* <div style={{ 
          display:'flex', gap:'.3em', flexDirection:'row', overflowX:'scroll' }}>
          {new Array(20).fill(1).map((v, i) => 
            <hr key={i} style={{ width:20,  height:54, mixBlendMode:'normal', border:'unset', backgroundColor:pinkStep10(i) }}/>
          )}
        </div>
         */}
        {/* <hr style={{ position:'relative', height:50, width:'100%' , mixBlendMode:'color-burn', border:'unset', backgroundColor:'yellow', translate:'-230px 100px' }}/>         */}
        {/* noticing a grayscale descent feels like a blue pink color space juxtaposed with this element */}

        {/* <div className={styles.dot} style={{ position:'relative' }}></div> */}
      </article>

      {/* <button onClick={(ev) => { setAnimating(a => !a) }}>CLICK</button> */}
    </div>
  )
}

// weaving methods... 
// lattice of actions.. in fp.. then tiling manipulations become simple..

// basketing weaving in comonad-lattice representation

// returning to basics... 
// text set with imaginal beautiful glimmering text drifting in... 
// and fundamentals which you must return to


// patterning... and file patterning screenshots;  or showing as a grammar in react
// show test component patterning; and how opinionation here offloads the elements which would be stressors on mind, 
// or might drive you to a vendor when recast as a pain point 
// but you can just leverage...

// write on... beginning to understand tech; the vendor ecosystem; the point; the spirit of modularity, Saas, open source, WHATWG, ..
// ..