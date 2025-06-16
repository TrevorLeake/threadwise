import { Spectral, Spectral_SC, Open_Sans, IBM_Plex_Serif, Roboto_Mono, Merriweather, Merriweather_Sans, Playfair_Display, Playfair_Display_SC, Space_Mono } from "next/font/google";

export const open_sans = Open_Sans({ 
  display:'swap', 
  weight:'400',
  subsets:['latin'],
  variable:'--open-sans'
})

export const merriweather = Merriweather({ 
  display:'swap', 
  weight:'300', 
  subsets:['latin'], 
  variable:'--merriweather'
})

export const playfair = Playfair_Display({ 
  display:'swap', 
  weight:'400', 
  subsets:['latin'], 
  variable:'--playfair'
})

export const merriweather_sans = Merriweather_Sans({ 
  display:'swap', 
  weight:'300', 
  subsets:['latin'], 
  variable:'--merriweather-sans'
})

{/* <meta name="description" content="Like a mirror for your voice"> */}
export const roboto = Roboto_Mono({
  display:'swap',
  variable: "--roboto",
  weight: '400',
  subsets: ['latin']
});


export const spectral = Spectral({
  display:'swap',
  variable: "--spectral",
  weight: '400',
  subsets: ['latin']
});

export const spectralSC = Spectral_SC({
  display:'swap',
  variable: "--spectral-sc",
  weight: '800',
  subsets: ['latin']
});

