"use client"

import { calcAge } from "@/lib/utils"
import { Github, Book, Mail, ChevronDown } from "lucide-react"
import { useLang } from "@/contexts/language-context"

const links = [
    { tag: "Email", ico: Mail, url: "mailto:cursom.contact@gmail.com", clr: "hover:text-blue-500" },
    { tag: "GitHub", ico: Github, url: "https://github.com/cursom", clr: "hover:text-gray-600 dark:hover:text-gray-300" },
    { tag: "Discord", ico: Book, url: "https://discord.com/users/467628010577723392",clr: "hover:text-pink-500" },
]

export function Intro() {
    const yrs = calcAge("2008-04-06")
    const { text:t } = useLang()

    const glide = () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })

    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
                <div className="space-y-4 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">{t("hey")}</span>
                        </h1>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
                            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-pulse">cursom</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-light">{yrs}-{t("developer")}</p>
                        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
                    </div>
                </div>

                <div className="space-y-4 max-w-2xl mx-auto opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{t("description")}</p>
                </div>

                <div className="space-y-6 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                    <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">{t("connectWith")}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {links.map((l, i) => {
                            const Ico = l.ico
                            return (
                                <a key={l.tag} href={l.url} target="_blank" rel="noopener noreferrer" className={`group flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:scale-105 ${l.clr} opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]`} style={{ animationDelay: `${1.4 + i * 0.1}s` }}>
                                    <Ico className="w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{l.tag}</span>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>

            <button onClick={glide} className="absolute bottom-8 opacity-0 animate-[fadeInUp_1s_ease-out_2s_forwards] hover:scale-110 transition-transform duration-300" aria-label="Scroll to skills section">
                <div className="flex flex-col items-center space-y-2 animate-bounce">
                    <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider font-medium">{t("scrollToSkills")}</span>
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors" />
                </div>
            </button>
        </div>
    )
}