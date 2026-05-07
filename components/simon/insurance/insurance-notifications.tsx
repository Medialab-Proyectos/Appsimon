"use client"

import { ArrowLeft, Bell, ChevronRight, ShieldAlert, CheckCircle, Sparkles } from "lucide-react"
import { type InsuranceNotification } from "@/lib/insurance-data"

const COLORS: Record<InsuranceNotification["type"], string> = { renewal: "#FFB800", confirmation: "#00f1c7", alert: "#d62d30", recommendation: "#52d9ff" }
const ICONS: Record<InsuranceNotification["type"], React.ReactNode> = {
  renewal: <ShieldAlert className="h-5 w-5" />,
  confirmation: <CheckCircle className="h-5 w-5" />,
  alert: <ShieldAlert className="h-5 w-5" />,
  recommendation: <Sparkles className="h-5 w-5" />,
}

interface Props {
  notifications: InsuranceNotification[]
  onBack: () => void
  onAction: (target: string) => void
}

export function InsuranceNotifications({ notifications, onBack, onAction }: Props) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col" style={{ background: "var(--simon-bg)" }}>
      <header className="shrink-0 flex items-center gap-3 px-5 pb-3" style={{ paddingTop: "calc(env(safe-area-inset-top, 12px) + 12px)" }}>
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full active:scale-90 transition-all" style={{ background: "var(--simon-divider)" }} aria-label="Volver">
          <ArrowLeft className="h-5 w-5" style={{ color: "var(--simon-text-strong)" }} />
        </button>
        <h1 className="text-[20px] font-black" style={{ color: "var(--simon-text-strong)" }}>Notificaciones</h1>
      </header>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5" style={{ WebkitOverflowScrolling: "touch" }}>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="h-12 w-12" style={{ color: "var(--simon-divider)" }} />
            <p className="mt-4 text-[15px] font-black" style={{ color: "var(--simon-text-strong)" }}>Sin notificaciones</p>
            <p className="mt-1 text-[13px]" style={{ color: "var(--simon-text)" }}>Te avisaremos cuando sea importante.</p>
          </div>
        ) : (
          <div className="space-y-2.5 pb-6 pt-2">
            {notifications.map(n => {
              const c = COLORS[n.type]
              return (
                <div key={n.id} className="rounded-2xl p-4" style={{ background: "var(--neo-bg)", boxShadow: "var(--neo-shadow-card)", borderLeft: `3px solid ${c}`, opacity: n.read ? 0.65 : 1 }}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${c}15`, color: c }}>
                      {ICONS[n.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-black leading-tight" style={{ color: "var(--simon-text-strong)" }}>{n.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed" style={{ color: "var(--simon-text)" }}>{n.message}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] font-semibold" style={{ color: "var(--simon-text)" }}>{n.date}</span>
                        {n.actionLabel && n.actionTarget && (
                          <button type="button" onClick={() => onAction(n.actionTarget!)} className="flex items-center gap-0.5 text-[12px] font-black active:opacity-60" style={{ color: "var(--simon-accent)" }}>
                            {n.actionLabel} <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
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
