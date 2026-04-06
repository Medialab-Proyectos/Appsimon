"use client"

import { Headphones, Bell, CircleUserRound } from "lucide-react"

const SIMON_LOGO_TOP = "https://www.figma.com/api/mcp/asset/006c3a59-a3eb-41e2-8c84-1de1dd747aa9"
const SIMON_LOGO_BOTTOM = "https://www.figma.com/api/mcp/asset/08256b12-670a-4fb6-bc57-45e58d261fb1"

const neomorphicBtn: React.CSSProperties = {
  background: "radial-gradient(ellipse at 85% 4%, #ededed 0%, #fefefe 93%)",
  boxShadow:
    "6px 6px 14.5px rgba(0,0,0,0.1), inset 0px -2.4px 2.4px rgba(112,111,111,0.25), inset 0px 2.4px 2.4px white",
}

export function TopHeader() {
  return (
    <div
      className="shrink-0 bg-[#fafafa]"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* Greeting + Icons row */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1">
        <div>
          <p
            className="text-[15px] text-[#4f4f4f] leading-snug"
            style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 500 }}
          >
            Bienvenido/a
          </p>
          <p
            className="text-[18px] text-[#4f4f4f] leading-snug"
            style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 700 }}
          >
            Alejandra Diaz
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full flex items-center justify-center">
            <Headphones className="w-[18px] h-[18px] text-[#4f4f4f]" strokeWidth={1.5} />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center relative">
            <Bell className="w-[18px] h-[18px] text-[#4f4f4f]" strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00f1c7] rounded-full" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center">
            <CircleUserRound className="w-[18px] h-[18px] text-[#4f4f4f]" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Simon Logo + Add Vehicle row */}
      <div className="flex items-center justify-between px-6 pb-3">
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
          className="px-4 h-8 text-[12px] font-medium text-[#0f6b58] rounded-xl whitespace-nowrap"
          style={neomorphicBtn}
        >
          Agregar vehiculo
        </button>
      </div>
    </div>
  )
}
