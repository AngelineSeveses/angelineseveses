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
      className="dark relative isolate z-[1] grid min-h-[clamp(560px,82vh,760px)] place-items-center overflow-hidden rounded-t-sheet bg-plum py-[clamp(96px,12vw,160px)] text-cream"
    >
      <Floating sensitivity={-1} className="pointer-events-none z-0 overflow-hidden">
        {floatingShots.map((s, i) => (
          <FloatingElement key={i} depth={s.depth} className={s.className}>
            <img
              src={s.src}
              alt=""
              loading="lazy"
              className={cn(
                "pointer-events-auto block h-full w-full rounded-[8px] border border-cream/[0.12] object-cover object-top",
                "transition-transform duration-200 ease-out-strong [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105"
              )}
            />
          </FloatingElement>
        ))}
      </Floating>

      <div className="relative z-[2] flex max-w-[880px] flex-col items-center gap-[22px] p-[clamp(24px,4vw,40px)] text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[18%] -inset-y-[16%] -z-10 bg-[radial-gradient(closest-side,rgb(42_24_56/0.95),rgb(42_24_56/0.8)_55%,rgb(42_24_56/0))]"
        />
        <h2 id="cta-title" className="serif-head text-[clamp(48px,7.4vw,104px)] leading-[0.98]">
          <span className="block font-extralight">Your next website</span>
          <span className="font-semibold">starts here.</span>
        </h2>
        <p className="max-w-[44ch] text-[clamp(17px,1.8vw,20px)] text-quiet-dark">
          Need a designer who understands development, or a developer who understands design? Let's turn your idea into a website that works.
        </p>
        <ButtonLink href="#contact" tone="dark" variant="soft" size="lg">
          Contact us
        </ButtonLink>
      </div>
    </section>
  )
}
