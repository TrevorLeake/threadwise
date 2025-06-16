import Link from "next/link";
import { CSSProperties, useState } from "react";

import sidebarStyles from './LogsBar.module.css'
import css from "styled-jsx/css";

// components/Sidebar.tsx
export function LogsBar({ slugs, style }: { slugs: string[], style?:CSSProperties }) {
  const [hovered, setHovered] = useState<number>()
  return (
    <nav className={sidebarStyles.sidebar} style={{ ...style }}>
      <ul style={{ 
        margin: 10, 
        padding:10,
        display:'flex',
        flexDirection:'column',
        // flexWrap:'column wrap',
        textWrap:'nowrap',
        overflowX:'visible', 
        height:'100%',
        justifyContent:'right'
      }}>
        <div key='div' style={{ display:'flex', flexDirection:'row', justifyItems:'flex-end', }}>
          <h4 style={{ marginLeft:'auto' }}>dev log</h4>
        </div>
        {/* <sub>may</sub> */} 
        {slugs.toReversed().map((slug, i) => (
          <Link key={slug} style={{ marginLeft:'auto'}} href={`/logs/${slug}`}>
            {/* <li 
              onMouseEnter={(_)=>{ setHovered(i) }}
              onMouseLeave={(_)=>{ setHovered(undefined) }}
              key={slug}
            > */}
              {slug.replaceAll('-', ' ').replace(' dev log', '')}
            {/* </li> */}
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
