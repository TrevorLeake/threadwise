// components/Layout.tsx
import Link from 'next/link';
import { Sidebar } from './Sidebar';
import { LogsBar } from './LogsBar';
import sidebarStyles from './Sidebar.module.css'
import layoutStyles from './Layout.module.css'
import { MailingForm } from './Mailing/MailingForm';
import Brandmark from './Brandmark/Brandmark';
import { Row } from '@/atoms/Container';
import { Footer } from './Footer/Footer';

export default function Layout({ children, logSlugs, articleSlugs }: { children: React.ReactNode; articleSlugs: string[]; logSlugs: string[] }) {
  return (
    <div className={layoutStyles.layout}> 
      <div style={{ gridArea: 'header', display:'flex',flexDirection:'row', justifyContent:'start' }}>
        <div style={{ padding:'1em' }}>
          <Link href='/'>L.dev</Link>  
        </div>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'end'}}>
        </div>
      </div>


    

      <div style={{gridArea:'header', visibility:'hidden', display:'flex', flexDirection:'row', }} id='pull-bar'>
        <div className={sidebarStyles.cubby} style={{ flexGrow:1}}>
          <div>
            {/* <Link href='/gallery'>gallery</Link>  / */}
          </div>
          <div>
            {/* <Link href='/about'>about</Link> */}
          </div>
          <div>
            {/* <Link href='/sketches'>sketches</Link> */}
          </div>
        </div>
        {
          Array.from([0,1,2,3]).map((_,i) => <div key={_} style={{flexGrow:1}} className={sidebarStyles.cubby}></div>)
        }
        {/* <Link href={'/sketchpad'}>sketchpad</Link> */}
      </div>

      <main style={{ 
        gridArea: 'main', 
        justifyContent:'center' 
      }}>
        {children}
        
      </main>
      <div style={{ gridArea:'right' }}>
        {/* on relearning to love Developing */}
        {/* <LogsBar slugs={logSlugs} /> */}
        {/* <Sidebar slugs={articleSlugs} /> */}
      </div>

      <Row style={{ gridArea:'mail', marginTop:'5.4rem', padding:'2rem', justifyContent:'center' }}>
        <MailingForm />
      </Row>

      <Footer style={{ gridArea:'footer', }}>
      </Footer>
    </div>
  );
}

// about...
// showing up: (sober, consistent, slow minded, enegized, entitled to occupying space, .....)
// showing up : to dev space after feeling marked out of it.. inadequate

