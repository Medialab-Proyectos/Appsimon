"use client"

import { CreditCard, Gift, Home, Coins, Settings } from "lucide-react"
import { ReactNode } from "react"

interface NavItem {
  icon: ReactNode
  label: string
  isCenter?: boolean
}

const navItems: NavItem[] = [
  { icon: <CreditCard className="w-4 h-4" />, label: "T credito" },
  { icon: <Gift className="w-4 h-4" />, label: "Beneficios" },
  { icon: <Home className="w-5 h-5" />, label: "", isCenter: true },
  { icon: <Coins className="w-4 h-4" />, label: "Mis creditos" },
  { icon: <Settings className="w-4 h-4" />, label: "Opciones" },
]

export function BottomNav() {
  return (
    <div 
      className="shrink-0 px-3 pb-2 bg-transparent"
      style={{ paddingBottom: 'max(6px, env(safe-area-inset-bottom))' }}
    >
      {/* MD3 Navigation Bar */}
      <div 
        className="bg-white rounded-full px-1 py-1.5 flex items-end justify-around relative border border-gray-100"
        style={{ boxShadow: '0 -2px 16px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.08)' }}
      >
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center transition-colors ${
              item.isCenter
                ? "relative -mt-5"
                : "px-1 py-0.5 min-w-[48px]"
            }`}
          >
            {item.isCenter ? (
              <div 
                className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center active:bg-teal-600 transition-all border-[3px] border-white"
                style={{ boxShadow: '0 4px 12px rgba(20, 184, 166, 0.35)' }}
              >
                <span className="text-white">{item.icon}</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-colors">
                  <span className="text-gray-500">{item.icon}</span>
                </div>
                <span className="text-[9px] text-gray-500 font-medium">{item.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
