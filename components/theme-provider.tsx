"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

export const ThemeProvider = ({
  children,
  attribute,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: {
  children: React.ReactNode
  attribute: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (enableSystem && defaultTheme === "system") {
      setTheme(systemTheme)
    }

    if (attribute === "class") {
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(theme)
    } else {
      document.documentElement.setAttribute(attribute, theme)
    }
  }, [])

  useEffect(() => {
    if (attribute === "class") {
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(theme)
    } else {
      document.documentElement.setAttribute(attribute, theme)
    }
    localStorage.setItem("theme", theme)
  }, [theme, attribute])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
