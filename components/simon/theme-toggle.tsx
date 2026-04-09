"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-full" aria-hidden />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200 active:scale-90"
    >
      {isDark ? (
        <Sun className="w-[20px] h-[20px]" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
      ) : (
        <Moon className="w-[20px] h-[20px]" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
      )}
    </button>
  )
}
