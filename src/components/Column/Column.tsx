import type { CSSProperties, PropsWithChildren } from 'react'
import styles from './Column.module.css'

const Column = (props: PropsWithChildren<{style:CSSProperties}>) => {
  return (
    <div data-testid='column' style={props.style} className={styles.column}>
      {props.children}
    </div>
  )
}
export default Column;