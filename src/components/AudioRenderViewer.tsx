import Image from "next/image"
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react"
import { useAnimation } from "./hooks/useAnimation"

import { useInView } from 'react-intersection-observer'
import { useVirtualizer } from "@tanstack/react-virtual"
import { AudioImgURL, AudioMetadata } from "@/types/audioTypes"
import Link from "next/link"

import './audio-render-viewer.module.css'

export function VirtualImageList(props:{ imageURLs:AudioImgURL[]}) {
  const parentRef = useRef(null)

  const rowVirtualizer = useVirtualizer({
    count: props.imageURLs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => props.imageURLs[0].width, // estimated height of each row
    overscan: 5,             // render 5 extra images above/below
  })

  return (
    <div
      ref={parentRef}
      style={{
        // overflowX: 'scroll',
        position: 'relative',
        border: '1px solid #ccc',
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const imageUrl = props.imageURLs[virtualRow.index]
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                display:'flex',
                flexDirection:'row',
                left: 0,
                width: '100%',
                transform: `translateX(${virtualRow.start}px)`,
                padding: '10px',
                boxSizing: 'border-box',
              }}
            >
              <img
                src={imageUrl.imageURL}
                loading="lazy"
                width={imageUrl.width}
                height={imageUrl.height}
                alt={`Image ${virtualRow.index}`}
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                  display: 'block',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

//@ts-ignore
export default function LazyImage({ src, alt, width, height, preloadMargin = '150px' }) {
  const { ref, inView } = useInView({
    rootMargin: preloadMargin, // control how early to load
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          // style={{objectFit:'cover'}}
          height={height}
          // priority
          loading="lazy" // Already controlled via IntersectionObserver
        />
      )}
    </div>
  );
}

export const AudioRenderViewer = ({style, meta}: {style:CSSProperties, meta:AudioMetadata}) => {
  console.log(meta)
  const { name, imageURLs, audioURL, duration } = meta
  const audioRef = useRef<HTMLAudioElement>(null)

  const playheadRef = useRef<HTMLDivElement>(null)
  const playheadLeaderRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)


  const [playhead, setPlayhead] = useState<number>()
  const [playing, setPlaying] = useState<boolean>(false)


  const onTimeUpdate = useCallback((dt:number) => {
    if(!audioRef.current)
      return
    const { currentTime } = audioRef.current

    // setPlayhead((currentTime*100*4 - scrollContainerRef.current!.offsetLeft))
    setPlayhead(ph => {
      if(!playheadLeaderRef.current)
        return

      const newPh = (ph||0)+(dt*400)
      // playheadLeaderRef.current.scrollIntoView({  behavior:'instant', block:'end', inline:'nearest'})
      scrollContainerRef.current!.scroll({ behavior:'instant',  left:Math.max(newPh-400, 0) })

      return newPh
    })

  }, [audioRef])
  useAnimation(playing, onTimeUpdate)


  useEffect(() => {
    if(!scrollContainerRef.current)
      return

    const onKeydown = (ev:KeyboardEvent) => {
      if(ev.key === ' ') {
        if(!playing)
          audioRef.current!.play()
        else
          audioRef.current!.pause()
        ev.preventDefault()
      }
    }

    const onClick = (ev:MouseEvent) => {
      if(!scrollContainerRef.current)
        return
      const { scrollLeft, offsetLeft } = scrollContainerRef.current
      const { clientX, offsetX } = ev
      
      const x = -offsetLeft + scrollLeft + clientX
      console.log(x)
      setPlayhead(x)
      // console.log(scrollLtoPh/400)
      console.log(x, x)
      console.log((x)/400)
      
      audioRef.current?.fastSeek(((x-120)/400))
    }
    scrollContainerRef.current.addEventListener('mousedown', onClick)
    scrollContainerRef.current.addEventListener('keydown', onKeydown)

    return () => {
      scrollContainerRef.current?.removeEventListener('mousedown', onClick)
      scrollContainerRef.current?.removeEventListener('keydown', onKeydown)
    } 
  }, [playing, playhead])

  useEffect(() => {
    if(!audioRef.current)
      return

    const onPlay = () => { setPlaying(true) }
    const onStop = () => { setPlaying(false) }

    audioRef.current.addEventListener('play', onPlay)
    audioRef.current.addEventListener('pause', onStop)

    // audioRef.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      audioRef.current?.removeEventListener('play', onPlay)
      audioRef.current?.removeEventListener('pause', onStop)
      // audioRef.current?.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [audioRef, playing, playhead])


  const FREQUENCY_CAP = 20000
  const applyFrequencyCap = (height: number/*px*/) => {
    const { freqCap } = meta
    if(!freqCap)
      return height
    return (height-height*(freqCap/FREQUENCY_CAP))
  }


  return (
    <div
      ref={scrollContainerRef} 
      tabIndex={1}
      style={{ 
        position:'relative',
        display:'flex',
        height:imageURLs?imageURLs[0].height : '100%', 
        overflowX:'scroll',
        overflowY:'clip',
        // overflow:'clip',
        scrollbarWidth:'none',
      }
    }>
          <div style={{ 
            left:0,
            zIndex:1,
            position:'sticky',
            display:'flex', 
            flexDirection:'column', 
            justifyContent:'space-between', 
          }}>
          <h3 className="light-on-hover-text" style={{ paddingLeft:'.6em', paddingTop:2 }}><Link href={`/audio/${meta.id}`}>{name}</Link></h3>

          <audio 
            className="opaque-on-hover"
            ref={audioRef}
            preload="metadata"
            src={audioURL}
            style={{ bottom:0, left:0  }} 
            controls
            onLoadedMetadata={(ev) => {
              console.log('loaded meta')
              if(audioRef.current)
                console.log(audioRef.current?.duration)
            }}
          />
        </div>
    <div
      style={{ 
        position:'relative', 
        display:'flex', 
        translate:'-300px 0',
        width:'max-content'
      }}
    >
      <div ref={playheadRef} className="playhead" style={{  
        left:`${playhead||0}px`,
        height:imageURLs?imageURLs[0].height : '100%', 
      }}>
        <div ref={playheadLeaderRef} style={{width:'fit-content', position:'relative', marginLeft:200, translate:'200px 0 '}}></div></div>


      <div className={'spectral-lane'} style={{ 
        display:'flex', 
        flexDirection:'row',
      }}>
        {/* time res function; time is always right to do right; practice like you'll play */}

        {imageURLs.map(({ width, height, imageURL }, i) => 
          <LazyImage 
            key={i} width={width}   height={applyFrequencyCap(height)} alt="colors" src={imageURL}
            // {...style}
          />
        // <Image 
        // />
        )}
      </div>

    </div>
</div>
  
  )

}