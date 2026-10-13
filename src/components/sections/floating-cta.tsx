import { useEffect } from "react"
import { stagger, useAnimate, useInView, useReducedMotion } from "motion/react"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { ButtonLink } from "@/components/ui/button"
import { floatingShots } from "@/data/content"
import { cn } from "@/lib/utils"

/**
 * Contact CTA with project screenshots floating around it.
 * Pointer-tracking parallax is decorative, so it lives only on this marketing moment.
 * Images are visible at rest; the stagger plays once, only when the section scrolls in from below.
 */
export function FloatingCta() {
  const [scope, animate] = useAnimate()
  const inView = useInView(scope, { once: true, amount: 0.25 })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView || reduce || !scope.current) return
    if (scope.current.getBoundingClientRect().top < window.innerHeight * 0.4) return
    animate("img", { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.5, delay: stagger(0.07), ease: [0.23, 1, 0.32, 1] })
  }, [inView, reduce, animate, scope])

  return (
    <section
      ref={scope}
      id="cta"
      aria-labelledby="cta-title"
      className="dark relative isolate grid min-h-[clamp(560px,82vh,760px)] place-items-center overflow-hidden bg-night py-[clamp(96px,12vw,160px)] text-cream"
    >
      <Floating sensitivity={-1} className="pointer-events-none z-0 overflow-hidden">
        {floatingShots.map((s, i) => (
          <FloatingElement key={i} depth={s.depth} className={s.className}>
            <img
              src={s.src}
              alt=""
              loading="lazy"
              className={cn(
                "pointer-events-auto block h-full w-full rounded-md border border-cream/[0.12] object-cover object-top",
                "transition-transform duration-200 ease-out-strong [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105"
              )}
            />
          </FloatingElement>
        ))}
      </Floating>

      <div className="relative z-[2] flex max-w-[880px] flex-col items-center gap-[22px] p-[clamp(24px,4vw,40px)] text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[18%] -inset-y-[16%] -z-10 bg-[radial-gradient(closest-side,rgb(31_24_40/0.94),rgb(31_24_40/0.78)_55%,rgb(31_24_40/0))]"
        />
        <h2 id="cta-title" className="text-[clamp(44px,7.4vw,96px)] font-semibold leading-[0.98] tracking-[-0.05em]">
          <span className="block font-extralight">Your next website</span>
          starts here.
        </h2>
        <p className="max-w-[44ch] text-[clamp(17px,1.8vw,20px)] text-quiet-dark">
          Need a designer who understands development, or a developer who understands design? Let's turn your idea into a website that works.
        </p>
        <ButtonLink href="#contact" tone="dark" size="lg">
          Contact us
        </ButtonLink>
      </div>
    </section>
  )
}
