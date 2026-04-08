"use client"

import { TopHeader } from "@/components/simon/top-header"
import { VehicleCarousel } from "@/components/simon/vehicle-carousel"
import { ShortcutGrid } from "@/components/simon/shortcut-grid"
import { BottomNav } from "@/components/simon/bottom-nav"

export default function SimonApp() {
  /*
   * Layout strategy:
   *  - Container fills the dynamic viewport height (dvh), falls back to 100vh.
   *  - Content column is padded at the bottom to clear the floating nav bar:
   *      56px (nav height) + max(28px, safe-area) + 16px visual gap = ~100px min.
   *  - BottomNav is absolute-positioned so it truly floats and never shifts content.
   *  - VehicleCarousel is flex-1 and scales its card via ResizeObserver.
   *  - ShortcutGrid is shrink-0 (fixed height).
   */
  return (
    <div className="bg-[#fafafa] relative overflow-hidden" style={{ height: "100dvh" }}>
      {/* Scrollable content — bottom padding reserves room for the floating nav */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          paddingBottom:
            "calc(56px + 16px + max(28px, calc(28px + env(safe-area-inset-bottom))))",
        }}
      >
        <TopHeader />
        <div className="flex-1 flex flex-col min-h-0">
          {/* Carousel gets priority: min-height ensures the card renders at natural size when possible */}
          <div className="flex-1 min-h-[360px] flex flex-col">
            <VehicleCarousel />
          </div>
          <ShortcutGrid />
        </div>
      </div>

      {/* Floating nav — overlays the content */}
      <BottomNav />
    </div>
  )
}
