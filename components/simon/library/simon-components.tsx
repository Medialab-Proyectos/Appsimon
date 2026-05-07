"use client"

import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

export type SimonTone = "default" | "accent" | "muted" | "danger" | "success"
export type SimonSurfaceVariant = "neo" | "flat" | "tag" | "outline"

const toneColor: Record<SimonTone, string> = {
  default: "var(--simon-text)",
  accent: "var(--simon-accent)",
  muted: "var(--simon-divider)",
  danger: "var(--simon-restriction)",
  success: "var(--simon-free)",
}

function getSurfaceStyle(variant: SimonSurfaceVariant, style?: CSSProperties): CSSProperties {
  const variants: Record<SimonSurfaceVariant, CSSProperties> = {
    neo: {
      background: "var(--neo-bg)",
      boxShadow: "var(--neo-shadow)",
    },
    flat: {
      background: "var(--simon-bg)",
    },
    tag: {
      background: "var(--simon-tag-bg)",
      border: "1px solid var(--simon-tag-border)",
    },
    outline: {
      background: "var(--simon-bg)",
      border: "0.5px solid var(--simon-card-border)",
    },
  }

  return { ...variants[variant], ...style }
}

export interface SimonSurfaceProps {
  as?: "div" | "button"
  variant?: SimonSurfaceVariant
  className?: string
  style?: CSSProperties
  children: ReactNode
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  "aria-label"?: string
}

export function SimonSurface({
  as = "div",
  variant = "neo",
  className,
  style,
  children,
  type = "button",
  onClick,
  "aria-label": ariaLabel,
}: SimonSurfaceProps) {
  const Comp = as

  return (
    <Comp
      type={as === "button" ? type : undefined}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn("rounded-[12px]", className)}
      style={getSurfaceStyle(variant, style)}
    >
      {children}
    </Comp>
  )
}

export interface SimonIconButtonProps {
  label: string
  icon: ReactNode
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export function SimonIconButton({
  label,
  icon,
  className,
  style,
  onClick,
}: SimonIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn("flex h-11 w-11 items-center justify-center rounded-full", className)}
      style={style}
    >
      {icon}
    </button>
  )
}

