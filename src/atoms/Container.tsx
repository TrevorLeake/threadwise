import type { CSSProperties } from "react"
import styled from "styled-components"

// atoms/Container.tsx
export const BroadPageContainer = styled.div`
  margin: 0 auto;
  padding: .9rem 2.4rem;
  // background-color: ${({ theme }) => theme.colors.shadeBg};
  // box-shadow: .2rem .2rem .5rem #00000099;
  min-height:min(100vh);
`

export const PageContainer = styled.div`
  max-width: 65ch;
  margin: 0 auto;
  padding: .9rem 2.4rem;
  margin-bottom:14rem;
  // background-color: ${({ theme }) => theme.colors.shadeBg};
  // box-shadow: .2rem .2rem .5rem #00000099;
  min-height:min(100vh);
`

export const Section = styled.section`
  margin-bottom: 9rem;
`

export const HR = styled.hr`
  border-style: dotted;
  border-color: ${({ theme })=> theme.colors.secondary};  
  transform: scaleX(1.07);

  `


export const Row = (props:{children:React.ReactNode,style?:CSSProperties}) => <div style={{ display:'flex', flexDirection:'row', ...props.style }}>{props.children}</div>

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


export const FlowRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:1rem;
  justify-content: space-around;
  align-items:stretch;
`

export const PostPreviewSquare = styled.div`
  padding: 1rem;
  // background: ${({theme})=> theme.colors.shadierBg };
  border: .1rem dashed ${({theme})=>theme.colors.text };
  // flex-grow:1
`