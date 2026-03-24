"use client"

import { MapPin, DollarSign, Shield, Folder, Handshake, HeartPulse } from "lucide-react"
import { ReactNode } from "react"

interface ShortcutItem {
  icon: ReactNode
  label: string
}

const shortcuts: ShortcutItem[] = [
  { icon: <MapPin className="w-5 h-5" />, label: "Localizacion" },
  { icon: <DollarSign className="w-5 h-5" />, label: "Simon Pay" },
  { icon: <Shield className="w-5 h-5" />, label: "Seguros" },
  { icon: <Folder className="w-5 h-5" />, label: "Guantera" },
  { icon: <Handshake className="w-5 h-5" />, label: "Convenios" },
  { icon: <HeartPulse className="w-5 h-5" />, label: "Asistencias" },
]

export function ShortcutGrid() {
  return (
    <div className="shrink-0 px-4 py-2">
      <div className="grid grid-cols-3 gap-2.5">
        {shortcuts.map((shortcut, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center py-3.5 px-1 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-all"
            style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="text-gray-500 mb-1.5">{shortcut.icon}</div>
            <span className="text-[11px] text-gray-700 font-medium">{shortcut.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