export interface SimonActionTileProps {
  label: string
  icon: ReactNode
  description?: string
  disabled?: boolean
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

export function SimonActionTile({
  label,
  icon,
  description,
  disabled,
  className,
  style,
  onClick,
}: SimonActionTileProps) {
  return (
    <SimonSurface
      as="button"
      aria-label={description ? `${label}. ${description}` : label}
      onClick={disabled ? undefined : onClick}
      className={cn(
        "flex flex-col items-center justify-center transition-opacity active:opacity-80 disabled:opacity-50",
        className,
      )}
      style={style}
    >
      <span className="shrink-0">{icon}</span>
      <span
        className="text-center font-medium leading-tight"
        style={{ fontSize: "clamp(10px, 1.5vh, 12px)", color: "var(--simon-text)" }}
      >
        {label}
      </span>
    </SimonSurface>
  )
}

export interface SimonShortcutGridProps {
  items: SimonActionTileProps[]
  columns?: 2 | 3 | 4
  className?: string
}

export function SimonShortcutGrid({
  items,
  columns = 3,
  className,
}: SimonShortcutGridProps) {
  return (
    <div
      className={cn("shrink-0 px-6", className)}
      style={{
        paddingTop: "clamp(4px, 1vh, 12px)",
        paddingBottom: "clamp(2px, 0.6vh, 8px)",
      }}
    >
      <div
        className={cn(
          "grid",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4",
        )}
        style={{ gap: "clamp(6px, 1.2vh, 12px)" }}
      >
        {items.map((item) => (
          <SimonActionTile
            key={item.label}
            {...item}
            style={{
              height: "clamp(50px, 8.5vh, 88px)",
              gap: "clamp(2px, 0.5vh, 8px)",
              padding: "clamp(4px, 0.6vh, 8px)",
              ...item.style,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export interface SimonTopBarAction {
  label: string
  icon: ReactNode
  onClick?: () => void
}

export interface SimonLogoAsset {
  src: string
  alt?: string
  className?: string
}

export interface SimonTopBarProps {
  eyebrow: string
  title: string
  logo?: SimonLogoAsset[]
  actions?: SimonTopBarAction[]
  cta?: {
    label: string
    onClick?: () => void
  }
  trailing?: ReactNode
  className?: string
}

export function SimonTopBar({
  eyebrow,
  title,
  logo,
  actions = [],
  cta,
  trailing,
  className,
}: SimonTopBarProps) {
  return (
    <header
      className={cn("shrink-0", className)}
      style={{ paddingTop: "env(safe-area-inset-top)", background: "var(--simon-bg)" }}
    >
      <div className="flex items-center justify-between px-6 pb-1 pt-3">
        <div>
          <p className="text-[15px] leading-snug" style={{ fontWeight: 500, color: "var(--simon-text)" }}>
            {eyebrow}
          </p>
          <p className="text-[18px] leading-snug" style={{ fontWeight: 700, color: "var(--simon-text-strong)" }}>
            {title}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {trailing}
          {actions.map((action) => (
            <SimonIconButton key={action.label} {...action} />
          ))}
        </div>
      </div>

      {(logo || cta) && (
        <div className="flex items-center justify-between px-6 pb-3 pt-2">
          {logo ? (
            <div className="relative h-9 w-[89px]">
              {logo.map((asset) => (
                <img
                  key={asset.src}
                  src={asset.src}
                  alt={asset.alt ?? ""}
                  className={cn("absolute left-0 w-full object-contain object-left", asset.className)}
                />
              ))}
            </div>
          ) : (
            <span />
          )}
          {cta && (
            <SimonSurface
              as="button"
              onClick={cta.onClick}
              className="h-8 whitespace-nowrap px-4 text-[12px] font-medium"
              style={{ color: "var(--simon-accent)" }}
            >
              {cta.label}
            </SimonSurface>
          )}
        </div>
      )}
    </header>
  )
}

export interface SimonBottomNavItem {
  id: string
  label: string
  icon?: ReactNode
  activeAsset?: string
  active?: boolean
  title?: string
  onClick?: () => void
}

export interface SimonBottomNavigationProps {
  items: SimonBottomNavItem[]
  className?: string
}

export function SimonBottomNavigation({
  items,
  className,
}: SimonBottomNavigationProps) {
  return (
    <div
      className={cn("pointer-events-none absolute left-0 right-0 flex justify-center", className)}
      style={{ bottom: "max(clamp(12px, 3.5vh, 28px), calc(clamp(12px, 3.5vh, 28px) + env(safe-area-inset-bottom)))" }}
    >
      <SimonSurface
        className="pointer-events-auto flex h-14 overflow-visible"
        style={{ width: "calc(100% - 48px)" }}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.title ?? item.label}
            onClick={item.onClick}
            className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[10px] transition-all duration-150 active:scale-90 active:bg-black/[0.06]"
          >
            {item.activeAsset ? (
              <span
                className="absolute left-1/2 h-[50px] w-[50px] -translate-x-1/2"
                style={{ bottom: "14px" }}
              >
                <span className="absolute" style={{ inset: "-16.05% -38.97% -38.97% -16.05%" }}>
                  <img
                    src={item.activeAsset}
                    alt={item.label}
                    className="block h-full max-w-none w-full"
                    draggable={false}
                  />
                </span>
              </span>
            ) : (
              <>
                {item.icon && <span className="h-5 w-5 shrink-0">{item.icon}</span>}
                <span
                  className="w-full truncate text-center text-[11px] font-bold leading-none"
                  title={item.title}
                  style={{ color: toneColor.default }}
                >
                  {item.label}
                </span>
              </>
            )}
          </button>
        ))}
      </SimonSurface>
    </div>
  )
}

type SimonRegistryProps =
  | ({ component: "top-bar" } & SimonTopBarProps)
  | ({ component: "shortcut-grid" } & SimonShortcutGridProps)
  | ({ component: "bottom-navigation" } & SimonBottomNavigationProps)

export function SimonComponent(props: SimonRegistryProps) {
  switch (props.component) {
    case "top-bar": {
      const { component: _component, ...componentProps } = props
      return <SimonTopBar {...componentProps} />
    }
    case "shortcut-grid": {
      const { component: _component, ...componentProps } = props
      return <SimonShortcutGrid {...componentProps} />
    }
    case "bottom-navigation": {
      const { component: _component, ...componentProps } = props
      return <SimonBottomNavigation {...componentProps} />
    }
  }
}
