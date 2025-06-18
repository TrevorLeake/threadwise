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
        {/* <div style={{ width:75,height:0, }}></div> */}
        <Link style={{ paddingTop:12, padding:5}} href='/'>
          <code style={{ backgroundColor:'hsl(from var(--background) h s calc(l*.7))', padding:'.5rem', paddingTop:'.6rem', borderRadius:'7px'}}>
            <strong>
              <b style={{ color:'white',fontSize:'1.3rem'}}>
                /
              </b>
            </strong>
          </code>
          {/* <div style={{ marginTop:10,width:10,height:10,backgroundColor:'white',clipPath:'circe(50%)'}}></div> */}
        </Link>
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

