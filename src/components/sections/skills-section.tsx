"use client"

import { useState, useEffect, useRef } from "react"
import { useLang } from "@/contexts/language-context"

const stacks = [
    {
        title: "primaryStack",
        description: "primaryStackDesc",
        skills: [
            { name: "TypeScript", level: "Advanced", experience: "4+", descriptionKey: "TypeScript", color: "from-blue-500 to-blue-600" },
            { name: "Next.js", level: "Advanced", experience: "2+", descriptionKey: "Nextjs", color: "from-gray-700 to-gray-800" },
            { name: "MongoDB", level: "Advanced", experience: "2+", descriptionKey: "MongoDB", color: "from-green-500 to-green-600" },
            { name: "Express.js", level: "Advanced", experience: "3+", descriptionKey: "Expressjs", color: "from-yellow-600 to-orange-500" },
            { name: "Tailwind CSS", level: "Advanced", experience: "2+", descriptionKey: "Tailwind CSS", color: "from-cyan-500 to-cyan-600" },
            { name: "NGINX", level: "Intermediate", experience: "2+", descriptionKey: "NGINX", color: "from-green-600 to-green-700" },
            { name: "Python", level: "Intermediate", experience: "1+", descriptionKey: "Python", color: "from-yellow-500 to-yellow-600" },
            { name: "Java", level: "Intermediate", experience: "3+", descriptionKey: "Java", color: "from-orange-500 to-red-500" },
        ],
    },
    {
        title: "additionalExperience",
        description: "additionalExperienceDesc",
        skills: [
            { name: "Vue.js", color: "from-emerald-500 to-green-500" },
            { name: "Nuxt.js", color: "from-emerald-600 to-green-600" },
            { name: "MySQL", color: "from-blue-600 to-blue-700" },
            { name: "PHP", color: "from-purple-600 to-purple-700" },
            { name: "Linux", color: "from-gray-600 to-gray-700" },
            { name: "Docker", color: "from-blue-500 to-blue-700" },
            { name: "C++", color: "from-yellow-500 to-yellow-600" },
        ],
    },
]

export function Skills() {
    const [hover, setHover] = useState<string | null>(null)
    const [show, setShow] = useState(false)
    const sect = useRef<HTMLElement>(null)
    const { text } = useLang()

    useEffect(() => {
        const watch = new IntersectionObserver(
            ([node]) => node.isIntersecting && setShow(true),
            { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
        )
        sect.current && watch.observe(sect.current)
        return () => { sect.current && watch.unobserve(sect.current) }
    }, [])

    return (
        <section ref={sect} id="skills" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">{text("skillsTitle")}</h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
                    <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">{text("skillsDescription")}</p>
                </div>

                <div className="space-y-16">
                    {stacks.map((group, gpos) => (
                        <div key={group.title} className="space-y-8">
                            <div className={`text-center space-y-3 transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${gpos * 200 + 200}ms` }}>
                                <h4 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">{text(group.title)}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{text(group.description)}</p>
                                <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-700 mx-auto" />
                            </div>

                            <div className={`grid ${group.title === "additionalExperience" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}`}>
                                {group.skills.map((skill, spos) => (
                                    <div key={skill.name} className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:scale-105 cursor-pointer ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${gpos * 200 + 400 + spos * 100}ms` }} onMouseEnter={() => setHover(skill.name)} onMouseLeave={() => setHover(null)}>
                                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                        <div className="relative space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h5 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">{skill.name}</h5>
                                                {"level" in skill && (
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${skill.color} text-white`}>{skill.level}</span>
                                                )}
                                            </div>

                                            {"descriptionKey" in skill && (
                                                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">{text(`skillDescriptions.${skill.descriptionKey}`)}</p>
                                            )}
                                        </div>

                                        {"experience" in skill && (
                                            <div className="relative mt-4 text-xs text-gray-500 dark:text-gray-400">{text("experience")}: {skill.experience} {text("years")}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}