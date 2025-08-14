import { CSSProperties } from "react"



export const Space = (props:any) => {

  const style: CSSProperties = {
    backgroundColor: props.sense === 'charged' ? 'red' : 'darkslateblue',
    minHeight:'700px'
  }

  return <div style={style}>
  </div>
}

