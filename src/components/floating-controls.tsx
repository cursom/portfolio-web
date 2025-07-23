"use client"

import { useState } from "react"
import { Moon, Sun, Settings, ChevronDown } from "lucide-react"
import { useTheme } from "./theme-provider"
import { useLang } from "@/contexts/language-context"
import { Cfg } from "./settings-modal"

const lngs = [
    { code: "en", name: "English", flag: "/flags/uk.png" },
    { code: "de", name: "Deutsch", flag: "/flags/de.png" },
    { code: "hu", name: "Magyar", flag: "/flags/hu.png" }
]

interface CtlProps {
    particlesEnabled: boolean
    onParticlesToggle: (v: boolean) => void
}

export function FloatingControls({ particlesEnabled, onParticlesToggle }: CtlProps) {
    const { theme, setTheme } = useTheme()
    const { lang, setLang, text } = useLang()

    const [lngOpen, setLngOpen] = useState(false)
    const [mdlOpen, setMdlOpen] = useState(false)

    const cur = lngs.find(l => l.code === lang)

    return (
        <>
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-3">
                <div className="relative">
                    <button onClick={() => setLngOpen(!lngOpen)} className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 shadow-lg" aria-label={text("language")}>
                        <img src={cur?.flag} alt={cur?.code} className="w-5 h-5 rounded-full" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{cur?.code.toUpperCase()}</span>
                        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>

                    {lngOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-white/20 py-1">
                            {lngs.map(l => (
                                <button
                                    key={l.code}
                                    onClick={() => {
                                        setLang(l.code as any)
                                        setLngOpen(false)
                                    }}
                                    className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors ${ lang === l.code ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" : "text-gray-700 dark:text-gray-300" }`}>
                                    <img src={l.flag} alt={l.code} className="w-5 h-5 rounded-full" />
                                    <span>{l.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button onClick={() => setMdlOpen(true)} className="p-3 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 shadow-lg" aria-label={text("settings")}>
                    <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>

                <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="p-3 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 shadow-lg" aria-label="Toggle theme" >
                    <div className="relative w-5 h-5">
                        <Sun className="absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                    </div>
                </button>
            </div>

            {lngOpen && (
                <div className="fixed inset-0 z-40" onClick={() => setLngOpen(false)} />
            )}

            <Cfg open={mdlOpen} onOpenChange={setMdlOpen} particlesEnabled={particlesEnabled} onParticlesToggle={onParticlesToggle} />
        </>
    )
}