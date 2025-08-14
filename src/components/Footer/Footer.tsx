// components/Footer.tsx
import styled from 'styled-components'
import { HR, PageContainer, Row, Section } from '../../atoms/Container'
import Column from '../Column/Column'
import { Paragraph, SiteGrate } from '../../atoms/Typography'
// import { Tag } from '../atoms/Tag'
import styles from './Footer.module.css'
import type { CSSProperties } from 'react'
import { ThemeToggle } from '../sketchy/ThemeButton'
import { MailingForm } from '../Mailing/MailingForm'
import Brandmark from '../Brandmark/Brandmark'
import { FooterMapLink } from '@/atoms/TypographySC'
import Link from 'next/link'
import React from 'react'



const FooterWrapper = styled.footer`
  margin-top: 5rem;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary || '#888'};
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
`

const FooterName = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  margin-top: 1rem;
  font-weight: 600;
`

const FooterDate = styled.time`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.6;
`





export const Footer = (props:{style?: CSSProperties, children:React.ReactNode}) => {
  const year = new Date().getFullYear()

  return (
    <div data-testid='footer' className={styles.footer}>
      <HR/>
       

        <Row>
          <Column style={{ justifyContent:'left', paddingLeft:'2rem'}}>
            {props.children}
          </Column>
        </Row>


        <FooterWrapper>
        <Column style={{justifyContent:'center'}}>
            <ul>
              Forget your perfect offering: there is a crack in everything, that's how the light gets in. (Leonard Cohen)
              <br/>
            </ul>
          <div>
              {/* <ThemeToggle></ThemeToggle> */}
          </div>
        <Column style={{ justifyContent:'center',}}>
          {/* <FooterMapLink href='https://www.leake.dev'></FooterMapLink> */}
        
          {/* <FooterMapLink href='https://github.com/TrevorLeake'>Github</FooterMapLink> */}
          {/* <FooterMapLink href='https://www.linkedin.com/in/trevor-leake-8b4819132/'>Linkedin</FooterMapLink> */}
        </Column>

        </Column>


        <Row style={{ flexDirection:'row-reverse'}}>
          <Link href='/'>
            {/* <Brandmark style={{ aspectRatio:1, }} /> */}
          </Link>  
        </Row>
      </FooterWrapper>
    </div>
  )
}
