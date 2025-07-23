import * as React from "react"

const BP_MOB = 768

export function useMob() {
    const [mob, setMob] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const qry = window.matchMedia(`(max-width: ${BP_MOB - 1}px)`)

        const sync = () => {
            setMob(window.innerWidth < BP_MOB)
        }

        qry.addEventListener("change", sync)
        sync()

        return () => qry.removeEventListener("change", sync)
    }, [])

    return !!mob
}