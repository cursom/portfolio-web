"use client"

import { useState, useEffect } from "react"
import { CreativeBg } from "@/components/sections/abs-background"
import { FloatingControls } from "@/components/floating-controls"
import { Intro } from "@/components/sections/intro-section"
import { Skills } from "@/components/sections/skills-section"

export default function Home() {
    const [pe, sp] = useState(true)

    useEffect(() => {
        const sv = localStorage.getItem("particlesEnabled")
        if (sv !== null) sp(JSON.parse(sv))
    }, [])

    const tg = (v: boolean) => {
        sp(v)
        localStorage.setItem("particlesEnabled", JSON.stringify(v))
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative overflow-hidden transition-colors duration-300">
            <CreativeBg particlesEnabled={pe} />
            <FloatingControls particlesEnabled={pe} onParticlesToggle={tg} />
            <div className="relative z-10">
                <Intro />
                <Skills />
            </div>
        </div>
    )
}