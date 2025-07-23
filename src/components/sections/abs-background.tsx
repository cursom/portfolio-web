"use client"

import { useEffect, useRef, useState } from "react"

type Pt = {
    id: number
    x: number
    y: number
    r: number
    dx: number
    dy: number
    o: number
    c: string
}

type Gm = {
    id: number
    x: number
    y: number
    s: number
    rot: number
    rotS: number
    t: "square" | "circle" | "triangle"
    o: number
}

type Props = {
    particlesEnabled: boolean
}

export function CreativeBg({ particlesEnabled: on }: Props) {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const svgRef = useRef<SVGSVGElement>(null)
    const ptsRef = useRef<Pt[]>([])
    const gmsRef = useRef<Gm[]>([])
    const anim = useRef<number>(0)

    const trackerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!on) return

        const clr = [
            "rgba(139,92,246,0.6)",
            "rgba(59,130,246,0.6)",
            "rgba(16,185,129,0.6)",
            "rgba(245,101,101,0.6)",
            "rgba(251,191,36,0.6)"
        ]

        const mkPts = () =>
            Array.from({ length: 25 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                r: Math.random() * 4 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                o: Math.random() * 0.5 + 0.2,
                c: clr[Math.floor(Math.random() * clr.length)]
            }))

        const mkGms = () => {
            const types: Gm["t"][] = ["square", "circle", "triangle"]
            return Array.from({ length: 6 }, (_, i) => ({
                id: i,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                s: Math.random() * 60 + 20,
                rot: Math.random() * 360,
                rotS: (Math.random() - 0.5) * 2,
                t: types[Math.floor(Math.random() * types.length)],
                o: Math.random() * 0.1 + 0.05
            }))
        }

        ptsRef.current = mkPts()
        gmsRef.current = mkGms()

        const resize = () => {
            ptsRef.current = mkPts()
            gmsRef.current = mkGms()
        }

        window.addEventListener("resize", resize)
        return () => window.removeEventListener("resize", resize)
    }, [on])

    const [tick, setTick] = useState(0)

    useEffect(() => {
        if (!on) {
            cancelAnimationFrame(anim.current)
            return
        }

        const loop = () => {
            const pts = ptsRef.current.map(p => {
                let x = p.x + p.dx
                let y = p.y + p.dy
                x = x > window.innerWidth ? 0 : x < 0 ? window.innerWidth : x
                y = y > window.innerHeight ? 0 : y < 0 ? window.innerHeight : y
                return { ...p, x, y }
            })

            const gms = gmsRef.current.map(g => ({
                ...g,
                rot: g.rot + g.rotS
            }))

            ptsRef.current = pts
            gmsRef.current = gms

            setTick(t => (t + 1) % 1000000)
            anim.current = requestAnimationFrame(loop)
        }

        anim.current = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(anim.current)
    }, [on])

    useEffect(() => {
        const mv = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
        window.addEventListener("mousemove", mv)
        return () => window.removeEventListener("mousemove", mv)
    }, [])

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900" />

            {on && (
                <>
                    <svg ref={svgRef} className="absolute inset-0 w-full h-full">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {ptsRef.current.map(p => (
                            <circle key={p.id} cx={p.x} cy={p.y} r={p.r} fill={p.c} opacity={p.o} filter="url(#glow)" className="animate-pulse" />
                        ))}

                        {ptsRef.current.flatMap((a, i) =>
                            ptsRef.current.slice(i + 1).map((b, j) => {
                                const d = Math.hypot(a.x - b.x, a.y - b.y)
                                return d < 150 ? (
                                    <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(139,92,246,0.1)" strokeWidth="1" opacity={1 - d / 150} />
                                ) : null
                            })
                        )}
                    </svg>

                    <div className="absolute inset-0">
                        {gmsRef.current.map(g => (
                            <div
                                key={g.id}
                                className="absolute border-2 border-purple-500/20 dark:border-purple-400/20"
                                style={{
                                    left: g.x,
                                    top: g.y,
                                    width: g.s,
                                    height: g.s,
                                    transform: `rotate(${g.rot}deg)`,
                                    opacity: g.o,
                                    borderRadius: g.t === "circle" ? "50%" : g.t === "triangle" ? "0" : "8px",
                                    clipPath: g.t === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none"
                                }}
                            />
                        ))}
                    </div>

                    <div ref={trackerRef} className="absolute w-64 h-64 rounded-full pointer-events-none" style={{ transform: `translate3d(${pos.x - 128}px, ${pos.y - 128}px, 0)`, background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)", willChange: "transform" }}/>
                    <div className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 blur-xl animate-pulse" />
                    <div className="absolute top-3/4 right-1/4 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/5 to-teal-500/5 dark:from-blue-500/10 dark:to-teal-500/10 blur-xl animate-pulse delay-1000" />
                    <div className="absolute bottom-1/4 left-3/4 w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500/5 to-green-500/5 dark:from-emerald-500/10 dark:to-green-500/10 blur-xl animate-bounce-slow" />
                </>
            )}

            <div
                className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px"
                }}
            />

            {["top-0", "bottom-0"].map((posY, i) => {
                const viaColor = i % 2 === 0 ? "via-purple-500/20" : "via-blue-500/20"
                const animation = on ? `animate-pulse ${i ? "delay-500" : ""}` : "opacity-50"
                return (
                    <div
                        key={`h-${i}`}
                        className={`absolute ${posY} left-0 w-full h-px bg-gradient-to-r from-transparent ${viaColor} to-transparent ${animation}`}
                    />
                )
            })}

            {["left-0", "right-0"].map((posX, i) => {
                const viaColor = i % 2 === 0 ? "via-purple-500/20" : "via-blue-500/20"
                const animation = on ? `animate-pulse ${i ? "delay-1500" : "delay-1000"}` : "opacity-50"
                return (
                    <div
                        key={`v-${i}`}
                        className={`absolute top-0 ${posX} w-px h-full bg-gradient-to-b from-transparent ${viaColor} to-transparent ${animation}`}
                    />
                )
            })}
        </div>
    )
}