// components/Footer.tsx
import styled from 'styled-components'
import { HR, PageContainer, Row, Section } from '../../atoms/Container'
import Column from '../Column/Column'
import { Paragraph, SiteGrate } from '../../atoms/Typography'
// import { Tag } from '../atoms/Tag'
import styles from './Footer.module.css'
import type { CSSProperties } from 'react'
import { ThemeToggle } from '../ThemeButton'
import { MailingForm } from '../Mailing/MailingForm'
import Brandmark from '../Brandmark/Brandmark'
import { FooterMapLink } from '@/atoms/TypographySC'



const FooterWrapper = styled.footer`
  margin-top: 5rem;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary || '#888'};
  border-top: 1px solid ${({ theme }) => theme.colors.text || '#eee'};
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





export const Footer = (props:{style?: CSSProperties}) => {
  const year = new Date().getFullYear()

  return (
    <div data-testid='footer' className={styles.footer}>
        <FooterWrapper>
      <Column style={{ justifyContent:'center',}}>
        <FooterMapLink>Github</FooterMapLink>
        <FooterMapLink>BabelFish</FooterMapLink>
        <FooterMapLink></FooterMapLink>
      </Column>
          
        <Column style={{justifyContent:'center'}}>
            <ul>
              Forget your perfect offering: there is a crack in everything, that's how the light gets in. (Leonard Cohen)
              <br/>
            </ul>
          <div>
            <ThemeToggle></ThemeToggle>
          </div>
        </Column>

        <Row style={{}}>
          <Brandmark style={{ aspectRatio:1, }} />
        </Row>
        </FooterWrapper>
    </div>
  )
}
