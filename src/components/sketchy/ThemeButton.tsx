// components/ThemeToggle.tsx

import { useThemeContext } from "../../ThemeContext"

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext()


  return (
    <button onClick={() => {toggleTheme()}} aria-label="toggle theme">
      {theme.name === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
