"use client"

import { TopHeader } from "@/components/simon/top-header"
import { VehicleCarousel } from "@/components/simon/vehicle-carousel"
import { ShortcutGrid } from "@/components/simon/shortcut-grid"
import { BottomNav } from "@/components/simon/bottom-nav"

export default function SimonApp() {
  return (
    <div className="h-dvh bg-gray-50 flex flex-col overflow-hidden">
      {/* Top Header */}
      <TopHeader />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Vehicle Card Carousel */}
        <VehicleCarousel />
        
        {/* Shortcut Grid */}
        <ShortcutGrid />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
