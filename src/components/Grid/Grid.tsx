// components/Grid.tsx
import styled from 'styled-components'
import { HR, PageContainer, Row, Section } from '../../atoms/Container'
import Column from '../Column/Column'
import { Paragraph, SiteGrate } from '../../atoms/Typography'
// import { Tag } from '../atoms/Tag'
import styles from './Grid.module.css'
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ThemeToggle } from '../sketchy/ThemeButton'
import { MailingForm } from '../Mailing/MailingForm'
import Link from 'next/link'
import { useAnimation } from '../hooks/useAnimation'
import useTime from '../hooks/useTime'



const GridWrapper = styled.footer`
  margin-top: 5rem;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary || '#888'};
  border-top: 1px solid ${({ theme }) => theme.colors.text || '#eee'};
`

const GridName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  margin-top: 1rem;
  font-weight: 600;
`

const GridDate = styled.time`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.6;
`






const peter = {
  pronoun: 'him',
  sex:'male',
  
}

const nonbinary ={
  pronoun: null // they
}


    const modBaseOne = (n:number, m:number) => (n%(m))

export const Grid = (props:{style?: CSSProperties}) => {
  const { time } = useTime()

  // background grid with queered squares.. later.. bulbous overlap.. 

  

  const dims = [14, 10]


  useEffect(() => {
  }, [time])


  const f = (n:number):number => n === 0 ? 1 : (n + (f(n-1)))

  return (
    <div data-testid='Grid' style={{
      gridTemplateColumns: `repeat(3, auto)`,
      display:'grid',
      gridAutoRows:`calc(var(--subheading-ramp) + ${10}px)`
    }} className={styles.Grid}>
      {
        dims.map(dn => new Array(dn).fill(1).map((v,i)=>(<div style={{padding:0,margin:0,height:10,width:10, backgroundColor:`rgb(${(+Math.sin(time)*f(i))%200}, calc(${Math.cos(time)*f(i)}*2), 80)`}} />)))
      }
    </div>
  )
}
