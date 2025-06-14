import { useCallback, useRef, useState } from "react"

import { useAnimation } from "./hooks/useAnimation"
import styles from './TraversalTimer.module.css'

export default () => {
  const [length, setLength] = useState<number>(60 * 16)
  const [animating, setAnimating] = useState<boolean>(true)
  const timerCallback = useCallback((dt: number) => {
    setLength(t => t-dt)
  }, [animating])
  useAnimation(animating, timerCallback)


  // site with sense for MY use of...
  // open workshop
  // freeform space white board / sketch book -- pureref..

  // the standards; series (also great anchoring for impression; STANDARD + small caps trick)
  // form logic article
  // auth article

  // comonad fields


  // lead coders by teaching... that the space isn't so complex.. but also is..
  // you're learning alot at once.. but in the end its a space like environment with open tools, vendors, ..
  // and proximity to everything describable in the universe via math and logical representations and reflections...
  // its dope

  //  beeper at end... cycle bubble?
  // time in compact structures... that's so fascinating actually..

  //  in sapce and out of space... interleaving ... context switching for breaks... 
  
  // or taking breaks but not switching context, switching stance

  // follow through; and putting out a good enough signal

  // const v = length // 960 descending to 0
  // const mod255 = (x:number) => x%255
  // const x = mod255(v*5)
  // const [r,g,b] = [x,x,x]
  // const color = `rgb(${r}, ${g}, ${b})`
 
  
  
  // note... I naturally see mod255 as a liftable form.. a preexpressible value? in this declarative perspective
  //      but then from an FP perspective, a lift.. 

  // configuration thicket diagram


  // the feeling of fighting css; of leaning on react too much; non global style.. just making a mess
  // patterns that work for one dev, but break for two, or for four, etc

  // monads as interlocking postural flows... and promise - deferal of meaning
  
  // const px = `calc(50% + ${Math.sin(length)*80}px)`
  // const py = `calc(50% + ${Math.cos(length)*80}px)`

  console.log(length)

  
  const pinkStep10 = (n:number) => `hsl(from deeppink calc(h*.02*${n+.4+length}) calc(s*1.3) calc(l*.98))` 

  console.log(pinkStep10(1))
  
  return (
    <div className="timer-body">
      <article className={styles['timer-display']} style={{ position:'relative' }}>
        <div style={{ 
          display:'flex', gap:'.3em', flexDirection:'row', overflowX:'scroll' }}>
          {new Array(20).fill(1).map((v, i) => 
            <hr key={i} style={{ width:20,  height:54, mixBlendMode:'normal', border:'unset', backgroundColor:pinkStep10(i) }}/>
          )}
        </div>
        
        {/* <hr style={{ position:'relative', height:50, width:'100%' , mixBlendMode:'color-burn', border:'unset', backgroundColor:'yellow', translate:'-230px 100px' }}/>         */}
        {/* noticing a grayscale descent feels like a blue pink color space juxtaposed with this element */}

        <div className={styles.dot} style={{ position:'relative' }}></div>
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