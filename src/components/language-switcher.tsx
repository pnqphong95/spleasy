"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Locale } from "@/i18n-config"

export function LanguageSwitcher() {
    const pathname = usePathname()
    const router = useRouter()

    const currentLocale = pathname.split("/")[1] as Locale
    const nextLocale = currentLocale === "en" ? "vi" : "en"

    const toggleLanguage = () => {
        if (!pathname) return
        const segments = pathname.split("/")
        segments[1] = nextLocale
        const newPath = segments.join("/")
        router.push(newPath)
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="rounded-full w-9 h-9 border border-border bg-background hover:bg-accent hover:text-accent-foreground"
            aria-label={`Switch to ${nextLocale === "en" ? "English" : "Vietnamese"}`}
        >
            <span className="text-xs font-bold transition-all">
                {currentLocale === "en" ? "EN" : "VI"}
            </span>
        </Button>
    )
}
