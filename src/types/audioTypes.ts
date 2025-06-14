export interface RecordingMetadata {
  id:number
  title:string
  duration:number
  isSaved:boolean
}


export interface RecordingRaw {
  id:number
  f32:Float32Array
}



export interface AudioMetadata {
  id:string
  name:string
  imageURLs:AudioImgURL[]
  uploader?:string // id
  format?:string
  audioURL: string

  freqCap?: number

  duration: number // (then... virtualize)
}

export interface AudioImgURL {
  imageURL:string // could "paginate" or assert format for now is _0.png

  height:number   // px
  width:number    // px
  duration:number // sec
  timeRes:number  // sec/px
}
