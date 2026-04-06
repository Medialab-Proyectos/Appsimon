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
    icon: <MapPin className="w-6 h-6 text-[#0f6b58]" strokeWidth={1.5} />,
    label: "Localización",
  },
  {
    icon: <CircleDollarSign className="w-6 h-6 text-[#0f6b58]" strokeWidth={1.5} />,
    label: "Simon Pay",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#0f6b58]" strokeWidth={1.5} />,
    label: "Seguros",
  },
  {
    icon: <FolderOpen className="w-6 h-6 text-[#0f6b58]" strokeWidth={1.5} />,
    label: "Guantera",
  },
  {
    icon: <Handshake className="w-6 h-6 text-[#0f6b58]" strokeWidth={1.5} />,
    label: "Convenios",
  },
  {
    icon: <Wrench className="w-6 h-6 text-[#0f6b58]" strokeWidth={1.5} />,
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
    <div className="shrink-0 px-6 pt-3 pb-2">
      <div className="grid grid-cols-3 gap-3">
        {shortcuts.map((shortcut, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center h-[88px] rounded-[12px] gap-2 p-2 active:opacity-80 transition-opacity"
            style={btnStyle}
          >
            {shortcut.icon}
            <span
              className="text-[12px] text-[#4f4f4f] font-medium leading-4 text-center"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              {shortcut.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
