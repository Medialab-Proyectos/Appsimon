"use client"

import {
  CircleDollarSign,
  FolderOpen,
  Handshake,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react"
import { ReactNode } from "react"

interface ShortcutItem {
  icon: ReactNode
  label: string
}

const shortcuts: ShortcutItem[] = [
  {
    icon: <MapPin className="w-6 h-6" strokeWidth={1.5} style={{ color: "var(--simon-accent)" }} />,
    label: "Localizacion",
  },
  {
    icon: <CircleDollarSign className="w-6 h-6" strokeWidth={1.5} style={{ color: "var(--simon-accent)" }} />,
    label: "Simon Pay",
  },
  {
    icon: <FolderOpen className="w-6 h-6" strokeWidth={1.5} style={{ color: "var(--simon-accent)" }} />,
    label: "Guantera",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" strokeWidth={1.5} style={{ color: "var(--simon-accent)" }} />,
    label: "Seguros",
  },
  {
    icon: <Handshake className="w-6 h-6" strokeWidth={1.5} style={{ color: "var(--simon-accent)" }} />,
    label: "Convenios",
  },
  {
    icon: <Wrench className="w-6 h-6" strokeWidth={1.5} style={{ color: "var(--simon-accent)" }} />,
    label: "Asistencias",
  },
]

export function ShortcutGrid() {
  return (
    <div
      className="shrink-0 px-6"
      style={{
        paddingTop: "clamp(4px, 1vh, 12px)",
        paddingBottom: "clamp(2px, 0.6vh, 8px)",
      }}
    >
      <div className="grid grid-cols-3" style={{ gap: "clamp(6px, 1.2vh, 12px)" }}>
        {shortcuts.map((shortcut, index) => (
          <button
            key={index}
            type="button"
            className="flex flex-col items-center justify-center rounded-[12px] transition-opacity active:opacity-80"
            style={{
              background: "var(--neo-bg)",
              boxShadow: "var(--neo-shadow)",
              height: "clamp(50px, 8.5vh, 88px)",
              gap: "clamp(2px, 0.5vh, 8px)",
              padding: "clamp(4px, 0.6vh, 8px)",
            }}
          >
            <span className="shrink-0" style={{ transform: "scale(clamp(0.8, 1, 1))" }}>
              {shortcut.icon}
            </span>
            <span
              className="text-center font-medium leading-tight"
              style={{ fontSize: "clamp(10px, 1.5vh, 12px)", color: "var(--simon-text)" }}
            >
              {shortcut.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
