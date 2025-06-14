import type { CSSProperties } from "react"
import styles from './Brandmark.module.css'
import { Row } from "@/atoms/Container"

const Brandmark = (props:{style?:CSSProperties}) => {
  return <div className={styles.brandmark} style={{ ...props.style}}>
    <Row style={{ justifyItems:'space-between' }}>
      {'Trevor'.split('').map(letter=><span>{letter}</span>)}
    </Row>
    <Row style={{ justifyItems:'space-between' }}>
      {'Leake'.split('').map(letter=><span>{letter}</span>)}
    </Row>

    </div>
}

export default Brandmark