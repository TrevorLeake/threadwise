// components/Monad.tsx
import styled from 'styled-components'
import { HR, PageContainer, Row, Section } from '../../atoms/Container'
import Column from '../Column/Column'
import { Paragraph, SiteGrate } from '../../atoms/Typography'
// import { Tag } from '../atoms/Tag'
import styles from './Monad.module.css'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ThemeToggle } from '../sketchy/ThemeButton'
import { MailingForm } from '../Mailing/MailingForm'
import Link from 'next/link'
import { useAnimation } from '../hooks/useAnimation'



const MonadWrapper = styled.footer`
  margin-top: 5rem;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary || '#888'};
  border-top: 1px solid ${({ theme }) => theme.colors.text || '#eee'};
`

const MonadName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  margin-top: 1rem;
  font-weight: 600;
`

const MonadDate = styled.time`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.6;
`



const useTime = () => {
  const [animating, setAnimating] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const wrapped = (dt:number) => {
    setTime(t => t + dt)
  }
  const callback = useCallback(wrapped, [])
  useAnimation(animating, callback)
  return { time, setAnimating}
}



const peter = {

  
  gender: ['man', 'woman'],

}


const modBaseOne = (n:number, m:number) => (n%(m))

export const Monad = (props:{style?: CSSProperties}) => {
  const year = new Date().getFullYear()
  const { time } = useTime()

  const audioRef = useRef<HTMLAudioElement>(null)

 
 
  const [cycles, setCycles] = useState(3)// per sec
  
  const [subdivisions, setSubdivisions] = useState(4)
  const [currentBeat, setCurrent] = useState(4)

  useEffect(() => {
    const beat = modBaseOne(Math.round(time*cycles), subdivisions)
    if(beat !== currentBeat) {
      setCurrent(beat)
      audioRef.current?.play()
    }
  }, [time, cycles, subdivisions])


  useEffect(() => {

    if(!audioRef.current) {
      return
    }
    // const audioCtx = new AudioContext()
    // const src = audioCtx.createMediaElementSource(audioRef.current)
    // src.connect(audioCtx.destination)
    // console.log('connected')

    return () => {
       
    }
  }, [currentBeat])

  return (
    <div data-testid='Monad' className={styles.Monad}>
        <audio ref={audioRef} hidden src='/bubble.mp3'></audio>
        <button onClick={() => {audioRef.current!.currentTime=0;audioRef.current?.play()}}>BUBBLE</button>
        <input type='range' min={2} step={1} max={7} onChange={(ev)=>{setSubdivisions(Number.parseInt(ev.currentTarget.value))}}></input>
        <input type='range' min={2} step={1}max={60} onChange={(ev)=>{setCycles(Number.parseInt(ev.currentTarget.value))}}></input>
        <MonadWrapper>
          <Row style={{justifyContent:'space-between', }}>
          {new Array(subdivisions).fill(false).map((v,i) => (
            <div style={{
              color:i===currentBeat?'green':'red', 
              backgroundColor:i===currentBeat?'green':'red', 
              width:'4rem', 
              height:'4rem',
              clipPath:'circle(50%)'
            }}>{i}</div> 
          ))}
          </Row>
          <Row style={{ flexDirection:'row-reverse'}}>
            <Column style={{ justifyContent:'center',}}>
            </Column>
          </Row>
        </MonadWrapper>
    </div>
  )
}
