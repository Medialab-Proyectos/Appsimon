"use client"

import * as React from "react"
import { Info } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface AbbrTooltipProps {
  term: string
  desc: string
  className?: string
  children?: React.ReactNode
  /** Show a small info icon next to the term as a visual affordance. Default: true */
  showIcon?: boolean
}

/**
 * Acronym with tooltip.
 * - Desktop (hover pointer): opens on hover/focus.
 * - Mobile (coarse pointer): opens on tap, closes on tap outside or after 4s.
 *   Stops pointer/touch propagation so the carousel swipe doesn't steal the gesture.
 */
export function AbbrTooltip({ term, desc, className, children, showIcon = true }: AbbrTooltipProps) {
  const [open, setOpen] = React.useState(false)
  const [isTouch, setIsTouch] = React.useState(false)
  const closeTimer = React.useRef<number | null>(null)

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)")
    const update = () => setIsTouch(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  React.useEffect(() => {
    if (open && isTouch) {
      closeTimer.current = window.setTimeout(() => setOpen(false), 4000)
      return () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current)
      }
    }
  }, [open, isTouch])

  const stop = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <abbr
          title={desc}
          tabIndex={0}
          aria-label={`${term}. ${desc}`}
          onPointerDown={stop}
          onPointerUp={stop}
          onTouchStart={stop}
          onMouseEnter={isTouch ? undefined : () => setOpen(true)}
          onMouseLeave={isTouch ? undefined : () => setOpen(false)}
          onFocus={isTouch ? undefined : () => setOpen(true)}
          onBlur={isTouch ? undefined : () => setOpen(false)}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setOpen((v) => !v)
          }}
          className={
            "inline-flex items-center cursor-help no-underline outline-none " +
            "focus-visible:ring-2 focus-visible:ring-[#00be9c] rounded " +
            "px-1 py-0.5 -mx-1 -my-0.5 " + // enlarged hit area without visual change
            (className ?? "")
          }
          style={{ textDecoration: "none", WebkitTapHighlightColor: "rgba(0,241,199,0.2)" }}
        >
          {children ?? term}
        </abbr>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={8}
        collisionPadding={12}
        className="w-auto max-w-[260px] p-3 text-[13px] leading-snug shadow-lg [color:var(--simon-text-strong)] [background:var(--simon-bg)]"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={() => setOpen(false)}
      >
        <p className="font-semibold text-[11px] uppercase tracking-wide mb-0.5 [color:var(--simon-tag-text)]">
          {term}
        </p>
        <p>{desc}</p>
      </PopoverContent>
    </Popover>
  )
}
