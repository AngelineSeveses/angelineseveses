import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "ghost" | "soft"
type Size = "sm" | "md" | "lg"
type Tone = "light" | "dark"

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full border font-medium no-underline cursor-pointer " +
  "transition-[transform,background-color,border-color,color] duration-[160ms] ease-out-strong active:scale-[0.97]"

const sizes: Record<Size, string> = {
  sm: "h-10 px-[18px] text-[14.5px]",
  md: "h-[50px] px-[26px] text-[15.5px]",
  lg: "h-14 px-8 text-[16.5px]",
}

const variants: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-violet text-paper border-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-violet-hover",
    ghost: "bg-transparent text-ink border-ink/25 [@media(hover:hover)_and_(pointer:fine)]:hover:border-ink",
    soft: "bg-lavender text-ink border-ink [@media(hover:hover)_and_(pointer:fine)]:hover:bg-lavender-deep",
  },
  dark: {
    primary: "bg-soft text-night border-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-soft-hover",
    ghost: "bg-transparent text-cream border-cream/30 [@media(hover:hover)_and_(pointer:fine)]:hover:border-cream",
    soft: "bg-lavender text-ink border-transparent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-cream",
  },
}

type Common = { variant?: Variant; size?: Size; tone?: Tone; className?: string }

export function buttonClass({ variant = "primary", size = "md", tone = "light", className }: Common) {
  return cn(base, sizes[size], variants[tone][variant], className)
}

export function Button({ variant, size, tone, className, ...props }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={buttonClass({ variant, size, tone, className })} {...props} />
}

export function ButtonLink({ variant, size, tone, className, ...props }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClass({ variant, size, tone, className })} {...props} />
}
