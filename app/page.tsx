"use client"

import { useState } from "react"
import { BottomNav } from "@/components/simon/bottom-nav"
import { CreditCardOnboarding } from "@/components/simon/credit-card-onboarding"
import { OnboardingFlow, type OnboardingType } from "@/components/simon/onboarding-flow"
import { ShortcutGrid } from "@/components/simon/shortcut-grid"
import { TopHeader } from "@/components/simon/top-header"
import { VehicleCarousel } from "@/components/simon/vehicle-carousel"
import { InsuranceMarketplace } from "@/components/simon/insurance"

type Screen = "home" | "credit-card" | "insurance"

export default function SimonApp() {
  const [screen, setScreen] = useState<Screen>("home")
  const [onboarding, setOnboarding] = useState<OnboardingType | null>(null)

  const handleNavAction = (type: OnboardingType) => {
    if (type === "tarjeta-credito") {
      setScreen("credit-card")
    } else {
      setOnboarding(type)
    }
  }

  /* ── Credit card: full-screen replacement ── */
  if (screen === "credit-card") {
    return <CreditCardOnboarding onClose={() => setScreen("home")} />
  }

  /* ── Insurance marketplace: full-screen overlay ── */
  if (screen === "insurance") {
    return <InsuranceMarketplace onClose={() => setScreen("home")} />
  }

  /* ── Home screen ── */
  return (
    <div className="relative overflow-hidden" style={{ height: "100dvh", background: "var(--simon-bg)" }}>
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          paddingBottom:
            "calc(56px + 16px + max(clamp(12px, 3.5vh, 28px), calc(clamp(12px, 3.5vh, 28px) + env(safe-area-inset-bottom))))",
        }}
      >
        <TopHeader />
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col" style={{ minHeight: "clamp(240px, 46vh, 360px)" }}>
            <VehicleCarousel />
          </div>
          <ShortcutGrid onInsuranceTap={() => setScreen("insurance")} />
        </div>
      </div>

      <BottomNav onNavAction={handleNavAction} />

      {onboarding && (
        <OnboardingFlow type={onboarding} onClose={() => setOnboarding(null)} />
      )}
    </div>
  )
}
