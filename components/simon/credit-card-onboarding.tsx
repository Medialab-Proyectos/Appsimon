"use client"

import { useCallback, useRef, useState } from "react"
import { X } from "lucide-react"

const CREDIT_CARD_EXTERNAL_URL = "https://www.finanzauto.com.co/tarjeta-de-credito"

const slides = [
  { src: "/onboarding/on1.png", alt: "Presentación tarjeta de crédito Simon" },
  { src: "/onboarding/on2.png", alt: "Beneficios tarjeta de crédito Simon" },
  { src: "/onboarding/on3.png", alt: "Cómo adquirir tu tarjeta de crédito Simon" },
]

interface CreditCardOnboardingProps {
  onClose: () => void
}

export function CreditCardOnboarding({ onClose }: CreditCardOnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const isDragging = useRef(false)
  const [dragOffset, setDragOffset] = useState(0)

  const isLastSlide = currentSlide === slides.length - 1

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, slides.length - 1)))
    setDragOffset(0)
  }, [])

  const skipToLast = useCallback(() => {
    goToSlide(slides.length - 1)
  }, [goToSlide])

  const openExternalUrl = useCallback(() => {
    window.open(CREDIT_CARD_EXTERNAL_URL, "_blank", "noopener,noreferrer")
  }, [])

  /* ── Pointer handlers for swipe ── */
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    touchStartX.current = e.clientX
    touchDeltaX.current = 0
    setDragOffset(0)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    touchDeltaX.current = e.clientX - touchStartX.current
    setDragOffset(touchDeltaX.current)
  }

  const handlePointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const threshold = 50
    if (touchDeltaX.current < -threshold && currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1)
    } else if (touchDeltaX.current > threshold && currentSlide > 0) {
      goToSlide(currentSlide - 1)
    } else {
      setDragOffset(0)
    }
  }

  /* Transform: percentage-based so no pixel math needed */
  const translateX = -(currentSlide * 100) / slides.length
  const dragPx = isDragging.current ? dragOffset : 0
  const trackTransition = isDragging.current
    ? "none"
    : "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)"

  return (
    <div
      className="flex flex-col bg-black"
      style={{ height: "100dvh", width: "100vw" }}
    >
      {/* ── Top bar: Close + Skip ── */}
      <div
        className="relative z-10 flex items-center justify-between px-5 shrink-0"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 16px) + 12px)" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-colors active:bg-white/20"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {!isLastSlide && (
          <button
            type="button"
            onClick={skipToLast}
            className="text-[14px] font-medium text-white/50 transition-colors active:text-white/70 px-3 py-2"
          >
            Omitir
          </button>
        )}
      </div>

      {/* ── Carousel area ── */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-0 overflow-hidden touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="flex h-full"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(calc(${translateX}% + ${dragPx}px))`,
            transition: trackTransition,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{ width: `${100 / slides.length}%` }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-contain select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom controls: fixed height so dots never jump ── */}
      <div
        className="shrink-0 px-7 flex flex-col"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 16px)",
          paddingTop: "12px",
          height: "140px",
        }}
      >
        {/* Dot indicators — always at the same position */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Pantalla ${index + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: index === currentSlide ? 28 : 8,
                background:
                  index === currentSlide
                    ? "#00f1c7"
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* CTA area — fixed space, content fades in/out */}
        <div className="flex-1 flex flex-col justify-center">
          {isLastSlide ? (
            <>
              <button
                type="button"
                onClick={openExternalUrl}
                className="flex h-[46px] w-full items-center justify-center rounded-full text-[15px] font-bold tracking-[-0.01em] transition-transform active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, #00f1c7, #00f1c7cc)",
                  color: "#042226",
                  boxShadow: "0 8px 32px rgba(0,241,199,0.27)",
                }}
              >
                Adquiere la mía
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-1 w-full py-1 text-center text-[13px] text-white/40 transition-colors active:text-white/60"
              >
                Regresar al inicio
              </button>
            </>
          ) : (
            <div className="h-[46px]" />
          )}
        </div>
      </div>
    </div>
  )
}
