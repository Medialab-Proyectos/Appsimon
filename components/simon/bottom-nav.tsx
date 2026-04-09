"use client"

import { CreditCard, Gift, HandCoins, Settings } from "lucide-react"
import type { OnboardingType } from "./onboarding-flow"

/* Active home button asset from Figma */
const HOME_ACTIVE = "https://www.figma.com/api/mcp/asset/df3e37bf-ee57-426b-8b52-e99e731db5a8"

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
  color: "var(--simon-text)",
}

interface BottomNavProps {
  onNavAction?: (type: OnboardingType) => void
}

export function BottomNav({ onNavAction }: BottomNavProps) {
  return (
    <div
      className="absolute left-0 right-0 flex justify-center pointer-events-none"
      style={{ bottom: "max(clamp(12px, 3.5vh, 28px), calc(clamp(12px, 3.5vh, 28px) + env(safe-area-inset-bottom)))" }}
    >
      <div
        className="pointer-events-auto h-14 rounded-[12px] flex overflow-visible"
        style={{
          width: "calc(100% - 48px)",
          background: "var(--neo-bg)",
          boxShadow: "var(--neo-shadow)",
        }}
      >
        {/* ── T crédito ──────────────────────────────── */}
        <button
          aria-label="Tarjeta de crédito"
          onClick={() => onNavAction?.("tarjeta-credito")}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 rounded-[10px] transition-all duration-150 active:scale-90 active:bg-black/[0.06]"
        >
          <CreditCard className="w-5 h-5 shrink-0" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
          <abbr
            title="Tarjeta de crédito"
            className="text-[11px] leading-none truncate w-full text-center no-underline"
            style={labelStyle}
          >
            T. crédito
          </abbr>
        </button>

        {/* ── Beneficios ─────────────────────────────── */}
        <button className="flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0">
          <Gift className="w-5 h-5 shrink-0" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
          <span
            className="text-[11px] leading-none truncate w-full text-center"
            style={labelStyle}
          >
            Beneficios
          </span>
        </button>

        {/* ── Home (active) ──────────────────────────── */}
        <button className="flex-1 relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[50px] h-[50px]"
            style={{ bottom: "14px" }}
          >
            <div
              className="absolute"
              style={{ inset: "-16.05% -38.97% -38.97% -16.05%" }}
            >
              <img
                src={HOME_ACTIVE}
                alt="Inicio"
                className="block max-w-none w-full h-full"
                draggable={false}
              />
            </div>
          </div>
        </button>

        {/* ── Mis créditos ───────────────────────────── */}
        <button onClick={() => onNavAction?.("mis-creditos")} className="flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0">
          <HandCoins className="w-5 h-5 shrink-0" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
          <span
            className="text-[11px] leading-none truncate w-full text-center"
            style={labelStyle}
          >
            Mis créditos
          </span>
        </button>

        {/* ── Opciones ───────────────────────────────── */}
        <button className="flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0">
          <Settings className="w-5 h-5 shrink-0" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
          <span
            className="text-[11px] leading-none truncate w-full text-center"
            style={labelStyle}
          >
            Opciones
          </span>
        </button>
      </div>
    </div>
  )
}
