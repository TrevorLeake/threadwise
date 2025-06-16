// theme.ts
export const lightTheme = {
  name:'light',
  colors: {
    background: '#333',
    shadeBg: '#eee',
    shadierBg: '#ddd',
    text: '#111',
    primary: 'var(--off-white)',
    secondary: 'red',
    tagBg: '#ddd',
    tagText: '#333',
  },
  fonts: {
    body: 'Georgia, serif',
    pleasantAuthority:'Playfair Display',
    subheading: 'IBM Plex',
    heading: 'Playfair Display',
  },
}

export const darkTheme = {
  name:'dark',
  colors: {
    background: '#111',
    text: '#f0f0f0',
    shadeBg: '#222',
    shadierBg: '#333',
    primary: '#66d9ef',
    tagBg: '#333',
    tagText: '#ccc',
    
  },
  fonts: lightTheme.fonts,
}


export type AppTheme = typeof lightTheme;