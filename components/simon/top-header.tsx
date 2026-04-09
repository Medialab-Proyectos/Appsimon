"use client"

import { Headphones, CircleUserRound } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const SIMON_LOGO_TOP = "https://www.figma.com/api/mcp/asset/006c3a59-a3eb-41e2-8c84-1de1dd747aa9"
const SIMON_LOGO_BOTTOM = "https://www.figma.com/api/mcp/asset/08256b12-670a-4fb6-bc57-45e58d261fb1"

export function TopHeader() {
  return (
    <div
      className="shrink-0"
      style={{ paddingTop: "env(safe-area-inset-top)", background: "var(--simon-bg)" }}
    >
      {/* Greeting + Icons row */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1">
        <div>
          <p
            className="text-[15px] leading-snug"
            style={{ fontWeight: 500, color: "var(--simon-text)" }}
          >
            Bienvenido/a
          </p>
          <p
            className="text-[18px] leading-snug"
            style={{ fontWeight: 700, color: "var(--simon-text-strong)" }}
          >
            Alejandra Díaz
          </p>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            aria-label="Soporte y ayuda"
            className="w-11 h-11 rounded-full flex items-center justify-center"
          >
            <Headphones className="w-[20px] h-[20px]" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
          </button>
          <button
            aria-label="Mi cuenta"
            className="w-11 h-11 rounded-full flex items-center justify-center"
          >
            <CircleUserRound className="w-[20px] h-[20px]" strokeWidth={1.5} style={{ color: "var(--simon-text)" }} />
          </button>
        </div>
      </div>

      {/* Simon Logo + Add Vehicle row */}
      <div className="flex items-center justify-between px-6 pt-2 pb-3">
        <div className="relative h-9 w-[89px]">
          <img
            src={SIMON_LOGO_TOP}
            alt="Simon"
            className="absolute top-0 left-0 h-[70%] w-full object-contain object-left"
          />
          <img
            src={SIMON_LOGO_BOTTOM}
            alt=""
            className="absolute bottom-0 left-0 h-[27%] w-full object-contain object-left"
          />
        </div>
        <button
          className="px-4 h-8 text-[12px] font-medium rounded-xl whitespace-nowrap"
          style={{
            background: "var(--neo-bg)",
            boxShadow: "var(--neo-shadow)",
            color: "var(--simon-accent)",
          }}
        >
          Agregar vehículo
        </button>
      </div>
    </div>
  )
}
