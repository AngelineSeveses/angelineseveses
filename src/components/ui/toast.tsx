import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const ToastContext = createContext<(message: string) => void>(() => {})

export const useToast = () => useContext(ToastContext)

/** One toast at a time. Rises from the bottom and leaves the same way; CSS transitions keep it interruptible. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback((m: string) => {
    setMessage(m)
    setOpen(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), 2000)
  }, [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed bottom-[calc(24px+env(safe-area-inset-bottom,0px))] left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink px-[18px] py-2.5 text-sm text-cream",
          "transition-[transform,opacity] duration-[260ms] ease-drawer motion-reduce:transition-opacity",
          open ? "translate-y-0 opacity-100" : "translate-y-[160%] opacity-0 motion-reduce:translate-y-0"
        )}
      >
        {message}
      </div>
    </ToastContext.Provider>
  )
}
