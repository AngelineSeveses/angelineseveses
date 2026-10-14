/**
 * Read a design token defined in index.css (the @theme block) at runtime.
 * Use this only where CSS can't reach, such as canvas drawing; everywhere else use Tailwind classes.
 */
export function token(name: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!value) throw new Error(`Design token ${name} is not defined in index.css`)
  return value
}
