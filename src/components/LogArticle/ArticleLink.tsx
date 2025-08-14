
import { Link as StyledLink } from '@/atoms/TypographySC'
import Link from 'next/link'
import React from 'react'

export const ArticleLink = (props: {href:string, children:React.ReactNode}) =>(
  <Link href={props.href}><>{props.children}</></Link>
)