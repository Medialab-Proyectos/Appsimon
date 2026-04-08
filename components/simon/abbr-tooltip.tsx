"use client"

import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface AbbrTooltipProps {
  term: string
  desc: string
  className?: string
  children?: React.ReactNode
}

/**
 * Acronym with tooltip. Works on tap (mobile) and hover/focus (desktop).
 * Renders a semantic <abbr title> as trigger so assistive tech gets the full term.
 */
export function AbbrTooltip({ term, desc, className, children }: AbbrTooltipProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <abbr
          title={desc}
          tabIndex={0}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onClick={(e) => {
            e.stopPropagation()
            setOpen((v) => !v)
          }}
          className={
            "cursor-help no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#00be9c] rounded-sm " +
            (className ?? "")
          }
        >
          {children ?? term}
        </abbr>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={6}
        className="w-auto max-w-[240px] p-2 text-[12px] leading-snug text-[#1f1f1f]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <p className="font-semibold text-[11px] text-[#4f4f4f] uppercase tracking-wide">
          {term}
        </p>
        <p>{desc}</p>
      </PopoverContent>
    </Popover>
  )
}
