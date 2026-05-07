"use client"

import { useState, useCallback } from "react"
import {
  ArrowLeft, Bell, ChevronRight, BadgeCheck, Clock, Shield
} from "lucide-react"
import {
  CATEGORIES, MOCK_VEHICLES, MOCK_POLICIES, MOCK_NOTIFICATIONS,
  ALL_PRODUCTS, PROMOTEC, IMAGES,
  formatCOP, getDaysUntil, statusColor, statusLabel,
  type InsuranceCategory, type InsuredVehicle, type InsuranceProduct
} from "@/lib/insurance-data"
import { InsuranceDetail } from "./insurance-detail"
import { InsuranceCheckout } from "./insurance-checkout"
import { InsuranceSuccess } from "./insurance-success"
import { InsurancePolicyWallet } from "./insurance-policy-wallet"
import { InsuranceNotifications } from "./insurance-notifications"

type Screen = "home" | "detail" | "checkout" | "success" | "wallet" | "notifications"

interface Props { onClose: () => void }

export function InsuranceMarketplace({ onClose }: Props) {
  const [screen, setScreen] = useState<Screen>("home")
  const [selectedCat, setSelectedCat] = useState<InsuranceCategory | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null)
  const vehicle = MOCK_VEHICLES[0]
  const unread = MOCK_NOTIFICATIONS.filter(n => !n.read).length
  const activePolicies = MOCK_POLICIES.filter(p => p.status === "active" || p.status === "expiring")
  const daysUntilSoat = getDaysUntil(vehicle.soatExpiry)

  const openCategory = useCallback((cat: InsuranceCategory) => {
    setSelectedCat(cat)
    const products = ALL_PRODUCTS[cat.id]
    setSelectedProduct(products?.find(p => p.highlighted) ?? products?.[0] ?? null)
    setScreen("detail")
  }, [])

  // Sub-screens
  if (screen === "detail" && selectedCat) {
    return <InsuranceDetail category={selectedCat} products={ALL_PRODUCTS[selectedCat.id] ?? []} vehicle={vehicle} onBack={() => setScreen("home")} onBuy={(p) => { setSelectedProduct(p); setScreen("checkout") }} />
  }
  if (screen === "checkout" && selectedProduct) {
    return <InsuranceCheckout product={selectedProduct} vehicle={vehicle} onBack={() => setScreen("detail")} onSuccess={() => setScreen("success")} />
  }
  if (screen === "success" && selectedProduct) {
    return <InsuranceSuccess product={selectedProduct} vehicle={vehicle} onViewPolicy={() => setScreen("wallet")} onGoHome={onClose} />
  }
  if (screen === "wallet") {
    return <InsurancePolicyWallet policies={MOCK_POLICIES} onBack={() => setScreen("home")} />
  }
  if (screen === "notifications") {
    return <InsuranceNotifications notifications={MOCK_NOTIFICATIONS} onBack={() => setScreen("home")} onAction={(t) => { const c = CATEGORIES.find(x => x.id === t); if (c) openCategory(c) }} />
  }

  return (
    <div className="absolute inset-0 z-20 flex flex-col" style={{ background: "var(--simon-bg)" }}>
      {/* ── Header ── */}
      <header className="shrink-0 flex items-center justify-between px-5 pb-2" style={{ paddingTop: "calc(env(safe-area-inset-top, 12px) + 12px)" }}>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full active:scale-90 transition-all" style={{ background: "var(--simon-divider)" }} aria-label="Volver">
            <ArrowLeft className="h-5 w-5" style={{ color: "var(--simon-text-strong)" }} />
          </button>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: "var(--simon-accent)" }}>Simon Seguros</p>
            <h1 className="text-[20px] font-black leading-tight tracking-tight" style={{ color: "var(--simon-text-strong)" }}>Protección</h1>
          </div>
        </div>
        <button type="button" onClick={() => setScreen("notifications")} className="relative flex h-10 w-10 items-center justify-center rounded-full active:scale-90 transition-all" aria-label="Notificaciones">
          <Bell className="h-5 w-5" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
          {unread > 0 && <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d62d30] text-[9px] font-bold text-white">{unread}</span>}
        </button>
      </header>

      {/* ── Scrollable ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>

        {/* ── Hero Banner with Image ── */}
        <div className="px-5 pt-2 pb-5">
          <button
            type="button"
            onClick={() => openCategory(CATEGORIES[0])}
            className="relative w-full overflow-hidden rounded-3xl text-left active:scale-[0.98] transition-transform"
            style={{ height: "180px" }}
          >
            <img src={IMAGES.soatShield} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)" }} />
            <div className="relative z-10 flex h-full flex-col justify-between p-5">
              <div>
                <span className="inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(255,184,0,0.2)", color: "#FFB800" }}>
                  ⚠ Vence en {daysUntilSoat} días
                </span>
              </div>
              <div>
                <p className="text-[22px] font-black text-white leading-tight">Tu SOAT necesita renovación</p>
                <p className="mt-1 text-[13px] text-white/60">{vehicle.plate} · {vehicle.model}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[16px] font-black text-[#00f1c7]">{formatCOP(999000)}</span>
                  <span className="text-[11px] text-white/40">· Solo {formatCOP(2738)}/día</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* ── Active policies strip ── */}
        {activePolicies.length > 0 && (
          <div className="pb-5">
            <div className="flex items-center justify-between px-5 mb-3">
              <h2 className="text-[16px] font-black tracking-tight" style={{ color: "var(--simon-text-strong)" }}>Mis pólizas</h2>
              <button type="button" onClick={() => setScreen("wallet")} className="flex items-center gap-0.5 text-[12px] font-bold active:opacity-60" style={{ color: "var(--simon-accent)" }}>
                Ver todas <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto px-5 pb-1" style={{ scrollSnapType: "x mandatory" }}>
              {activePolicies.map(p => (
                <button key={p.id} type="button" onClick={() => setScreen("wallet")}
                  className="flex-shrink-0 rounded-2xl p-4 text-left active:scale-[0.97] transition-all"
                  style={{ width: "230px", scrollSnapAlign: "start", background: "var(--neo-bg)", boxShadow: "var(--neo-shadow-card)" }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: statusColor(p.status) }} />
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: statusColor(p.status) }}>{statusLabel(p.status)}</span>
                  </div>
                  <p className="text-[15px] font-black" style={{ color: "var(--simon-text-strong)" }}>{p.productName}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: "var(--simon-text)" }}>{p.vehiclePlate} · {p.vehicleModel}</p>
                  <div className="flex items-center gap-1.5 mt-2.5">
                    <Clock className="h-3.5 w-3.5" style={{ color: statusColor(p.status) }} />
                    <span className="text-[11px] font-semibold" style={{ color: statusColor(p.status) }}>
                      {getDaysUntil(p.endDate) > 0 ? `${getDaysUntil(p.endDate)} días restantes` : "Vencido"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Category Cards with Images ── */}
        <div className="px-5 pb-5">
          <h2 className="text-[16px] font-black tracking-tight mb-3" style={{ color: "var(--simon-text-strong)" }}>
            Todos los seguros
          </h2>
          <div className="space-y-3">
            {CATEGORIES.map(cat => {
              const products = ALL_PRODUCTS[cat.id] ?? []
              const hasProducts = products.length > 0
              const cheapest = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => openCategory(cat)}
                  disabled={!hasProducts}
                  className="relative w-full overflow-hidden rounded-2xl text-left active:scale-[0.98] transition-all disabled:opacity-40"
                  style={{ height: "110px", background: "var(--neo-bg)", boxShadow: "var(--neo-shadow-card)" }}
                >
                  {/* Thumbnail image */}
                  <div className="absolute right-0 top-0 bottom-0 w-[40%] overflow-hidden">
                    <img src={cat.heroImage} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--simon-bg) 0%, transparent 50%)" }} />
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-center p-4 pr-[45%]">
                    <span className="text-[22px] mb-1">{cat.emoji}</span>
                    <p className="text-[15px] font-black leading-tight" style={{ color: "var(--simon-text-strong)" }}>
                      {cat.label}
                    </p>
                    <p className="text-[11px] mt-0.5 leading-snug" style={{ color: "var(--simon-text)" }}>
                      {cat.tagline}
                    </p>
                    {hasProducts && (
                      <p className="text-[12px] mt-1.5 font-bold" style={{ color: "var(--simon-accent)" }}>
                        Desde {formatCOP(cheapest)}/año →
                      </p>
                    )}
                    {!hasProducts && (
                      <p className="text-[11px] mt-1.5 font-medium italic" style={{ color: "var(--simon-text)" }}>Próximamente</p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Trust Footer ── */}
        <div className="px-5 pb-8">
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "rgba(0,241,199,0.04)", border: "1px solid rgba(0,241,199,0.12)" }}>
            <BadgeCheck className="h-8 w-8 shrink-0" style={{ color: "var(--simon-accent)" }} />
            <div>
              <p className="text-[13px] font-bold" style={{ color: "var(--simon-text-strong)" }}>Respaldado por {PROMOTEC.name}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--simon-text)" }}>{PROMOTEC.tagline} · {PROMOTEC.cert}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
