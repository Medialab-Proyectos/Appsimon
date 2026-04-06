"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { ShieldCheck, CalendarClock, FolderOpen } from "lucide-react"

/* ─── Figma asset URLs (valid 7 days) ─── */
const CAR_CIRCLE = "https://www.figma.com/api/mcp/asset/2945b6c7-331b-4c5c-a344-6524e1fe1d81"
const CAR_IMAGE = "https://www.figma.com/api/mcp/asset/7d66551f-cfaa-4385-9624-585d3eb8d0d0"
const PICO_ICON = "https://www.figma.com/api/mcp/asset/e8e360a9-75bf-4e26-a17b-97426a0a35de"
const RECORRIDO_ICON = "https://www.figma.com/api/mcp/asset/86ad7b38-44a9-4bf8-a8ad-c85d8addb7c7"
const ELLIPSE_SHADOW = "https://www.figma.com/api/mcp/asset/c304ee9a-15fd-47b4-b803-b4d181c55d94"

/* Design reference dimensions */
const CARD_W = 295  // px, from Figma
const CARD_H = 326  // px, from Figma
const DOTS_H = 28   // px reserved at bottom for indicator dots

const cardBg: React.CSSProperties = {
  background: "radial-gradient(ellipse at 85% 4%, #ededed 0%, #fefefe 93%)",
  boxShadow: "6.08px 6.08px 14.6px rgba(0,0,0,0.1)",
}
const cardInset: React.CSSProperties = {
  boxShadow: "inset 0px -2.4px 2.4px rgba(112,111,111,0.25), inset 0px 2.4px 2.4px white",
}

interface Vehicle {
  plate: string
  model: string
  tagActive: boolean
  hasRestriction: boolean
  soatDate: string
  rtmDate: string
  todayDistance: string
}

const vehicles: Vehicle[] = [
  {
    plate: "HKL 452",
    model: "Mercedes benz gle 450",
    tagActive: true,
    hasRestriction: true,
    soatDate: "08/07/26",
    rtmDate: "08/07/26",
    todayDistance: "23.2 Km",
  },
  {
    plate: "UBK 71L",
    model: "Yamaha Z100",
    tagActive: false,
    hasRestriction: false,
    soatDate: "08/07/26",
    rtmDate: "08/07/26",
    todayDistance: "8.4 Km",
  },
  {
    plate: "ABC 789",
    model: "Toyota Corolla",
    tagActive: true,
    hasRestriction: true,
    soatDate: "05/11/26",
    rtmDate: "05/11/26",
    todayDistance: "45.3 Km",
  },
  {
    plate: "XYZ 456",
    model: "Honda Civic",
    tagActive: true,
    hasRestriction: false,
    soatDate: "09/02/26",
    rtmDate: "09/02/26",
    todayDistance: "8.1 Km",
  },
]

