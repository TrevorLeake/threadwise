import { useCallback, useRef, useState } from "react";

import { Provider } from "react-redux"
import { store } from "../store"



import styles from './sketches.module.css'
import { Object } from '../lib/sketchTypes'
import { Circle } from "@/atoms/StyledElements";
import { HR, Row, Section } from "@/atoms/Container";
import { useAnimation } from "@/components/hooks/useAnimation";
import WorldLedger from "@/components/WorldLedger/WorldLedger";
import { LatticeTimer } from "@/components/LatticeTimer/LatticeTimer";



type Cell = {x:number, y:number}



const Gazer = () => {
  return <div style={{ 
    backgroundColor:'black', 
    clipPath:'circle(50%)', 
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center' 
  }}>
    <Circle/>
  </div>
}





const Subject = (props:{size:number}) => (

  <div style={{
    aspectRatio:1, height:props.size, border:'.4rem solid white', borderRadius:'100%', backgroundColor:'rgba(0,0,0,.5)', clipPath:'circle(50%)'}}>
  </div>
)




export default function SketchPage({ frontmatter, mdxSource, slugs }: any) {
  // const fields = 'software and computer science; math; mechanical engineering; music'
  
  const CELL = 10
  const WIDTH = 5
  const HEIGHT = 3
  const [cellPosition, setCellPosition] = useState<Cell>()

  // having an infinite grid... 
  // which is made of tile strings,
  const tuning = [0,5,5,5,4,5]
  const octaveTile = '1-2-34-5-6-7'
  const octave = [0,2,4,5,7,9,11]  


  const rotate = (necklace:string, offset:number) => necklace.slice(offset % necklace.length) + necklace.slice(0, offset  % necklace.length)  
  let shiftSum = 0

  const ezraSamVid = 'https://rr1---sn-nx57ynsd.googlevideo.com/videoplayback?expire=1750554226&ei=EgJXaLz4HMGYsfIPvK3giQU&ip=75.164.134.52&id=o-AE-izY9ZqXd_LcbDeyLvGqY_43M032mT4saZxlla5GcV&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1750532626%2C&mh=cE&mm=31%2C26&mn=sn-nx57ynsd%2Csn-n4v7snlr&ms=au%2Conr&mv=m&mvi=1&pl=16&rms=au%2Cau&initcwndbps=1931250&bui=AY1jyLOs7EW4LL6hvGoGCSp3uUfX0yhCkIplVL7gI_3Kao3UG-h9fvr5am7icEX1HedBHQfNJtlrs4hl&vprv=1&svpuc=1&mime=video%2Fmp4&ns=zKLma0h-vyb2fkiP4ZSozNIQ&rqh=1&gir=yes&clen=234823990&ratebypass=yes&dur=5255.488&lmt=1747398824658161&mt=1750532243&fvip=1&lmw=1&fexp=51466642%2C51466697&c=TVHTML5&sefc=1&txp=7308224&n=pbvVPmkdGReOFw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgUen8hTFGFvWw3vNpuxfyUTTxFaisdqAhR1VebOWIJB0CIE5gja_WDP9Lv41vAY6BB0YH2t56r3UcIEPT5qrmwpIW&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgdiZBLOcU__h_kcJ4zM5Opi8ocqsqFZ7vBvZF4OaKEeQCIQDVS2Wldc643-IWNqydT2oxWpj7vMuXw3Oc-qEd35nVDQ%3D%3D'
  const destinyVid = 'https://rr1---sn-nx57ynsz.googlevideo.com/videoplayback?expire=1750535609&ei=WblWaLvyCsT0sfIP2b79uAs&ip=75.164.134.52&id=o-AO4qKt2EpJlT2oI3JBYRW4eBYBvM_DGNzrwVkQzzGCV6&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1750514009%2C&mh=RK&mm=31%2C26&mn=sn-nx57ynsz%2Csn-n4v7sney&ms=au%2Conr&mv=m&mvi=1&pl=16&rms=au%2Cau&initcwndbps=1681250&bui=AY1jyLNey4te6pi91p2D1_6fXfUX2ojAVF4b19qp31M0TMS5D6MaP6sfKvWHf6uGs79B56-Ha2xBMAVN&vprv=1&svpuc=1&mime=video%2Fmp4&ns=wUWIXW3A9sH5VsxcfUn8FX8Q&rqh=1&cnr=14&ratebypass=yes&dur=5330.279&lmt=1748123887243303&mt=1750513526&fvip=5&lmw=1&fexp=51466642%2C51466698&c=TVHTML5&sefc=1&txp=5538534&n=FAdx_gbPGaFx7A&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgA48UdZLZTOSa1qyA5xvnQlTZq2A9l7Qh-FC5-6S5H9cCIQDk04trFMFuwAUQSTjKET8mFkb3S7PZvRHmGN1-wvW63Q%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIgCKlSpxMQJQd_RL0UR_6yJFyqnBCWoGqWSDanCOdCbtgCIQCl2wdcqaJqFXaKLflgfcHSnE6m2h0niWDoAxcGSKZ7Ow%3D%3D'
  const alokMizVid = 'https://rr3---sn-nx57ynsk.googlevideo.com/videoplayback?expire=1750561069&ei=zRxXaN-ZHp68sfIP8-iHiQI&ip=75.164.134.52&id=o-AIxOApzws0CwX21cuyLGazob0uts8y-7eeDrcjGvo-ql&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1750539469%2C&mh=MI&mm=31%2C26&mn=sn-nx57ynsk%2Csn-o097znsk&ms=au%2Conr&mv=m&mvi=3&pl=16&rms=au%2Cau&initcwndbps=1861250&bui=AY1jyLMLLmTqHvbOXb7ZmnacTcNldcJKR-ZV51GBfQculA5BhwdWWhDOuam1Qb1XI44RKilTJbfucCRC&vprv=1&svpuc=1&mime=video%2Fmp4&ns=032QwRA5b-sjrTm3_kGTe04Q&rqh=1&cnr=14&ratebypass=yes&dur=7672.685&lmt=1748198604811756&mt=1750538951&fvip=2&lmw=1&fexp=51466642%2C51466698&c=TVHTML5&sefc=1&txp=8218224&n=lk0CggE1MTBQ3g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRAIgcK1_J_PWxJytYddam6GRzioMdxB1GjsiDPyA8WrknjACIE90-c8LUZ3G0Sq_ibfCy3_41B6bDr9y1JephJ38kh9Z&sig=AJfQdSswRQIhAOEBW6r6izicCd1Ql8Ke0rNa80M5ccyFxcLNsf0AMPcsAiBw5I84oIcPSI6-6Dv2FGjT3_a0m1C1AOIVI8pFXGMN6w%3D%3D'
  const aVid = 'https://rr3---sn-nx57ynsz.googlevideo.com/videoplayback?expire=1752149603&ei=AlpvaJLFPNShsfIPreWKkQQ&ip=75.164.142.157&id=o-AEqw8abVyyRFYaZoafFb6zXRHRU_mURi8tr3raZi8ZiA&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1752128002%2C&mh=6q&mm=31%2C26&mn=sn-nx57ynsz%2Csn-n4v7sney&ms=au%2Conr&mv=m&mvi=3&pl=23&rms=au%2Cau&initcwndbps=1760000&bui=AY1jyLPNbjj9XtcguibuZ7HrO85D_a-EDT6qBkyFK2IEobH40vtNX2nYDVpMDd_ylGvhmkMlcPaHiyno&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=W90iPArZoFAR4kBeR2aMpAcQ&rqh=1&gir=yes&clen=104054617&dur=7486.761&lmt=1731184634765797&mt=1752127519&fvip=1&keepalive=yes&lmw=1&fexp=51476174&c=TVHTML5&sefc=1&txp=5532434&n=XEweYPZ-tIUH8Q&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAPrDhaUHcG0IYnCtM0YOoVngNyIrChfuJNBzOLvkELwVAiEAqYfFhH2ntC7pTNTFL2t8ZqtJ-zMNZTkWzpE_Wt2X8Wg%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIhAO8SqrBbjuX11uZWzGhwNtDkwvH_AH-ABhMzCRBAo-j1AiBJiU-IUFTlsc6TSh4tyY9M0JU7xm8QQf9U1HmP8FTmVA%3D%3D'
  const [duration, setDuration] = useState(0)

  const [video, setVideo] = useState(ezraSamVid)
  const count = 900

  

  // observer for size..
  const [height, setHeight] = useState(266)
  const [currentTime, setCurrentTime] = useState<number>()
   
  // entity with regions....
  //  sense... minimap
  //  

  // 1.5D video game; scroller lattice game
  const [t, setT] = useState(0)
  
  const animationCallback = useCallback((dt:number) => {
    setT(t => {
      const nextTime = dt+t

      setBounds({
        x:nextTime*180,
        y:0,
        w:0,
        h:0 
      })
      return nextTime
    })
  }, []) 
  const [animating, setAnimating] = useState(true)
  useAnimation(animating, animationCallback)

  type Bounds = {
    x:number,
    y:number,
    w:number,
    h:number
  }
  const [bounds, setBounds] = useState<Bounds>({
    x:10,
    y:0,
    w:0,
    h:0
  })

  const ref = useRef<HTMLVideoElement>(null)

  const bbox = {x:0,y:0,h:0,w:0}


  const value = Math.sqrt(-Math.abs(Math.sin(t+1)))



  const selfTree = {
    good: { // self good
      disgustObject: '',
    },
    bad: { // self bad
      selfDisgust: '',
      disappointment: '',
    }
  }


  return (
    <div>
      <div>OKAYOKAYOKAYOKAYOKAYOKAYOKAY</div>



      {/* <LatticeTimer></LatticeTimer>
      
      <br/>
      <br/>
      <br/>
      <br/>
      <br/> */}
      
      {/* <button onClick={()=>(setAnimating(a=>!a))}>pause</button>
      {t} */}



      <article style={{ lineHeight:'2em', backgroundColor:'rgba(250,40,40,.5)' }} className={'dark-mode'}  >
        
        
        {/* <Section>
          <p>Scene</p>
          <select size={4} onChange={(ev) => {setVideo(ev.currentTarget.value)}}>
            <option label='idle' value={100}></option>
            <option label='good-object-prox' value={300}></option>
            <option label="good-object-indication" value={500}></option>
            <option label="good-object-expression"></option>
          </select>


        <Row>

          <div style={{
            height: 200, 
            width:'100%', 
            backgroundColor:'var(--off-black)',  
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            position:'relative'
          }}>
            <Subject size={100}/>
          </div>
          </Row>
          <Provider store={store}> 
            <WorldLedger></WorldLedger>
          </Provider>
          <svg viewBox={`${t} ${t*30} 500 200`} width={500} height={500} xmlns="http://www.w3.org/2000/svg">
            <filter id="effect-name" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.2"/>

              <feOffset in="turb" result="offsetTurb"/>

              <feColorMatrix in='offsetTurb' values={`0 0 .2 9 -4
                                    0 3 0 3 
                                    .2 .2 3 9 -1
                                    0 0 0 3 1`}/>
              </filter>
              <rect dx={t} dy={t} width={500} height={500} filter="url(#effect-name)"/>
          </svg>


        </Section>
        <HR/>         */}
        
        {/* VIDEO<br/> */}
        {/* <br/>
        <time>{(duration/60).toFixed(0)}:{(duration%60).toFixed(0)}:{((duration*60)%60).toFixed(0)}</time><br/>
        <select size={4} onChange={(ev) => {setVideo(ev.currentTarget.value)}}>
          <option label='destiny' value={destinyVid}></option>
          <option label='alok-miz' value={alokMizVid}></option>
          <option label="ezra-sam" value={ezraSamVid}></option>
          <option label="video" value={aVid}></option>
        </select> */}

        
{/* 

        <div>


          <video
            // onError={(err) => {console.log(); toggleModal}}
            ref={ref}
            onLoadedMetadata={(ev) => {
              setDuration(ev.currentTarget.duration/60)//min
              setHeight(ref.current?.height || 266)
            }}
            controls 
            style={{ maxWidth:'100%', height }} 
            src={video}
            onTimeUpdate={(ev) => { 
              console.log(ev.currentTarget.currentTime/(duration*60))
              setCurrentTime(ev.currentTarget.currentTime)
            }}
          />



          <button>STEP</button>
        </div>
 */}



          {/* {new Array(10).fill(1).map((t, i) => `${i**2}, `)} */}

        {/* <br/>
        trying to do tasks... I can feel the end of.
        <br/>
        Monad-task sketch


        Some things I'm hearing...

        <br/>
        I'm a really emotional guy - JD Vance */}
        {/* monad */}

        

      </article>
      
      {/* <article className={styles.dual}>
        I GREET THEE GRETA
      </article> */}


    </div>
);
}