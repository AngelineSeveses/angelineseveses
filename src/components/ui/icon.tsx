import { Icon as IconifyIcon } from "@iconify/react"
import { cn } from "@/lib/utils"

/**
 * Solar icons (Iconify, CC BY 4.0, by 480 Design), bundled offline so nothing loads at runtime.
 * Generated from @iconify-json/solar; add a name here to use a new icon.
 */
const icons = {
  drag: { body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"><path d=\"M18 8L6 8M10.125 12L6 8L10.125 4\"/><path d=\"M6 16L18 16M13.875 20L18 16L13.875 12\"/></g>", width: 24, height: 24 },
  arrowDown: { body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M6 6L18 18M9 18L18 18L18 9\"/>", width: 24, height: 24 },
  arrow: { body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M4 12H20M14 18L20 12L14 6\"/>", width: 24, height: 24 },
  arrowUpRight: { body: "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\" d=\"M6 18L18 6M18 15V6H9\"/>", width: 24, height: 24 },
  cv: { body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path d=\"M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z\"/><path d=\"M8 12H16\"/><path d=\"M8 8H16\"/><path d=\"M8 16H13\"/></g>", width: 24, height: 24 },
  check: { body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path stroke-linejoin=\"round\" d=\"M8.5 12.5L10.5 14.5L15.5 9.5\"/></g>", width: 24, height: 24 },
  plus: { body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path d=\"M4 12L20 12\"/><path d=\"M12.0204 4L12.0205 20.0003\"/></g>", width: 24, height: 24 },
  menu: { body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path d=\"M20 7L4 7\"/><path d=\"M20 12L4 12\"/><path d=\"M20 17L4 17\"/></g>", width: 24, height: 24 },
  close: { body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path d=\"M19.0068 5L5.00684 19\"/><path d=\"M19 19L5 5\"/></g>", width: 24, height: 24 },
  mail: { body: "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"1.5\"><path d=\"M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z\"/><path d=\"M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8\"/></g>", width: 24, height: 24 },
} as const

export type IconName = keyof typeof icons

export function Icon({ name, className, label }: { name: IconName; className?: string; label?: string }) {
  return (
    <IconifyIcon
      icon={icons[name]}
      className={cn("inline-block flex-none", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  )
}
