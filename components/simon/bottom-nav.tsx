"use client"

import { CreditCard, Gift, HandCoins, Settings } from "lucide-react"
import type { OnboardingType } from "./onboarding-flow"

/* Active home button asset from Figma */
const HOME_ACTIVE = "https://www.figma.com/api/mcp/asset/df3e37bf-ee57-426b-8b52-e99e731db5a8"

/*
 * Figma nav specs (node 1:1051):
 *   Bar:  w=321px  h=56px  rounded-[12px]  positioned 28px from screen bottom
 *   Side margins: 27px each side on a 375px screen  →  calc(100% - 54px) proportional
 *   Home button (HomeButtom / Active):
 *     wrapper  pt-[6px]  pb-[14px]  h=70px inside a 56px bar (items-end)
 *     icon     size=50px
 *     → icon bottom is 14px from bar bottom
 *     → icon top  is 14+50 - 56 = 8px ABOVE the bar top  (visible via overflow-visible)
 */

const navBg: React.CSSProperties = {
  background: "radial-gradient(ellipse at 88% 4%, #ededed 0%, #fefefe 93%)",
  boxShadow:
    "6.08px 6.08px 14.6px rgba(0,0,0,0.1), " +
    "inset 0px -2.4px 2.4px rgba(112,111,111,0.25), " +
    "inset 0px 2.4px 2.4px white",
}

const labelStyle: React.CSSProperties = {
  fontWeight: 700,
}

interface BottomNavProps {
  onNavAction?: (type: OnboardingType) => void
}

export function BottomNav({ onNavAction }: BottomNavProps) {
  return (
    /*
     * Outer anchor: absolutely positioned, spans full width.
     * pointer-events-none so transparent gap above the bar never blocks taps.
     */
    <div
      className="absolute left-0 right-0 flex justify-center pointer-events-none"
      style={{ bottom: "max(clamp(12px, 3.5vh, 28px), calc(clamp(12px, 3.5vh, 28px) + env(safe-area-inset-bottom)))" }}
    >
      {/*
       * Nav bar:
       *   Width  = calc(100vw - 54px) proportional to screen, capped at 321px.
       *   Height = 56px (h-14), never shrinks.
       *   overflow-visible so the home button can float above the bar.
       *   Default flex (row, items-stretch) so every button fills the 56px height.
       */}
      <div
        className="pointer-events-auto h-14 rounded-[12px] flex overflow-visible"
        style={{
          width: "calc(100% - 48px)",
          ...navBg,
        }}
      >
        {/* ── T crédito ──────────────────────────────── */}
        <button
          aria-label="Tarjeta de crédito"
          onClick={() => onNavAction?.("tarjeta-credito")}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0 rounded-[10px] transition-all duration-150 active:scale-90 active:bg-black/[0.06]"
        >
          <CreditCard className="w-5 h-5 text-[#4f4f4f] shrink-0 transition-colors duration-150 group-active:text-[#00be9c]" strokeWidth={1.5} />
          <abbr
            title="Tarjeta de crédito"
            className="text-[11px] text-[#4f4f4f] leading-none truncate w-full text-center no-underline"
            style={labelStyle}
          >
            T. crédito
          </abbr>
        </button>

        {/* ── Beneficios ─────────────────────────────── */}
        <button className="flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0">
          <Gift className="w-5 h-5 text-[#4f4f4f] shrink-0" strokeWidth={1.5} />
          <span
            className="text-[11px] text-[#4f4f4f] leading-none truncate w-full text-center"
            style={labelStyle}
          >
            Beneficios
          </span>
        </button>

        {/* ── Home (active) ──────────────────────────── */}
        {/*
         * The button itself fills the full 56px bar height (items-stretch default).
         * The 50px icon is positioned bottom-[14px] → its top sits 8px above the bar.
         * That overflow is intentional and visible thanks to overflow-visible on the bar.
         */}
        <button className="flex-1 relative">
          {/*
           * Figma: the 50px icon box has inset[-16.05% -38.97% -38.97% -16.05%]
           * so the image (circle + shadow/glow) extends beyond the reference box.
           * Using object-contain would scale the WHOLE image (incl. shadow) to 50px
           * making the visible circle tiny. Instead we replicate the Figma inset so
           * the circle itself renders at ~50px and the shadows overflow naturally.
           */}
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
          <HandCoins className="w-5 h-5 text-[#4f4f4f] shrink-0" strokeWidth={1.5} />
          <span
            className="text-[11px] text-[#4f4f4f] leading-none truncate w-full text-center"
            style={labelStyle}
          >
            Mis créditos
          </span>
        </button>

        {/* ── Opciones ───────────────────────────────── */}
        <button className="flex-1 flex flex-col items-center justify-center gap-0.5 min-w-0">
          <Settings className="w-5 h-5 text-[#4f4f4f] shrink-0" strokeWidth={1.5} />
          <span
            className="text-[11px] text-[#4f4f4f] leading-none truncate w-full text-center"
            style={labelStyle}
          >
            Opciones
          </span>
        </button>
      </div>
    </div>
  )
}
