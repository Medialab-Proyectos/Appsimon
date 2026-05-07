"use client"

import { useState, useCallback } from "react"
import {
  ArrowLeft, CreditCard, Building2, Smartphone, Lock,
  ShieldCheck, CheckCircle, Edit3
} from "lucide-react"
import { type InsuranceProduct, type InsuredVehicle, formatCOP, PROMOTEC } from "@/lib/insurance-data"

type Step = "confirm" | "payment"
type PayMethod = "credit-card" | "pse" | "nequi" | "daviplata"

interface Props {
  product: InsuranceProduct
  vehicle: InsuredVehicle
  onBack: () => void
  onSuccess: () => void
}

export function InsuranceCheckout({ product, vehicle, onBack, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("confirm")
  const [method, setMethod] = useState<PayMethod>("credit-card")
  const [agreed, setAgreed] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handlePay = useCallback(() => {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); onSuccess() }, 2500)
  }, [onSuccess])

  if (processing) {
    return (
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center" style={{ background: "linear-gradient(180deg, #020c10 0%, #06252b 50%, #020c10 100%)" }}>
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-[#00f1c7]/20 flex items-center justify-center">
            <ShieldCheck className="h-10 w-10 text-[#00f1c7] animate-pulse" />
          </div>
          <div className="absolute inset-0 h-24 w-24 rounded-full border-4 border-transparent border-t-[#00f1c7] animate-spin" />
        </div>
        <p className="mt-6 text-[18px] font-black text-white">Procesando tu pago</p>
        <p className="mt-2 text-[14px] text-white/50">Esto tomará solo un momento...</p>
        <div className="mt-4 flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 text-white/30" />
          <span className="text-[11px] text-white/30">Conexión segura · Datos encriptados</span>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-20 flex flex-col" style={{ background: "var(--simon-bg)" }}>
      <header className="shrink-0 flex items-center gap-3 px-5 pb-3" style={{ paddingTop: "calc(env(safe-area-inset-top, 12px) + 12px)" }}>
        <button type="button" onClick={step === "payment" ? () => setStep("confirm") : onBack} className="flex h-10 w-10 items-center justify-center rounded-full active:scale-90 transition-all" style={{ background: "var(--simon-divider)" }} aria-label="Volver">
          <ArrowLeft className="h-5 w-5" style={{ color: "var(--simon-text-strong)" }} />
        </button>
        <h1 className="flex-1 text-[20px] font-black" style={{ color: "var(--simon-text-strong)" }}>
          {step === "confirm" ? "Confirmar datos" : "Método de pago"}
        </h1>
        <div className="flex gap-1.5">
          <span className={`h-2 rounded-full transition-all ${step === "confirm" ? "w-6 bg-[#00f1c7]" : "w-2 bg-[#00f1c7]/30"}`} />
          <span className={`h-2 rounded-full transition-all ${step === "payment" ? "w-6 bg-[#00f1c7]" : "w-2 bg-[#00f1c7]/30"}`} />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-4" style={{ WebkitOverflowScrolling: "touch" }}>
        {step === "confirm" ? (
          <div className="space-y-4 pt-2">
            <Card title="Datos del vehículo" badge="Pre-llenado">
              <Row label="Placa" value={vehicle.plate} />
              <Row label="Vehículo" value={vehicle.model} />
              <Row label="Año" value={String(vehicle.year)} />
            </Card>
            <Card title="Datos del propietario" action={<><Edit3 className="h-3 w-3" /> Editar</>}>
              <Row label="Nombre" value="Alejandra Díaz" />
              <Row label="Cédula" value="1.023.456.789" />
              <Row label="Correo" value="alejandra@email.com" />
              <Row label="Teléfono" value="+57 310 456 7890" />
            </Card>
            <Card title="Resumen">
              <Row label="Plan" value={`${product.tierName} — ${product.name}`} />
              <Row label="Aseguradora" value={product.provider} />
              <Row label="Vigencia" value={product.period} />
              <div className="pt-3 mt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--simon-divider)" }}>
                <span className="text-[15px] font-black" style={{ color: "var(--simon-text-strong)" }}>Total</span>
                <span className="text-[22px] font-black" style={{ color: "var(--simon-accent)" }}>{formatCOP(product.price)}</span>
              </div>
            </Card>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <p className="text-[14px] font-bold" style={{ color: "var(--simon-text-strong)" }}>Selecciona cómo quieres pagar</p>
            {([
              { id: "credit-card" as PayMethod, label: "Tarjeta de crédito", desc: "Visa, Mastercard, Amex", icon: <CreditCard className="h-5 w-5" /> },
              { id: "pse" as PayMethod, label: "PSE", desc: "Débito bancario", icon: <Building2 className="h-5 w-5" /> },
              { id: "nequi" as PayMethod, label: "Nequi", desc: "Billetera digital", icon: <Smartphone className="h-5 w-5" /> },
              { id: "daviplata" as PayMethod, label: "Daviplata", desc: "Billetera digital", icon: <Smartphone className="h-5 w-5" /> },
            ]).map(m => (
              <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                className="flex w-full items-center gap-3 rounded-2xl p-4 text-left active:scale-[0.98] transition-all"
                style={{ background: "var(--neo-bg)", boxShadow: "var(--neo-shadow-card)", border: method === m.id ? "2px solid var(--simon-accent)" : "2px solid transparent" }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: method === m.id ? "rgba(0,241,199,0.1)" : "var(--simon-divider)" }}>
                  <span style={{ color: method === m.id ? "var(--simon-accent)" : "var(--simon-text)" }}>{m.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-bold" style={{ color: "var(--simon-text-strong)" }}>{m.label}</p>
                  <p className="text-[12px]" style={{ color: "var(--simon-text)" }}>{m.desc}</p>
                </div>
                {method === m.id && <CheckCircle className="h-5 w-5 shrink-0" style={{ color: "var(--simon-accent)" }} />}
              </button>
            ))}

            {/* Total */}
            <div className="rounded-2xl p-4" style={{ background: "var(--neo-bg)", boxShadow: "var(--neo-shadow-card)" }}>
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-black" style={{ color: "var(--simon-text-strong)" }}>Total a pagar</span>
                <span className="text-[22px] font-black" style={{ color: "var(--simon-accent)" }}>{formatCOP(product.price)}</span>
              </div>
            </div>

            {/* Terms */}
            <button type="button" onClick={() => setAgreed(!agreed)} className="flex w-full items-start gap-3 p-2 text-left">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-all" style={{ background: agreed ? "var(--simon-accent)" : "transparent", border: agreed ? "none" : "2px solid var(--simon-divider)" }}>
                {agreed && <CheckCircle className="h-3.5 w-3.5 text-[#042226]" />}
              </div>
              <span className="text-[12px] leading-relaxed" style={{ color: "var(--simon-text)" }}>
                Acepto los <span className="font-bold underline" style={{ color: "var(--simon-accent)" }}>términos y condiciones</span> y la <span className="font-bold underline" style={{ color: "var(--simon-accent)" }}>política de privacidad</span>
              </span>
            </button>
          </div>
        )}
        <div className="h-24" />
      </div>

      {/* CTA */}
      <div className="shrink-0 px-5 pt-3" style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 12px) + 12px)", background: "var(--simon-bg)", borderTop: "1px solid var(--simon-divider)" }}>
        {step === "confirm" ? (
          <button type="button" onClick={() => setStep("payment")} className="flex h-[54px] w-full items-center justify-center rounded-2xl text-[16px] font-black active:scale-[0.97] transition-transform" style={{ background: "linear-gradient(135deg, #00f1c7, #00be9c)", color: "#042226", boxShadow: "0 8px 24px rgba(0,241,199,0.3)" }}>
            Continuar al pago
          </button>
        ) : (
          <button type="button" onClick={handlePay} disabled={!agreed} className="flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-black active:scale-[0.97] transition-all disabled:opacity-40" style={{ background: agreed ? "linear-gradient(135deg, #00f1c7, #00be9c)" : "var(--simon-divider)", color: agreed ? "#042226" : "var(--simon-text)", boxShadow: agreed ? "0 8px 24px rgba(0,241,199,0.3)" : "none" }}>
            <Lock className="h-4 w-4" /> Pagar {formatCOP(product.price)}
          </button>
        )}
        <p className="mt-2 text-center text-[11px]" style={{ color: "var(--simon-text)" }}>🔒 Pago 100% seguro · Encriptación SSL</p>
      </div>
    </div>
  )
}

function Card({ title, badge, action, children }: { title: string; badge?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "var(--neo-bg)", boxShadow: "var(--neo-shadow-card)" }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-black" style={{ color: "var(--simon-text-strong)" }}>{title}</h3>
        {badge && <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase" style={{ background: "rgba(0,241,199,0.1)", color: "var(--simon-accent)" }}>{badge}</span>}
        {action && <button type="button" className="flex items-center gap-1 text-[11px] font-bold" style={{ color: "var(--simon-accent)" }}>{action}</button>}
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px]" style={{ color: "var(--simon-text)" }}>{label}</span>
      <span className="text-[13px] font-bold" style={{ color: "var(--simon-text-strong)" }}>{value}</span>
    </div>
  )
}
