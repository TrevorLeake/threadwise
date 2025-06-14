import { useEffect, useRef  } from "react"

export const useAnimation = (animating:boolean, callback:(dt:number) => void) => {
  const animationWorker = useRef<number>(null)
  const lastCallTime = useRef<number>(null)
  const cumulative = useRef<number>(0)

  const killWorker = () => {
    if(animationWorker.current) {
      console.debug('freeing animation worker')
      cancelAnimationFrame(animationWorker.current)
      animationWorker.current = null
      lastCallTime.current = null
    }
  }
  const startWorker = (f: (time:DOMHighResTimeStamp)=>void) => {
    animationWorker.current = requestAnimationFrame(f)
  }


  useEffect(() => {
    if(!animating) {
      killWorker()
      return
    }

    const drawWrapper = (time:DOMHighResTimeStamp) => {
      let dt 

      if(lastCallTime.current) {
        dt = time - lastCallTime.current
      }
      else {
        dt = 0
      }  
      
      cumulative.current += dt
      callback(dt/1000)

      startWorker(drawWrapper)
      lastCallTime.current = time
    }
    startWorker(drawWrapper)

    return killWorker
  }, [callback, animating]) // useCallback for draw?
}