export function VehicleCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardScale, setCardScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const isDragging = useRef(false)

  /* ── Scale card to fit available container space ── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const h = el.clientHeight
      const w = el.clientWidth
      const byH = (h - DOTS_H) / CARD_H   // shrink if not enough height
      const byW = (w - 24) / CARD_W        // shrink if not enough width
      setCardScale(Math.min(1, byH, byW))
    }
    update()
    const obs = new ResizeObserver(update)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    isDragging.current = true
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return
      isDragging.current = false
      const diff = touchStartX.current - e.changedTouches[0].clientX
      if (diff > 50 && activeIndex < vehicles.length - 1) setActiveIndex((i) => i + 1)
      else if (diff < -50 && activeIndex > 0) setActiveIndex((i) => i - 1)
    },
    [activeIndex]
  )

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return
      isDragging.current = false
      const diff = touchStartX.current - e.clientX
      if (diff > 50 && activeIndex < vehicles.length - 1) setActiveIndex((i) => i + 1)
      else if (diff < -50 && activeIndex > 0) setActiveIndex((i) => i - 1)
    },
    [activeIndex]
  )

  return (
    <div
      ref={containerRef}
      className="relative flex-1 min-h-0 overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => { isDragging.current = false }}
    >
      {/* Cards */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1000px", paddingBottom: `${DOTS_H}px` }}
      >
        {vehicles.map((vehicle, index) => {
          const diff = index - activeIndex
          const absD = Math.abs(diff)
          const baseScale = (1 - absD * 0.1) * cardScale
          return (
            <div
              key={index}
              className="absolute transition-all duration-500 ease-out cursor-grab active:cursor-grabbing"
              style={{
                transform: `translateX(${diff * 102}%) perspective(1000px) rotateY(${diff * -8}deg) translateZ(${-absD * 40}px) scale(${baseScale})`,
                opacity: absD > 1 ? 0 : 1 - absD * 0.35,
                zIndex: vehicles.length - absD,
                pointerEvents: absD > 1 ? "none" : "auto",
              }}
            >
              <VehicleCard vehicle={vehicle} />
            </div>
          )
        })}
      </div>

      {/* Indicator dots */}
      <div className="absolute bottom-0 left-0 right-0 h-7 flex items-center justify-center gap-1.5">
        {vehicles.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-5 h-1.5 bg-[#00f1c7]" : "w-1.5 h-1.5 bg-[#d1d1d1]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="relative" style={{ width: CARD_W, height: CARD_H }}>

      {/* ── Neomorphic card background (starts at ~45px) ── */}
      <div
        className="absolute top-[45px] left-0 right-0 h-[235px] rounded-[12px]"
        style={cardBg}
      >
        <div className="absolute inset-0 rounded-[12px]" style={cardInset} />
      </div>

      {/* ── Car image (overflows above card) ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[142px] h-[104px]">
        {/* Ellipse circle — PNG image with built-in shadow, not clipped */}
        <div className="absolute left-[31px] top-[12px] w-[81px] h-[81px]">
          <div className="absolute" style={{ inset: "-10.51% -25.52% -25.52% -10.51%" }}>
            <img src={CAR_CIRCLE} alt="" className="block max-w-none w-full h-full" />
          </div>
        </div>
        {/* Car image — clipped to 67×56 box, positioned exactly as Figma exports */}
        <div className="absolute left-[38px] top-[24px] w-[67px] h-[56px]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={CAR_IMAGE}
              alt="Vehicle"
              className="absolute max-w-none"
              style={{ width: "145.04%", height: "172.39%", left: "-23.09%", top: "-44.95%" }}
            />
          </div>
        </div>
      </div>

      {/* ── Plate + TAG badge ── */}
      <div className="absolute top-[104px] left-1/2 -translate-x-1/2 flex items-start justify-between w-[247px]">
        <div className="w-[181px]">
          <p
            className="text-[20px] text-black leading-tight"
            style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 900 }}
          >
            {vehicle.plate}
          </p>
          <p
            className="text-[10px] text-[#6d6d6d] leading-snug overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 500 }}
          >
            {vehicle.model}
          </p>
        </div>
        {vehicle.tagActive ? (
          <div className="bg-[#e7fffa] border border-[#00f1c7] rounded-[8px] px-[3px] h-[15px] flex items-center justify-center w-[66px] mt-1 shrink-0">
            <span className="text-[9px] text-[#049e83] whitespace-nowrap" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 500 }}>
              TAG ACTIVO
            </span>
          </div>
        ) : (
          <div className="bg-[#d1d1d1] border border-[#5d5d5d] rounded-[8px] px-[3px] h-[15px] flex items-center justify-center w-[72px] mt-1 shrink-0">
            <span className="text-[9px] text-[#5d5d5d] whitespace-nowrap" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 500 }}>
              TAG INACTIVO
            </span>
          </div>
        )}
      </div>

      {/* ── Pico y placa ── */}
      <div className="absolute top-[154px] left-1/2 -translate-x-1/2 flex items-center gap-2 w-[245px] bg-white/10 rounded px-2 h-[32px]">
        <img src={PICO_ICON} alt="" className="h-6 w-[14px] shrink-0 object-contain" />
        <div className="flex items-center justify-between flex-1 min-w-0">
          <div className="flex flex-col leading-none shrink-0">
            <span className="text-[8px] text-[#6d6d6d]" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 500 }}>
              Pico y placa
            </span>
            <span className="text-[10px] text-[#6d6d6d]" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 700 }}>
              BOGOTÁ
            </span>
          </div>
          {vehicle.hasRestriction ? (
            <span className="text-[11px] text-[#d62d30] whitespace-nowrap" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 900 }}>
              TIENES RESTRICCIÓN
            </span>
          ) : (
            <span className="text-[11px] text-[#00be9c] whitespace-nowrap" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 900 }}>
              LIBRE TRANSITO
            </span>
          )}
        </div>
      </div>

      {/* ── SOAT + RTM ── */}
      <div className="absolute top-[198px] left-1/2 -translate-x-1/2 flex items-center justify-between w-[247px]">
        <div className="flex items-center gap-1.5 w-[115px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6d6d6d] shrink-0" strokeWidth={1.5} />
          <span className="text-[9px] text-[#6d6d6d] uppercase tracking-wide shrink-0">SOAT</span>
          <span className="text-[12px] text-black" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 700 }}>
            {vehicle.soatDate}
          </span>
        </div>
        <div className="flex items-center gap-1.5 w-[115px]">
          <CalendarClock className="w-3.5 h-3.5 text-[#6d6d6d] shrink-0" strokeWidth={1.5} />
          <span className="text-[9px] text-[#6d6d6d] uppercase tracking-wide shrink-0">RTM</span>
          <span className="text-[12px] text-black" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 700 }}>
            {vehicle.rtmDate}
          </span>
        </div>
      </div>

      {/* ── Recorrido + Guantera ── */}
      <div className="absolute top-[224px] left-1/2 -translate-x-1/2 flex items-stretch gap-4 w-[247px] h-[31px]">
        <div className="flex-1 bg-white rounded-[8px] flex items-center justify-center gap-1 px-1" style={{ border: "0.5px solid #00f1c7" }}>
          <img src={RECORRIDO_ICON} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
          <div className="flex flex-col items-center leading-none">
            <span className="text-[8px] text-[#6d6d6d] whitespace-nowrap" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 500 }}>
              Recorrido de hoy:
            </span>
            <span className="text-[12px] text-black" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 700 }}>
              {vehicle.todayDistance}
            </span>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-[8px] flex items-center justify-center gap-1 px-1" style={{ border: "0.5px solid #00f1c7" }}>
          <FolderOpen className="w-3.5 h-3.5 text-[#6d6d6d] shrink-0" strokeWidth={1.5} />
          <span className="text-[12px] text-black" style={{ fontFamily: '"Museo Sans", sans-serif', fontWeight: 300 }}>
            Guantera
          </span>
        </div>
      </div>

      {/* ── Ver detalles ── */}
      <div className="absolute top-[268px] left-1/2 -translate-x-1/2 w-[104px] h-[22px] bg-[#e7fffa] rounded-[11px] flex items-center justify-center" style={{ border: "0.5px solid #00f1c7" }}>
        <span className="text-[12px] text-[#006257] font-semibold" style={{ fontFamily: '"Inter", sans-serif', letterSpacing: "-0.015em" }}>
          Ver detalles
        </span>
      </div>

      {/* ── Card shadow/reflection ── */}
      <div className="absolute top-[301px] left-1/2 -translate-x-1/2 h-3 w-[210px]">
        <img src={ELLIPSE_SHADOW} alt="" className="w-full h-full object-contain opacity-60" />
      </div>
    </div>
  )
}
