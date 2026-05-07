"use client"

import { ArrowLeft, Download, Share2, ShieldCheck, Clock } from "lucide-react"
import { type Policy, formatCOP, getDaysUntil, statusColor, statusLabel } from "@/lib/insurance-data"

interface Props { policies: Policy[]; onBack: () => void }

export function InsurancePolicyWallet({ policies, onBack }: Props) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col" style={{ background: "var(--simon-bg)" }}>
      <header className="shrink-0 flex items-center gap-3 px-5 pb-3" style={{ paddingTop: "calc(env(safe-area-inset-top, 12px) + 12px)" }}>
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full active:scale-90 transition-all" style={{ background: "var(--simon-divider)" }} aria-label="Volver">
          <ArrowLeft className="h-5 w-5" style={{ color: "var(--simon-text-strong)" }} />
        </button>
        <h1 className="text-[20px] font-black" style={{ color: "var(--simon-text-strong)" }}>Mis Pólizas</h1>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5" style={{ WebkitOverflowScrolling: "touch" }}>
        {policies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "rgba(0,241,199,0.08)" }}>
              <ShieldCheck className="h-9 w-9" style={{ color: "var(--simon-accent)" }} />
            </div>
            <p className="mt-4 text-[17px] font-black text-center" style={{ color: "var(--simon-text-strong)" }}>Aún no tienes pólizas</p>
            <p className="mt-2 text-[13px] text-center max-w-[260px]" style={{ color: "var(--simon-text)" }}>Protege tu vehículo en menos de 2 minutos. Tus pólizas aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-3 pb-6 pt-2">
            {policies.map(p => {
              const days = getDaysUntil(p.endDate)
              const color = statusColor(p.status)
              return (
                <div key={p.id} className="rounded-2xl p-4" style={{ background: "var(--neo-bg)", boxShadow: "var(--neo-shadow-card)", borderLeft: `4px solid ${color}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[16px] font-black" style={{ color: "var(--simon-text-strong)" }}>{p.productName}</p>
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" style={{ background: `${color}18`, color }}>{statusLabel(p.status)}</span>
                  </div>
                  <p className="text-[13px]" style={{ color: "var(--simon-text)" }}>{p.vehiclePlate} · {p.vehicleModel}</p>
                  <p className="text-[12px] mt-1" style={{ color: "var(--simon-text)" }}>Póliza: {p.policyNumber}</p>

                  <div className="flex items-center gap-1.5 mt-3">
                    <Clock className="h-3.5 w-3.5" style={{ color }} />
                    <span className="text-[12px] font-bold" style={{ color }}>
                      {days > 0 ? `${days} días restantes` : days === 0 ? "Vence hoy" : `Venció hace ${Math.abs(days)} días`}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold active:scale-95 transition-all" style={{ background: "var(--simon-bg)", border: "0.5px solid var(--simon-card-border)", color: "var(--simon-text-strong)" }}>
                      <Download className="h-3.5 w-3.5" /> PDF
                    </button>
                    <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold active:scale-95 transition-all" style={{ background: "var(--simon-bg)", border: "0.5px solid var(--simon-card-border)", color: "var(--simon-text-strong)" }}>
                      <Share2 className="h-3.5 w-3.5" /> Compartir
                    </button>
                    {(p.status === "expiring" || p.status === "expired") && (
                      <button type="button" className="flex flex-1 items-center justify-center rounded-xl py-2.5 text-[12px] font-black active:scale-95 transition-all" style={{ background: "linear-gradient(135deg, #00f1c7, #00be9c)", color: "#042226" }}>
                        Renovar
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
