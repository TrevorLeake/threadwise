import Link from "next/link";
import { CSSProperties, useState } from "react";

import sidebarStyles from './Sidebar.module.css'
import css from "styled-jsx/css";
import { FooterMapLink } from "@/atoms/TypographySC";

// components/Sidebar.tsx
export function Sidebar({ slugs, style }: { slugs: string[], style?:CSSProperties }) {
  const [hovered, setHovered] = useState<number>()
  return (
    <nav className={sidebarStyles.sidebar} style={{ ...style }}>
      <ul style={{ 
        margin: 10, 
        padding:10,
        display:'flex',
        flexDirection:'column',
        textWrap:'nowrap',
        overflow:'visible', 
        height:'100%',
      }}>
        <h4 key='header' style={{ }}>articles</h4>
        {/* <sub>may</sub> */}
        {slugs.map((slug, i) => (
          <Link key={slug} href={`/posts/${slug}`}>
            {slug.replaceAll('-', ' ')}
          </Link>
        ))}
        {/* <pre>
        journals: css html js;<br/>
        functional programming
        sketches
        <br/>
        <br/>ring list... imperatives; todos; open workshop policy
        <br/>working logs
        <br/>working journals
        <br/>mdx templates; building up m-*
      
        </pre> */}
        
      </ul>
    </nav>
  );
}
