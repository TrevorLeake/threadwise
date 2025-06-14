// atoms/Tag.tsx
import styled from 'styled-components'

const darken = (color:string) => `hsl(from `+color+` h s calc(l * .9))`
const lighten = (color:string) => `hsl(from `+color+` h s calc(l * 1.1))`

export const Tag = styled.button`
  background: ${({ theme }) => theme.colors.tagBg || '#f2f2f2'};
  color: ${({ theme }) => theme.colors.tagText || '#333'};
  border: none;
  border-radius: 999px;
  font-size: 0.8rem;
  padding: 0.3rem 0.75rem;
  margin: 0.2rem;
  cursor: pointer;
  &:hover {
    transition-duration:187ms;
    transition-property:background-color, color;
    background: ${({ theme }) => darken(theme.colors.tagBg)};
    color: ${({ theme }) => darken(theme.colors.tagText)};
  }
`
