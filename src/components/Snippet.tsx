// import './snippet.css'

import { useCallback, useRef, useState } from "react"
import { useAnimation } from "./hooks/useAnimation"



// object has a focus... 
// focus has a... sampling field, time evolving target...


const Snippet = () => { 

  const R = 100
  const [pos, setPos] = useState<number>(0)

  const timeRef = useRef<number>(0)
  const [animating, setAnimating] = useState<boolean>(true)

  const STEP_LENGTH = .2
  const NODES = 7
  const WINDOW = 3
  const WIDTH = 100 

  const intervalRef = useRef<number>(STEP_LENGTH)

  const animationCallback = useCallback((dt:number) => {
    console.log(timeRef.current)
    timeRef.current += dt
    intervalRef.current -= dt
    if(intervalRef.current <= 0) {
      const updatePosition = (p:number):number => ((p+1)%NODES)
      setPos(updatePosition)
      intervalRef.current = STEP_LENGTH
    }
  }, [])
  useAnimation(animating, animationCallback)

  const gridToScreen = (p:number): [number,number] => [(p%NODES)*WIDTH, 0]
  const [x,y] = gridToScreen(pos)

  return (
    <div style={{ display:'relative' }}>
      {timeRef.current.toFixed(2)}
      <div className="circle" style={{ 
        visibility:(pos < WINDOW)? 'visible' : 'hidden',
        width:100, 
        translate:`${x}px ${y}px`, 
        height:100, 
        clipPath:'circle(50%)',
        backgroundColor:'rgba(255, 0, 128, 0.2)',
        pointerEvents:'none'
      }} />

        <button onClick={() => { setAnimating(a => !a) }}>TEXTLESS BUTTON</button>
    </div>

  )
}
export default Snippet