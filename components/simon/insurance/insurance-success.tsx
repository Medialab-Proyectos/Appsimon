"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Download, Share2, ChevronRight, ShieldCheck, Sparkles } from "lucide-react"
import { type InsuranceProduct, type InsuredVehicle, formatCOP } from "@/lib/insurance-data"

interface Props {
  product: InsuranceProduct
  vehicle: InsuredVehicle
  onViewPolicy: () => void
  onGoHome: () => void
}

export function InsuranceSuccess({ product, vehicle, onViewPolicy, onGoHome }: Props) {
  const [show, setShow] = useState(false)
  useEffect(() => { requestAnimationFrame(() => setShow(true)) }, [])

  return (
    <div className="absolute inset-0 z-20 flex flex-col" style={{ background: "linear-gradient(180deg, #020c10 0%, #06252b 50%, #020c10 100%)" }}>
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: `${4 + Math.random() * 6}px`, height: `${4 + Math.random() * 6}px`,
            left: `${Math.random() * 100}%`, top: "-5%",
            background: ["#00f1c7", "#FFB800", "#52d9ff", "#ff6b6b", "#fff"][i % 5],
            animation: `cFall ${2 + Math.random() * 2}s ease-out ${Math.random() * 0.5}s forwards`, opacity: 0.8,
          }} />
        ))}
        <style>{`@keyframes cFall { 0%{transform:translateY(0) rotate(0);opacity:.8} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }`}</style>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-7" style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease-out" }}>
        <div className="relative mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "rgba(0,241,199,0.15)" }}>
            <CheckCircle className="h-12 w-12" style={{ color: "#00f1c7" }} />
          </div>
          <div className="absolute inset-0 h-24 w-24 rounded-full animate-ping" style={{ background: "rgba(0,241,199,0.06)" }} />
        </div>

        <h1 className="text-center text-[26px] font-black text-white leading-tight tracking-tight">
          ¡Tu vehículo está<br />protegido! 🎉
        </h1>
        <p className="mt-3 text-center text-[14px] text-white/50 max-w-[280px]">
          Tu póliza <span className="font-bold text-white/70">{product.tierName}</span> fue emitida exitosamente.
        </p>

        {/* Summary */}
        <div className="mt-6 w-full rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-5 w-5" style={{ color: "#00f1c7" }} />
            <span className="text-[15px] font-black text-white">{product.name}</span>
          </div>
          <div className="space-y-2.5">
            <SRow label="Vehículo" value={`${vehicle.plate} · ${vehicle.model}`} />
            <SRow label="Vigencia" value="06 may 2026 — 06 may 2027" />
            <SRow label="N° Póliza" value={`PRO-${Date.now().toString().slice(-6)}`} />
            <SRow label="Pagado" value={formatCOP(product.price)} green />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex w-full gap-2">
          <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-[13px] font-bold active:scale-95 transition-all" style={{ background: "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Download className="h-4 w-4" /> PDF
          </button>
          <button type="button" className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-[13px] font-bold active:scale-95 transition-all" style={{ background: "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Share2 className="h-4 w-4" /> Compartir
          </button>
        </div>

        {product.categoryId === "soat" && (
          <div className="mt-5 w-full rounded-xl p-3.5" style={{ background: "rgba(0,241,199,0.06)", border: "1px solid rgba(0,241,199,0.12)" }}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0" style={{ color: "#00f1c7" }} />
              <p className="flex-1 text-[12px] text-white/60">
                <span className="font-bold text-white">¿Sabías que</span> tu {vehicle.model} también puede tener cobertura todo riesgo?
              </p>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/30" />
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 px-7 space-y-2" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 24px)" }}>
        <button type="button" onClick={onViewPolicy} className="flex h-[54px] w-full items-center justify-center rounded-2xl text-[16px] font-black active:scale-[0.97] transition-transform" style={{ background: "linear-gradient(135deg, #00f1c7, #00be9c)", color: "#042226", boxShadow: "0 8px 24px rgba(0,241,199,0.3)" }}>
          Ver mi póliza
        </button>
        <button type="button" onClick={onGoHome} className="flex h-[44px] w-full items-center justify-center text-[14px] font-medium text-white/40 active:text-white/60">
          Ir al inicio
        </button>
      </div>
    </div>
  )
}

function SRow({ label, value, green }: { label: string; value: string; green?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[12px] text-white/40">{label}</span>
      <span className={`text-[13px] font-bold ${green ? "text-[#00f1c7]" : "text-white/80"}`}>{value}</span>
    </div>
  )
}
