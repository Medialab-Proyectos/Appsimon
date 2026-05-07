"use client"

import { CircleUserRound, Headphones } from "lucide-react"
import { SimonTopBar } from "./library"
import { ThemeToggle } from "./theme-toggle"

const SIMON_LOGO_TOP = "https://www.figma.com/api/mcp/asset/006c3a59-a3eb-41e2-8c84-1de1dd747aa9"
const SIMON_LOGO_BOTTOM = "https://www.figma.com/api/mcp/asset/08256b12-670a-4fb6-bc57-45e58d261fb1"

export interface TopHeaderProps {
  userName?: string
  onAddVehicle?: () => void
  onHelp?: () => void
  onAccount?: () => void
}

export function TopHeader({
  userName = "Alejandra Díaz",
  onAddVehicle,
  onHelp,
  onAccount,
}: TopHeaderProps) {
  return (
    <SimonTopBar
      eyebrow="Bienvenido/a"
      title={userName}
      trailing={<ThemeToggle />}
      actions={[
        {
          label: "Soporte y ayuda",
          onClick: onHelp,
          icon: <Headphones className="h-[20px] w-[20px]" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />,
        },
        {
          label: "Mi cuenta",
          onClick: onAccount,
          icon: <CircleUserRound className="h-[20px] w-[20px]" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />,
        },
      ]}
      logo={[
        {
          src: SIMON_LOGO_TOP,
          alt: "Simon",
          className: "top-0 h-[70%]",
        },
        {
          src: SIMON_LOGO_BOTTOM,
          className: "bottom-0 h-[27%]",
        },
      ]}
      cta={{ label: "Agregar vehículo", onClick: onAddVehicle }}
    />
  )
}
