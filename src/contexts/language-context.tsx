"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { trn, type Lang, type TxtKey, deepTxt } from "@/lib/translations"

type LangCtx = {
    lang: Lang
    setLang: (lang: Lang) => void
    text: (key: TxtKey | string) => string
}

const LangContext = createContext<LangCtx | undefined>(undefined)

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>("en")
    const [ready, setReady] = useState(false)

    useEffect(() => {
        setReady(true)
        const stored = localStorage.getItem("language") as Lang
        if (stored && trn[stored]) {
            setLang(stored)
        }
    }, [])

    useEffect(() => {
        if (ready) {
            localStorage.setItem("language", lang)
        }
    }, [lang, ready])

    const text = (key: TxtKey | string): string => {
        if (key.includes(".")) {
            return deepTxt(trn[lang], key)
        }

        const raw = trn[lang][key as TxtKey] ?? trn.en[key as TxtKey]
        return typeof raw === "string" ? raw : key
    }

    if (!ready) return null

    return (
        <LangContext.Provider value={{ lang, setLang, text }}>
            {children}
        </LangContext.Provider>
    )
}

export function useLang() {
    const context = useContext(LangContext)
    if (!context) {
        throw new Error("useLang must be used within a LangProvider")
    }
    return context
}