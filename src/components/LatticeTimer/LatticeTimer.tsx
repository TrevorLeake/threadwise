// components/LatticeTimer.tsx
import styled from 'styled-components'
import { HR, PageContainer, Row, Section } from '../../atoms/Container'
import Column from '../Column/Column'
import { Paragraph, SiteGrate } from '../../atoms/Typography'
// import { Tag } from '../atoms/Tag'
import styles from './LatticeTimer.module.css'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ThemeToggle } from '../sketchy/ThemeButton'
import { MailingForm } from '../Mailing/MailingForm'
import Link from 'next/link'
import { useAnimation } from '../hooks/useAnimation'



const LatticeTimerWrapper = styled.footer`
  margin-top: 5rem;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary || '#888'};
  border-top: 1px solid ${({ theme }) => theme.colors.text || '#eee'};
`

const LatticeTimerName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  margin-top: 1rem;
  font-weight: 600;
`

const LatticeTimerDate = styled.time`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.6;
`



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



const setup = async (): Promise<OscillatorNode> => {
  const audioCtx = new AudioContext()
  const oscNode = new OscillatorNode(audioCtx)
  oscNode.connect(audioCtx.destination)
  await audioCtx.audioWorklet.addModule('./bypass-processor.js');
  const scriptNode = new AudioWorkletNode(audioCtx, 'bypass-processor');
  oscNode.connect(scriptNode).connect(audioCtx.destination)
  return oscNode
}

const modBaseOne = (n:number, m:number) => (n%(m))

export const LatticeTimer = (props:{style?: CSSProperties}) => {
  const { time } = useTime()

  const audioRef = useRef<HTMLAudioElement>(null)

  const [cycles, setCycles] = useState(3)// per sec
  
  const [subdivisions, setSubdivisions] = useState(3)
  const [currentBeat, setCurrent] = useState(0)

  useEffect(() => {
    const beat = modBaseOne(Math.round(time*cycles), subdivisions)
    if(beat !== currentBeat) {
      setCurrent(beat)
    }
  }, [time, cycles, subdivisions])

  const [oscNode, setOsc] = useState<OscillatorNode>()

  const [playing, setPlaying] = useState<boolean>(false)




  useEffect(() => {
    // const src = audioCtx.createMediaElementSource(audioRef.current)

    return () => {
       
    }
  }, [])


  const size = '4rem'
  return (
    <div data-testid='lattice-timer' className={styles.LatticeTimer}>
        <audio ref={audioRef} hidden src='/bubble.mp3'></audio>
        <LatticeTimerWrapper>
          HELLO WORLD
        </LatticeTimerWrapper>
        Mandala workshop

          <Row style={{justifyContent:'space-between', }}>
            <div style={{ width:size, height:size, backgroundColor:'red'}}>
              Start
            </div>
            {new Array(subdivisions).fill(false).map((v,i) => (
              <div style={{
                color:i===currentBeat?'green':'red', 
                backgroundColor:i===currentBeat?'green':'red', 
                width:size, 
                height:size,
                clipPath:'circle(50%)'
              }}>{i}</div> 
            ))}
            <div style={{ width:size, height:size, backgroundColor:'red'}}>
              End
            </div>
          </Row>
          <Row style={{ flexDirection:'row-reverse'}}>
            <Column style={{ justifyContent:'center',}}>
            </Column>
          </Row>

    </div>
  )
}
