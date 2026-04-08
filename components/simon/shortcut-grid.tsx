"use client"

import {
  MapPin,
  CircleDollarSign,
  ShieldCheck,
  FolderOpen,
  Handshake,
  Wrench,
} from "lucide-react"
import { ReactNode } from "react"

interface ShortcutItem {
  icon: ReactNode
  label: string
}

const shortcuts: ShortcutItem[] = [
  {
    icon: <MapPin className="w-6 h-6 text-[#00be9c]" strokeWidth={1.5} />,
    label: "Localización",
  },
  {
    icon: <CircleDollarSign className="w-6 h-6 text-[#00be9c]" strokeWidth={1.5} />,
    label: "Simon Pay",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#00be9c]" strokeWidth={1.5} />,
    label: "Seguros",
  },
  {
    icon: <FolderOpen className="w-6 h-6 text-[#00be9c]" strokeWidth={1.5} />,
    label: "Guantera",
  },
  {
    icon: <Handshake className="w-6 h-6 text-[#00be9c]" strokeWidth={1.5} />,
    label: "Convenios",
  },
  {
    icon: <Wrench className="w-6 h-6 text-[#00be9c]" strokeWidth={1.5} />,
    label: "Asistencias",
  },
]

const btnStyle: React.CSSProperties = {
  background: "radial-gradient(ellipse at 85% 4%, #ededed 0%, #fefefe 93%)",
  boxShadow:
    "6.08px 6.08px 14.6px rgba(0,0,0,0.1), inset 0px -2.4px 2.4px rgba(112,111,111,0.25), inset 0px 2.4px 2.4px white",
}

export function ShortcutGrid() {
  return (
    <div
      className="shrink-0 px-6"
      style={{
        paddingTop: "clamp(6px, 1.2vh, 12px)",
        paddingBottom: "clamp(4px, 0.8vh, 8px)",
      }}
    >
      <div
        className="grid grid-cols-3"
        style={{ gap: "clamp(8px, 1.4vh, 12px)" }}
      >
        {shortcuts.map((shortcut, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center rounded-[12px] active:opacity-80 transition-opacity"
            style={{
              ...btnStyle,
              height: "clamp(58px, 10vh, 88px)",
              gap: "clamp(2px, 0.6vh, 8px)",
              padding: "clamp(4px, 0.8vh, 8px)",
            }}
          >
            <span className="shrink-0" style={{ transform: "scale(clamp(0.8, 1, 1))" }}>
              {shortcut.icon}
            </span>
            <span
              className="text-[#4f4f4f] font-medium text-center leading-tight"
              style={{ fontSize: "clamp(10px, 1.5vh, 12px)" }}
            >
              {shortcut.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
