// ThemeContext.tsx
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { lightTheme, darkTheme } from './theme'
import { ThemeProvider as SCThemeProvider } from 'styled-components'


const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
})

export const useThemeContext = () => useContext(ThemeContext)


export const ThemeProvider = ({children}: {children:ReactNode}) => {
  const [isDark, setIsDark] = useState(true)
  const toggle = () => {setIsDark(prev => { 
    console.log('setting to ', !prev)
    return !prev
  })}
  
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') setIsDark(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])


  return (
    //@ts-ignore
    <SCThemeProvider theme={ isDark?darkTheme:lightTheme}><ThemeContext.Provider value={{ toggleTheme:toggle, theme:isDark?darkTheme:lightTheme }}>
        {children}
      </ThemeContext.Provider>
    </SCThemeProvider>
  )
}

