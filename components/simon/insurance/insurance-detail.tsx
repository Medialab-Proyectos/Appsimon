"use client"

import { useState } from "react"
import {
  ArrowLeft, Check, X, ChevronDown, ChevronUp,
  BadgeCheck, Star, Sparkles
} from "lucide-react"
import {
  type InsuranceCategory, type InsuranceProduct, type InsuredVehicle,
  formatCOP, PROMOTEC
} from "@/lib/insurance-data"

interface Props {
  category: InsuranceCategory
  products: InsuranceProduct[]
  vehicle: InsuredVehicle
  onBack: () => void
  onBuy: (product: InsuranceProduct) => void
}

export function InsuranceDetail({ category, products, vehicle, onBack, onBuy }: Props) {
  const [selected, setSelected] = useState<InsuranceProduct>(
    products.find(p => p.highlighted) ?? products[0]
  )
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const hasMultipleTiers = products.length > 1

  if (!selected) return null

  return (
    <div className="absolute inset-0 z-20 flex flex-col" style={{ background: "var(--simon-bg)" }}>

      {/* ── Hero with image ── */}
      <div className="relative shrink-0 overflow-hidden" style={{ height: "220px" }}>
        <img src={category.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 100%)" }} />

        <div className="relative z-10 flex h-full flex-col justify-between p-5" style={{ paddingTop: "calc(env(safe-area-inset-top, 12px) + 12px)" }}>
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm active:scale-90 transition-all" aria-label="Volver">
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            {selected.tierTag && (
              <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: selected.highlighted ? "rgba(0,241,199,0.2)" : "rgba(255,255,255,0.1)", color: selected.highlighted ? "#00f1c7" : "white" }}>
                {selected.tierTag}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <p className="text-[13px] text-white/50">{vehicle.plate} · {vehicle.model}</p>
            <h1 className="text-[26px] font-black text-white leading-tight tracking-tight mt-1">
              {category.label}
            </h1>
            <p className="text-[14px] text-white/50 mt-1">{category.description}</p>
          </div>
        </div>
      </div>

      {/* ── Scrollable ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>

        {/* ── Tier selector (if multiple plans) ── */}
        {hasMultipleTiers && (
          <div className="px-5 pt-5 pb-2">
            <h2 className="text-[16px] font-black mb-3" style={{ color: "var(--simon-text-strong)" }}>
              Elige tu plan
            </h2>
            <div className="flex gap-2">
              {products.map(p => {
                const isActive = p.id === selected.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelected(p)}
                    className="flex-1 rounded-2xl p-3 text-center transition-all active:scale-[0.96]"
                    style={{
                      background: isActive ? "linear-gradient(135deg, #0a2e28, #0d3d33)" : "var(--neo-bg)",
                      boxShadow: isActive ? "0 4px 20px rgba(0,241,199,0.15)" : "var(--neo-shadow-card)",
                      border: isActive ? "1.5px solid rgba(0,241,199,0.4)" : "1.5px solid transparent",
                    }}
                  >
                    {p.highlighted && (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase mb-1.5" style={{ background: "rgba(0,241,199,0.15)", color: "#00f1c7" }}>
                        <Star className="h-2.5 w-2.5" /> Top
                      </span>
                    )}
                    <p className="text-[14px] font-black" style={{ color: isActive ? "white" : "var(--simon-text-strong)" }}>
                      {p.tierName}
                    </p>
                    <p className="text-[16px] font-black mt-1" style={{ color: isActive ? "#00f1c7" : "var(--simon-accent)" }}>
                      {p.priceMonthly ? `${formatCOP(p.priceMonthly)}` : `${formatCOP(p.price)}`}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: isActive ? "rgba(255,255,255,0.4)" : "var(--simon-text)" }}>
                      {p.priceMonthly ? "/mes" : "/año"}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Price card (single product or selected) ── */}
        <div className="px-5 pt-4 pb-2">
          <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #0a2e28, #0d3d33)", boxShadow: "0 8px 32px rgba(0,241,199,0.12)" }}>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">
                  {selected.tierName} · Precio anual
                </p>
                <p className="text-[32px] font-black text-white tracking-tight leading-none mt-1">
                  {formatCOP(selected.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-white/30">Equivale a</p>
                <p className="text-[18px] font-bold text-[#00f1c7]">{formatCOP(selected.dailyCost)}<span className="text-[12px] text-white/40">/día</span></p>
              </div>
            </div>
            {selected.priceMonthly && (
              <p className="mt-2 text-[12px] text-white/30">
                También puedes pagar <span className="font-bold text-white/60">{formatCOP(selected.priceMonthly)}/mes</span> sin intereses
              </p>
            )}
          </div>
        </div>

        {/* ── Coverage comparison ── */}
        <div className="px-5 pt-4 pb-2">
          <h2 className="text-[16px] font-black mb-3" style={{ color: "var(--simon-text-strong)" }}>
            ¿Qué incluye?
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ background: "var(--neo-bg)", boxShadow: "var(--neo-shadow-card)" }}>
            {selected.coverages.map((cov, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: i < selected.coverages.length - 1 ? "1px solid var(--simon-divider)" : "none" }}>
                {cov.included ? (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(0,241,199,0.12)" }}>
                    <Check className="h-3.5 w-3.5" style={{ color: "#00f1c7" }} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(214,45,48,0.08)" }}>
                    <X className="h-3.5 w-3.5" style={{ color: "#d62d30" }} strokeWidth={3} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold" style={{ color: cov.included ? "var(--simon-text-strong)" : "var(--simon-text)", opacity: cov.included ? 1 : 0.5 }}>
                    {cov.label}
                  </p>
                  {cov.limit && cov.included && (
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--simon-accent)" }}>Hasta {cov.limit}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Benefits pills ── */}
        <div className="px-5 pt-4 pb-2">
          <h2 className="text-[16px] font-black mb-3" style={{ color: "var(--simon-text-strong)" }}>Beneficios</h2>
          <div className="flex flex-wrap gap-2">
            {selected.benefits.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold" style={{ background: "rgba(0,241,199,0.06)", border: "1px solid rgba(0,241,199,0.15)", color: "var(--simon-text-strong)" }}>
                <Sparkles className="h-3 w-3" style={{ color: "var(--simon-accent)" }} />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* ── Provider badge ── */}
        <div className="px-5 pt-4 pb-32">
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "rgba(0,241,199,0.04)", border: "1px solid rgba(0,241,199,0.12)" }}>
            <BadgeCheck className="h-8 w-8 shrink-0" style={{ color: "var(--simon-accent)" }} />
            <div>
              <p className="text-[13px] font-bold" style={{ color: "var(--simon-text-strong)" }}>Asegurado por {PROMOTEC.name}</p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--simon-text)" }}>{PROMOTEC.tagline} · {PROMOTEC.cert}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky CTA ── */}
      <div className="shrink-0 px-5 pb-2 pt-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 12px) + 12px)", background: "var(--simon-bg)", borderTop: "1px solid var(--simon-divider)" }}>
        <button
          type="button"
          onClick={() => onBuy(selected)}
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-black transition-transform active:scale-[0.97]"
          style={{ background: "linear-gradient(135deg, #00f1c7, #00be9c)", color: "#042226", boxShadow: "0 8px 24px rgba(0,241,199,0.3)" }}
        >
          Proteger mi vehículo — {formatCOP(selected.price)}
        </button>
        <p className="mt-2 text-center text-[11px]" style={{ color: "var(--simon-text)" }}>
          🔒 Pago seguro · Póliza emitida al instante
        </p>
      </div>
    </div>
  )
}
