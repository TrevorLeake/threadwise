import { CSSProperties } from 'react'
import styles from './monad.module.css'

export default () => {
  const {circle, superior, gold, right} = styles

  return (
    <div className={styles.container}>
      <div className={circle+superior+gold+right}/>
      <div className='circle inferior blue left'/>
    </div>
    
  )
}