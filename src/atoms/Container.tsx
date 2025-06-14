import type { CSSProperties } from "react"
import styled from "styled-components"
import '../styles/globals.css'

// atoms/Container.tsx
export const PageContainer = styled.div`
  max-width: 60ch;
  margin: 0 auto;
  padding: .9rem 2.4rem;
  // background-color: ${({ theme }) => theme.colors.shadeBg};
  // box-shadow: .2rem .2rem .5rem #00000099;
`

export const Section = styled.section`
  margin-bottom: 9rem;
`

export const HR = styled.hr`
  border-color:${({ theme })=> theme.colors.tagText};  
  transform: scaleX(1.07);

  `


export const Row = (props:{children:React.ReactNode,style:CSSProperties}) => <div style={{ display:'flex', flexDirection:'row', ...props.style }}>{props.children}</div>

export const Form = styled.form`
  padding:3rem;
  box-shadow: .2rem .2rem .5rem #00000099;
  display:block;
  background-color: ${({ theme }) => theme.colors.shadeBg};
  max-width: fit-content;
  align-items:center;
  
`

export const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.shadierBg};
  color: ${({ theme }) => theme.colors.text};

  border-color: ${({ theme }) => theme.colors.shadierBg};
  border-width: 1px;
  // outline:none;
  margin:3px;
`