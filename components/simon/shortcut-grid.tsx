"use client"

import {
  CircleDollarSign,
  FolderOpen,
  Handshake,
  MapPin,
  ShieldCheck,
  Wrench,
} from "lucide-react"
import { SimonShortcutGrid, type SimonActionTileProps } from "./library"

export interface ShortcutItem {
  label: string
  icon: SimonActionTileProps["icon"]
  description?: string
  onClick?: () => void
}

export interface ShortcutGridProps {
  items?: ShortcutItem[]
  columns?: 2 | 3 | 4
  onInsuranceTap?: () => void
}

const iconStyle = { color: "var(--simon-accent)" }

export function ShortcutGrid({ items, columns = 3, onInsuranceTap }: ShortcutGridProps) {
  const defaultShortcuts: ShortcutItem[] = [
    {
      icon: <MapPin className="h-6 w-6" strokeWidth={1.5} style={iconStyle} />,
      label: "Localización",
    },
    {
      icon: <CircleDollarSign className="h-6 w-6" strokeWidth={1.5} style={iconStyle} />,
      label: "Simon Pay",
    },
    {
      icon: <FolderOpen className="h-6 w-6" strokeWidth={1.5} style={iconStyle} />,
      label: "Guantera",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.5} style={iconStyle} />,
      label: "Seguros",
      onClick: onInsuranceTap,
    },
    {
      icon: <Handshake className="h-6 w-6" strokeWidth={1.5} style={iconStyle} />,
      label: "Convenios",
    },
    {
      icon: <Wrench className="h-6 w-6" strokeWidth={1.5} style={iconStyle} />,
      label: "Asistencias",
    },
  ]

  return <SimonShortcutGrid columns={columns} items={items ?? defaultShortcuts} />
}

