import { useState } from "react"
import { useAnimation } from "../hooks/useAnimation"

import styles from './TextSet.module.css'

export default (props:{text?:string[], children?:React.ReactNode}) => {

  // todo... swimming spinning elements in canvas..
  const [expanded, setExpanded] = useState(true)

  const { text } = props
  return <>
  <div
    className={styles.set} 
    style={{ 
    }}
    onClick={(ev) => { setExpanded(v => !v) }}
  >
  <div className={styles['set-paren-left']}>
    {`{`}
  </div>
  { text? text.map(t => <div style={{ 
    padding:'.5em',
    // transitionDuration:'.22s',
    // opacity:expanded?1:0,
    // flexBasis:expanded?1:0
    // flexGrow:expanded?1:0.0001,
    // overflow:'hidden',  
    // maxHeight:expanded?'1em':'0.0001em',
    // opacity:expanded?1:0,

    // visibility:expanded?'visible':'hidden'
  }}>
    {t}
  </div>) : <></>}
  {expanded?props.children:<div>...</div>}

  <div className={styles['set-paren-right']}>
    {`}`}
  </div>

</div>

</>


}