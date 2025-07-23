import { clsx, type ClassValue as Clsx } from "clsx"
import { twMerge as twm } from "tailwind-merge"

export const cn = (...styls: Clsx[]) => twm(clsx(styls))

export const calcAge = (bdate: string): number => {
    const bday = new Date(bdate)
    const nowd = new Date()

    let year = nowd.getFullYear() - bday.getFullYear()
    const mons = nowd.getMonth() - bday.getMonth()

    if (mons < 0 || (mons === 0 && nowd.getDate() < bday.getDate())) {
        year--
    }

    return year
}