"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type tpp = {
    children: React.ReactNode
    defaultTheme?: Theme
}

type tps = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: tps = {
    theme: "dark",
    setTheme: () => null,
}

const tpc = createContext<tps>(initialState)

export function ThemeProvider({ children, defaultTheme = "dark" }: tpp) {
    const [theme, setTheme] = useState<Theme>("dark")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("light")

        const stored = localStorage.getItem("theme") as Theme
        if (stored === "dark" || stored === "light") {
            setTheme(stored)
            document.documentElement.classList.remove("light", "dark")
            document.documentElement.classList.add(stored)
        } else {
            setTheme(defaultTheme)
            document.documentElement.classList.add(defaultTheme)
        }

        setMounted(true)
    }, [defaultTheme])

    useEffect(() => {
        if (mounted) {
            const root = document.documentElement
            root.classList.remove("light", "dark")
            root.classList.add(theme)
            localStorage.setItem("theme", theme)
        }
    }, [theme, mounted])

    const value = {
        theme,
        setTheme,
    }

    return <tpc.Provider value={value}>{children}</tpc.Provider>
}

export function useTheme() {
    const context = useContext(tpc)
    if (context === undefined) {
        throw new Error("valami nem jo")
    }
    return context
}