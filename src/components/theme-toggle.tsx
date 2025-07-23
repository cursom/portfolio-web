"use client"

import { Moon as Mn, Sun as Sn } from "lucide-react"
import { useTheme as ut } from "./theme-provider"

export function Tmtg() {
    const { theme: th, setTheme: st } = ut()

    return (
        <button onClick={() => st(th === "light" ? "dark" : "light")} className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 group shadow-lg" aria-label="Toggle theme">
            <div className="relative w-5 h-5">
                <Sn className="absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                <Mn className="absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
            </div>
        </button>
    )
}