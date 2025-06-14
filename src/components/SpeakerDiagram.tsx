import { useState } from "react"
import { useAnimation } from "./hooks/useAnimation"


import styles from './SpeakerDiagram.module.css'


// on timeline... representing temporal aspect


// I found it myself; explicity of disaffiliation (
//  1 speaker + Molar Other, 
//  speech+event basin-surface for disaffiliation 
// )


type Speaker = string
type Circumstance = {
  speaker?:Speaker,
}
type Object = { }


// You were really upsetting the musicians playing with you at the time
// Were you in your outfit when that happened?
// That happened, yes

// gimme

// v1.. tracking sidepane.. like pudding.cool or the oatmeal or .. nyt?

// also... design a wordle rival;; or wordscapes; any app

export default (props: {circumstance:Circumstance}) => {
  const { speaker } = props.circumstance

  return <div style={{ 
    backgroundColor:'black', 
    border: '1px solid gray',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  }}>
    {speaker ? <div className={styles.speaker}>{speaker}</div> : <></>}
    <div className={styles.event}></div>
  </div>
}