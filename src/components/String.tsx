import { useState } from "react"


export default () => {
  const [value, setValue] = useState<string>()
  

  return <div>
    <input value={value} onInput={(ev) => { setValue(ev.currentTarget.value) }} />
  </div>  
}