import { useState, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Fill } from "@/components/ui/fill"
import { useToast } from "@/components/ui/toast"
import { site, type ServiceKey } from "@/data/content"
import { cn } from "@/lib/utils"

const lookingFor = ["Freelance project", "Ongoing support", "Agency collaboration", "Part-time role", "Full-time role"] as const

const field =
  "w-full rounded-card border border-rule-dark bg-cream/5 px-3.5 py-3 text-base text-cream placeholder:text-quiet-dark/60 transition-[border-color,background-color] duration-200 focus:border-soft focus:bg-cream/[0.08] focus:outline-none"

type Errors = Partial<Record<"name" | "email" | "details", string>>

export function Contact({ service, setService, type, setType }: {
  service: ServiceKey
  setService: (s: ServiceKey) => void
  type: string
  setType: (t: string) => void
}) {
  const toast = useToast()
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Errors = {}
    if (!String(data.get("name") ?? "").trim()) next.name = "Enter your name"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get("email") ?? "").trim())) next.email = "Enter a valid email, like name@company.com"
    if (String(data.get("details") ?? "").trim().length < 10) next.details = "Add a sentence or two about your project"
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    setDone(true)
  }

  const clear = (k: keyof Errors) => errors[k] && setErrors((e) => ({ ...e, [k]: undefined }))

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      toast("Email copied")
    } catch {
      toast("Select the address to copy it")
    }
  }

  return (
    <section id="contact" className="dark section-pad border-t border-rule-dark bg-night text-cream" aria-labelledby="c-title">
      <div className="wrap grid gap-[clamp(32px,5vw,80px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <span className="mb-3.5 block text-[15px] font-medium text-soft">Let's work together</span>
          <h2 id="c-title" className="text-[clamp(40px,6vw,76px)] leading-none tracking-[-0.05em]">
            <span className="font-extralight">Need a designer</span>
            <br />
            who can also build it?
          </h2>
          <p className="mt-7 max-w-[56ch] text-[clamp(18px,1.9vw,20px)] leading-relaxed text-quiet-dark">
            Tell me what you're building and where you'd like to take it. I reply within <Fill dark text={site.replyTime} />.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <span className="select-all break-all text-lg tracking-[-0.01em]">{site.email}</span>
            <Button tone="dark" variant="ghost" size="sm" onClick={copyEmail}>
              Copy email
            </Button>
          </div>
        </div>

        <form noValidate onSubmit={onSubmit} className="grid gap-[18px] sm:grid-cols-2">
          <Field id="f-name" label="Name" error={errors.name}>
            <input id="f-name" name="name" type="text" autoComplete="name" placeholder="Maria Santos" aria-invalid={!!errors.name} onInput={() => clear("name")} className={field} />
          </Field>
          <Field id="f-email" label="Email" error={errors.email}>
            <input id="f-email" name="email" type="email" autoComplete="email" placeholder="maria@company.com" aria-invalid={!!errors.email} onInput={() => clear("email")} className={field} />
          </Field>
          <Field id="f-site" label="Company or website (optional)" full>
            <input id="f-site" name="site" type="text" placeholder="company.com" className={field} />
          </Field>

          <fieldset className="min-w-0 sm:col-span-2">
            <legend className="text-sm text-quiet-dark">I'm looking for</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {lookingFor.map((t, i) => (
                <label key={t} className="relative">
                  <input type="radio" name="type" id={`t${i}`} value={t} checked={type === t} onChange={() => setType(t)} className="peer absolute opacity-0" />
                  <span
                    className={cn(
                      "block cursor-pointer rounded-full border border-rule-dark px-3.5 py-2 text-[14.5px] transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97]",
                      "peer-checked:border-soft peer-checked:bg-soft peer-checked:text-night peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-soft"
                    )}
                  >
                    {t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <Field id="f-service" label="Service needed">
            <select id="f-service" name="service" value={service} onChange={(e) => setService(e.target.value as ServiceKey)} className={cn(field, "appearance-none [&>option]:text-ink")}>
              <option value="design">Website design and UI/UX</option>
              <option value="wordpress">WordPress development</option>
              <option value="frontend">Frontend development</option>
              <option value="care">Website care</option>
              <option value="agency">Agency support</option>
            </select>
          </Field>
          <Field id="f-budget" label="Budget (optional)">
            <select id="f-budget" name="budget" defaultValue="" className={cn(field, "appearance-none [&>option]:text-ink")}>
              <option value="">Choose a range</option>
              <option>Under $1,000</option>
              <option>$1,000 to $3,000</option>
              <option>$3,000 to $6,000</option>
              <option>$6,000+</option>
            </select>
          </Field>
          <Field id="f-details" label="Project details" error={errors.details} full>
            <textarea
              id="f-details"
              name="details"
              placeholder="A 5-page WordPress site for our fencing company, with a quote form."
              aria-invalid={!!errors.details}
              onInput={() => clear("details")}
              className={cn(field, "min-h-[130px] resize-y")}
            />
          </Field>
          <Field id="f-time" label="Timeline (optional)">
            <select id="f-time" name="timeline" defaultValue="" className={cn(field, "appearance-none [&>option]:text-ink")}>
              <option value="">Choose a timeline</option>
              <option>As soon as possible</option>
              <option>Within a month</option>
              <option>1 to 3 months</option>
              <option>Flexible</option>
            </select>
          </Field>
          <div className="flex flex-col justify-end">
            <Button type="submit" tone="dark">
              Send project inquiry
            </Button>
          </div>
          <p className="text-sm text-quiet-dark sm:col-span-2">Design preview: this form isn't connected yet. Connect it to a form service or your WordPress backend.</p>
          {done && (
            <div className="rounded-card border border-soft/30 bg-soft/[0.12] p-4 text-[15px] sm:col-span-2">
              Your inquiry is ready. In this preview nothing is sent; once the form is connected, it will go straight to your inbox.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({ id, label, error, full, children }: { id: string; label: string; error?: string; full?: boolean; children: ReactNode }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", full && "sm:col-span-2")}>
      <label htmlFor={id} className="text-sm text-quiet-dark">
        {label}
      </label>
      {children}
      {error && <span className="text-[13.5px] text-error-on-dark">{error}</span>}
    </div>
  )
}
