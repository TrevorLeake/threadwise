import { useCallback, useState } from "react"
import { useAnimation } from "./useAnimation"

const useTime = () => {
  const [animating, setAnimating] = useState<boolean>(true)
  const [time, setTime] = useState<number>(0)
  const wrapped = (dt:number) => {
    setTime(t => t + dt)
  }
  const callback = useCallback(wrapped, [])
  useAnimation(animating, callback)
  return { time, setAnimating}
}

export default useTime