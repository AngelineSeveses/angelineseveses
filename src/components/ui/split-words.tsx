import { Children, Fragment, cloneElement, isValidElement, useLayoutEffect, useRef, type ElementType, type ReactElement, type ReactNode } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

/** Plain text of a node tree, used as the accessible name of split headings. */
export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ""
}

/** Wraps every word in an inline-block span, keeping styled wrappers (like the light/semibold pair) intact. */
function split(node: ReactNode, key = "w"): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, i) =>
      /^\s+$/.test(part) || part === "" ? (
        <Fragment key={`${key}-${i}`}>{part}</Fragment>
      ) : (
        <span key={`${key}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span data-word className="inline-block will-change-transform">
            {part}
          </span>
        </span>
      )
    )
  }
  if (Array.isArray(node)) return node.map((n, i) => <Fragment key={`${key}-${i}`}>{split(n, `${key}-${i}`)}</Fragment>)
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return cloneElement(node as ReactElement<{ children?: ReactNode }>, undefined, Children.map(node.props.children, (c, i) => split(c, `${key}-${i}`)))
  }
  return node
}

type Props = {
  as?: ElementType
  children: ReactNode
  className?: string
  id?: string
  /** "scroll" reveals when the heading enters the viewport; "load" plays immediately (hero). */
  trigger?: "scroll" | "load"
  delay?: number
}

/**
 * Heading that reveals word by word. The full text stays available to assistive tech (sr-only),
 * the split copy is aria-hidden, and words rest in their final position if JavaScript or motion is off.
 */
export function SplitWords({ as: Tag = "h2", children, className, id, trigger = "scroll", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const words = el.querySelectorAll("[data-word]")
    const ctx = gsap.context(() => {
      gsap.from(words, {
        yPercent: 105,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.045,
        delay,
        ...(trigger === "scroll" ? { scrollTrigger: { trigger: el, start: "top 86%", once: true } } : {}),
      })
    }, el)
    return () => ctx.revert()
  }, [trigger, delay])

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{textOf(children)}</span>
      <span aria-hidden="true">{split(children)}</span>
    </Tag>
  )
}
