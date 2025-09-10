// import { listAudio } from "@/api/audio-api-client";
import { AudioRenderViewer } from "@/components/sketchy/AudioRenderViewer";
import Layout from "@/components/Layout";

import { getSidebarLayoutProps } from '@/lib/layout';
import { AudioMetadata } from "@/types/audioTypes";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const layoutProps = await getSidebarLayoutProps();
  return {
    props: {
      ...layoutProps,
    },
  };
};


interface Props {
  logSlugs: string[];
}


const urlSeriesConstructor = (imgURL:string) => {
  let segments: number
  if(imgURL.includes('I Miss You')) {
    segments = 188
  } else if( imgURL.includes('Jesus')) {
    segments = 1238
  } else {
    segments = 6
  }
  const urls = new Array(segments).fill(0).map((_, i) => imgURL.replace('_0', `_${i}`))
  return urls.map(imageURL => {return{ imageURL, height:200, width:500, timeRes:100, duration:1 }})
}

const audioUrl = (imgURL:string) => {
  let segments: number
  if(imgURL.includes('I Miss You')) {
    return imgURL.replace('_0.png', '.opus')
  } else if( imgURL.includes('Jesus')) {
    return imgURL.replace('_0.png', '.opus')
  } else {
    return imgURL.replace('_0.png', '.wav') // piano
  }
}

export default function GalleryPage({ logSlugs }:Props) {

  // const [audioList, setAudioList] = useState(null) 
  // useEffect(() => {
  //   const query = async () => {
  //     try{
  //       const { ids } = await listAudio()

  //       if(!ids) {
  //         console.log('didnt get ids')
  //         return
  //       }
  //       setAudioList(ids)
  //     } catch (e) {
        
  //     }
  //   }
  //   query()
  // }, [])

  

  const iMissYouURL = 'https://dev-audio-renders.s3.us-west-2.amazonaws.com/i-miss-you/I Miss You [m6b6LLVOlLs]_0.png'
  const pianoURL = 'https://dev-audio-renders.s3.us-west-2.amazonaws.com/piano/piano2_0.png'
  const ur = 'https://dev-audio-renders.s3.us-west-2.amazonaws.com/mlk-why-jesus-called-a-man-a-fool/Martin Luther King Speaks! ＂Why Jesus Called a Man a Fool＂ [OOVaRxOy8ts]_0.png'

  
  const metas: AudioMetadata[] = [
    {id:'1', name:'I miss you', duration:3*60+56,  imageURLs:urlSeriesConstructor(iMissYouURL), audioURL:audioUrl(iMissYouURL) },
    {id:'2', name:'piano', duration:6, imageURLs:urlSeriesConstructor(pianoURL), audioURL:audioUrl(pianoURL) },
    {id:'3', name:'MLK - why Jesus called a man a Fool', freqCap:1000, duration:25*60+50, imageURLs:urlSeriesConstructor(ur), audioURL:audioUrl(ur) },
  ] 

  return (
    <Layout logSlugs={logSlugs}>
      <main className="prose mx-auto">
        {metas.map(meta => 
          <div>
            {/* <VirtualImageList imageURLs={meta.map(m=>m.)}></VirtualImageList> */}
            <AudioRenderViewer style={{}} meta={meta}/>
          </div>
        )}
      </main>
    </Layout>
  );
}
