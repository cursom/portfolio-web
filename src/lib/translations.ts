export const trn = {
    "en":{
        "hey":"Hey, I'm",
        "developer":"year-old Developer",
        "description":"I'm from Hungary, and I design UIs and build backends. I mostly work on web apps clean design, smooth experience, solid code. That's what I'm into.",
        "connectWith":"Contact",
        "scrollToSkills":"Skills",
        "skillsTitle":"Skills & Experience",
        "skillsDescription":"Technologies I work with and my experience level",
        "primaryStack":"Primary Stack",
        "primaryStackDesc":"Technologies I use regularly",
        "additionalExperience":"Additional Experience",
        "additionalExperienceDesc":"Technologies I have worked with",
        "experience":"Experience",
        "skillDescriptions":{
            "TypeScript":"Building robust, type-safe applications",
            "Nextjs":"Full-stack React framework expertise",
            "MongoDB":"NoSQL database design & optimization",
            "Expressjs":"Node.js web application framework",
            "Tailwind CSS":"Utility-first CSS framework mastery",
            "NGINX":"Web server configuration & reverse proxy",
            "Python":"Automation, scripting & data analysis",
            "Java":"Object-oriented programming & Spring"
        },
        "years": "years"
    },
    "de":{
        "hey":"Hey, ich bin",
        "developer":"Jahre alter Entwickler",
        "description": "Ich komme aus Ungarn und arbeite an UI/UX und Backend-Entwicklung. Am liebsten baue ich Web-Apps mit klarem Design, guter UX und stabilem Code.",
        "connectWith":"Verfügbarkeit",
        "scrollToSkills":"Fähigkeiten",
        "skillsTitle":"Fähigkeiten & Erfahrung",
        "skillsDescription":"Technologien, mit denen ich arbeite und mein Erfahrungslevel",
        "primaryStack":"Haupt-Stack",
        "primaryStackDesc":"Technologien, die ich regelmäßig verwende",
        "additionalExperience":"Zusätzliche Erfahrung",
        "additionalExperienceDesc":"Technologien, mit denen ich gearbeitet habe",
        "experience":"Erfahrung",
        "skillDescriptions":{
            "TypeScript":"Erstellung robuster, typensicherer Anwendungen",
            "Nextjs":"Full-stack React Framework Expertise",
            "MongoDB":"NoSQL-Datenbankdesign & Optimierung",
            "Expressjs":"Node.js Webanwendungs-Framework",
            "Tailwind CSS":"Beherrschung des Utility-First CSS Frameworks",
            "NGINX":"Webserver-Konfiguration & Reverse Proxy",
            "Python":"Automatisierung, Skripting & Datenanalyse",
            "Java":"Objektorientierte Programmierung & Spring"
        },
        "years": "jahre"
    },
    "hu":{
        "hey":"Szia, a nevem",
        "developer":"éves Fejlesztő",
        "description":"Magyarországon élek, és UI/UX dizájnnal, valamint backend fejlesztéssel foglalkozom. Leginkább webes alkalmazásokat építek – letisztult felületekkel, jó élménnyel és stabil működéssel.",
        "connectWith":"Elérhetőségek",
        "scrollToSkills":"Készségek",
        "skillsTitle":"Készségek és Tapasztalatok",
        "skillsDescription":"Technológiák, amelyekkel dolgozom és tapasztalati szintem",
        "primaryStack":"Elsődleges Stack",
        "primaryStackDesc":"Technológiák, amelyeket rendszeresen használok",
        "additionalExperience":"További Tapasztalat",
        "additionalExperienceDesc":"Technológiák, amelyekkel dolgoztam",
        "experience":"Tapasztalat",
        "skillDescriptions":{
            "TypeScript":"Típusbiztos alkalmazások építése",
            "Nextjs":"Full-stack React keretrendszer szakértelem",
            "MongoDB":"NoSQL adatbázis tervezés és optimalizálás",
            "Expressjs":"Node.js webalkalmazás keretrendszer",
            "Tailwind CSS":"Utility-first CSS keretrendszer elsajátítása",
            "NGINX":"Webszerver konfiguráció és fordított proxy",
            "Python":"Automatizálás, szkriptelés és adatelemzés",
            "Java":"Objektumorientált programozás & Spring"
        },
        "years": "év"
    }
}

export type Lang = keyof typeof trn
export type TxtKey = keyof typeof trn.en

export const deepTxt = (trn: any, path: string): string => {
    const segs = path.split(".")
    let cur = trn

    for (const part of segs) {
        cur = cur?.[part]
        if (cur === undefined) return path
    }

    return cur || path
}