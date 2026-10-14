import { createContext, useContext, useState, type ReactNode } from "react"

/** Who the visitor is: a business looking for a website, or an employer hiring. The hero adapts. */
export type Audience = "business" | "hiring"

const AudienceContext = createContext<{ audience: Audience; setAudience: (a: Audience) => void }>({
  audience: "business",
  setAudience: () => {},
})

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>("business")
  return <AudienceContext.Provider value={{ audience, setAudience }}>{children}</AudienceContext.Provider>
}

export const useAudience = () => useContext(AudienceContext)
