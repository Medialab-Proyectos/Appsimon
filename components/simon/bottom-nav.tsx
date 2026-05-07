"use client"

import { CreditCard, Gift, HandCoins, Settings } from "lucide-react"
import { SimonBottomNavigation, type SimonBottomNavItem } from "./library"
import type { OnboardingType } from "./onboarding-flow"

const HOME_ACTIVE = "https://www.figma.com/api/mcp/asset/df3e37bf-ee57-426b-8b52-e99e731db5a8"

interface BottomNavProps {
  items?: SimonBottomNavItem[]
  onNavAction?: (type: OnboardingType) => void
}

const iconStyle = { color: "var(--simon-text)" }

export function BottomNav({ items, onNavAction }: BottomNavProps) {
  const defaultItems: SimonBottomNavItem[] = [
    {
      id: "credit-card",
      label: "T. crédito",
      title: "Tarjeta de crédito",
      icon: <CreditCard className="h-5 w-5" strokeWidth={1.5} style={iconStyle} />,
      onClick: () => onNavAction?.("tarjeta-credito"),
    },
    {
      id: "benefits",
      label: "Beneficios",
      icon: <Gift className="h-5 w-5" strokeWidth={1.5} style={iconStyle} />,
    },
    {
      id: "home",
      label: "Inicio",
      active: true,
      activeAsset: HOME_ACTIVE,
    },
    {
      id: "credits",
      label: "Mis créditos",
      title: "Mis créditos",
      icon: <HandCoins className="h-5 w-5" strokeWidth={1.5} style={iconStyle} />,
      onClick: () => onNavAction?.("mis-creditos"),
    },
    {
      id: "options",
      label: "Opciones",
      icon: <Settings className="h-5 w-5" strokeWidth={1.5} style={iconStyle} />,
    },
  ]

  return <SimonBottomNavigation items={items ?? defaultItems} />
}
