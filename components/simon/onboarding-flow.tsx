"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronRight, CreditCard, WalletCards, X } from "lucide-react"

export type OnboardingType = "mis-creditos" | "tarjeta-credito"

interface OnboardingFlowProps {
  type: OnboardingType
  onClose: () => void
}

interface OnboardingStep {
  eyebrow: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  accent: string
}

const contentByType: Record<
  OnboardingType,
  {
    cta: string
    icon: typeof WalletCards
    steps: OnboardingStep[]
  }
> = {
  "mis-creditos": {
    cta: "Ver mis créditos",
    icon: WalletCards,
    steps: [
      {
        eyebrow: "Esto es Simon",
        title: "Tu cupo listo para convertir interés en compra",
        description:
          "Descubre todas las capacidades de crédito que Simon pone a tu alcance. Todo en un solo lugar, sin volver a empezar.",
        imageSrc: "/onboarding/mc-step1.png",
        imageAlt: "Grid de capacidades de crédito disponibles en Simon",
        accent: "#00f1c7",
      },
      {
        eyebrow: "Esto cambia tu día",
        title: "Conoce tu beneficio antes de tomar una decisión",
        description:
          "Simon te muestra tu cupo disponible, el monto que puedes usar y el siguiente paso para comprar con menos fricción.",
        imageSrc: "/onboarding/mc-step2.png",
        imageAlt: "Usuario revisando cupo aprobado con expresión de satisfacción",
        accent: "#52d9ff",
      },
      {
        eyebrow: "Empieza ahora",
        title: "Activa tu compra desde Mis créditos",
        description:
          "Tu crédito está aprobado. Solo falta un paso para convertir ese cupo en una compra real.",
        imageSrc: "/onboarding/mc-step3.png",
        imageAlt: "Badge de crédito aprobado con marca Simon",
        accent: "#00f1c7",
      },
    ],
  },
  "tarjeta-credito": {
    cta: "Ver cuotas",
    icon: CreditCard,
    steps: [
      {
        eyebrow: "Esto es Simon",
        title: "Explora una compra financiada sin sentirte perdido",
        description:
          "Conoce todo lo que puedes hacer con tu tarjeta de crédito Simon. Cuotas, beneficios y más — todo visual y claro.",
        imageSrc: "/onboarding/tc-step1.png",
        imageAlt: "Grid de capacidades de tarjeta de crédito en Simon",
        accent: "#66b7ff",
      },
      {
        eyebrow: "Esto cambia tu día",
        title: "Compara cuotas y entiende qué opción te conviene",
        description:
          "Antes de pedir datos, Simon te ayuda a visualizar cuotas, impacto mensual y la mejor decisión para ti.",
        imageSrc: "/onboarding/tc-step2.png",
        imageAlt: "Persona comparando opciones de cuotas en su celular",
        accent: "#00f1c7",
      },
      {
        eyebrow: "Empieza ahora",
        title: "Entra a T. crédito con una acción directa",
        description:
          "Todo listo. Selecciona tus cuotas y continúa tu compra con total confianza.",
        imageSrc: "/onboarding/tc-step3.png",
        imageAlt: "Checkmark de aprobación y tarjeta Simon",
        accent: "#66b7ff",
      },
    ],
  },
}

export function OnboardingFlow({ type, onClose }: OnboardingFlowProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setActiveStep(0)
  }, [type])

  const config = contentByType[type]
  const currentStep = config.steps[activeStep]
  const isLastStep = activeStep === config.steps.length - 1

  const animateStep = useCallback((newStep: number, dir: "next" | "prev") => {
    setDirection(dir)
    setIsAnimating(true)
    setTimeout(() => {
      setActiveStep(newStep)
      setIsAnimating(false)
    }, 200)
  }, [])

  const handleNext = () => {
    if (isLastStep) {
      onClose()
      return
    }
    animateStep(activeStep + 1, "next")
  }

  const handleDotClick = (index: number) => {
    if (index === activeStep) return
    animateStep(index, index > activeStep ? "next" : "prev")
  }

  return (
    <div className="absolute inset-0 z-30">
      {/* Full-screen container */}
      <div
        className="relative flex h-full w-full flex-col overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #020c10 0%, #06252b 50%, #020c10 100%)",
        }}
      >
        {/* ── Background glow ── */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute h-[400px] w-[400px] rounded-full opacity-20 blur-[130px]"
            style={{
              background: currentStep.accent,
              left: "50%",
              top: "30%",
              transform: "translate(-50%, -50%)",
              transition: "background 0.5s ease",
            }}
          />
        </div>

        {/* ── Close button (top-right) ── */}
        <div
          className="relative z-20 flex justify-end px-5"
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
        </div>

        {/* ── Image area (fills top portion) ── */}
        <div
          className="relative z-10 flex flex-1 items-center justify-center px-8"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? direction === "next"
                ? "translateX(40px)"
                : "translateX(-40px)"
              : "translateX(0)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <img
            src={currentStep.imageSrc}
            alt={currentStep.imageAlt}
            className="max-h-full w-full max-w-[320px] rounded-[24px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </div>

        {/* ── Bottom content (text + dots + CTA) ── */}
        <div
          className="relative z-20 px-7"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 24px)",
          }}
        >
          {/* Eyebrow + Title + Description */}
          <div
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "translateY(12px)" : "translateY(0)",
              transition: "opacity 0.2s ease, transform 0.25s ease",
            }}
          >
            <p
              className="text-[12px] font-bold uppercase tracking-[0.25em]"
              style={{ color: currentStep.accent }}
            >
              {currentStep.eyebrow}
            </p>
            <h2 className="mt-2 text-[26px] font-black leading-[1.1] tracking-[-0.03em] text-white">
              {currentStep.title}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.5] text-white/60">
              {currentStep.description}
            </p>
          </div>

          {/* Step dots */}
          <div className="mt-6 flex items-center gap-2">
            {config.steps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                aria-label={`Paso ${index + 1}`}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: index === activeStep ? 32 : 10,
                  background:
                    index === activeStep
                      ? currentStep.accent
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>

          {/* CTA button */}
          <button
            type="button"
            onClick={handleNext}
            className="mt-6 flex h-[56px] w-full items-center justify-center gap-2 rounded-full text-[16px] font-bold tracking-[-0.01em] transition-transform active:scale-[0.97]"
            style={{
              background: `linear-gradient(135deg, ${currentStep.accent}, ${currentStep.accent}cc)`,
              color: "#042226",
              boxShadow: `0 8px 32px ${currentStep.accent}44`,
            }}
          >
            {isLastStep ? config.cta : "Continuar"}
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Skip link (only on non-last steps) */}
          {!isLastStep && (
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full py-2 text-center text-[14px] text-white/40 transition-colors active:text-white/60"
            >
              Omitir
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
