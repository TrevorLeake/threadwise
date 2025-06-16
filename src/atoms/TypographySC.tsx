// atoms/Typography.tsx
import styled from 'styled-components'

// import '../styles/globals.css'

export const Heading = styled.h1`
  font-size: var(--heading-ramp); 
  font-weight: 400;

  color: ${({theme})=> theme.colors.text};
  font-family: ${({theme})=> theme.fonts.heading};
  margin-bottom: 1rem;
  
  `
export const SectionHeading = styled.h2`
  font-size: var(--section-heading-ramp); 
  font-weight: 400;

  color: ${({theme})=> theme.colors.text};
  font-family: ${({theme})=> theme.fonts.heading};
  margin-bottom: 1rem;

`
export const SectionSubheading = styled.h6`
  font-size: var(--small-read); 
  font-weight: 300;
  
  text-indent:1rem;

  color: ${({theme})=> theme.colors.primary};
  font-family: ${({theme})=> theme.fonts.subheading};
`

// IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700
// Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900
// Noto+Sans:ital,wght@0,100..900;1,100..900
// Playfair+Display:ital,wght@0,400..900;1,400..900
// Roboto:ital,wght@0,100..900;1,100..900
// Space+Mono:ital,wght@0,400;0,700;1,400;1,700

export const Subheading = styled.h2`
  font-size: var(--subheading-ramp);
  font-weight: 300;
  font-family: ${({theme})=> theme.fonts.subheading};
  font-style:thin;
  margin-bottom: 3rem;
  color:rgb(126, 123, 123);
  margin-left:auto;
`

export const Paragraph = styled.p`
  font-size: var(--body-ramp);
  color: ${({theme})=> theme.colors.text};
  line-height: 1.55;
  font-family: ${({theme})=> theme.fonts.body};
  text-align: left;
  margin-bottom: 1.25rem;
  word-wrap: anywhere;
`


export const EyeLead = styled.p`
  font-size: calc(var(--body-ramp) + .4rem);
  font-variant: all-small-caps;
  display:inline;
`

export const PostPreviewParagraph = styled.p`
  font-size: var(--small-read);
  color: ${({theme})=> theme.colors.text};
  line-height: 1.2;
  font-weight:200;
  font-family: ${({theme})=> theme.fonts.body};
  text-align: left;
  word-wrap: anywhere;

  text-overflow: ellipsis; 
`

export const PostPreviewHeading = styled.h3`
  font-size: calc(var(--subheading-ramp) - .4rem);
  color: ${({theme})=> theme.colors.text};
  line-height: 1.2;
  font-family: ${({theme})=> theme.fonts.pleasantAuthority};
  text-align: left;
  word-wrap: anywhere;

`


export const SiteGrate = styled.p`
  font-size: var(--site-voice-ramp);
  font-family: ${({theme})=> theme.fonts.pleasantAuthority};
  color: ${({theme})=> theme.colors.tagText};
  text-align: left;
  margin-top:0;
  margin-bottom: 1.25rem;
`


export const ListItem = styled.li`
  font-size: var(--body-ramp);
  color: ${({theme})=> theme.colors.text};
  line-height: 1.55;
  font-family: ${({theme})=> theme.fonts.body};
  text-align: left;
  margin-bottom: 1.25rem;
  text-indent:1rem;
`

export const InlineCode = styled.code`
  background: ${({ theme }) => theme.colors.background};
  padding: 0.1em 0.3em;

  color: ${({ theme }) => theme.colors.text};
  font-family: var(--roboto);
  border-radius: 4px;
  font-size: 0.95em;
`
export const PortalText = styled.span`
  background: ${({ theme }) => theme.colors.background};
  margin:1rem;
  padding:.5rem .6rem;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 4px;
`

export const InlinePortal = styled.span`
  background: ${({ theme }) => theme.colors.shadierBg};
  margin:1rem;
  padding:.5rem;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 4px;
`

export const Link = styled.a`
  text-decoration: none;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.text};
  }
`

export const FooterMapLink = styled.a`
  text-decoration: none;
  border-bottom: 1px solid transparent;
  color:rgb(186, 183, 183);
  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.shadeBg};
  }
`


export const Button = styled.button`
  background-color: ${({theme})=>theme.colors.background};
  color: ${({theme})=>theme.colors.text};
  border: 2px solid ${({theme})=>theme.colors.text};
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`

