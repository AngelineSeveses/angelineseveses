import { useEffect } from "react"
import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import { ToastProvider } from "@/components/ui/toast"
import { DragCursor } from "@/components/ui/drag-cursor"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { HomePage } from "@/pages/home"
import { ProjectsPage } from "@/pages/projects"
import { getLenis, ScrollTrigger, useSmoothScroll } from "@/lib/motion"

/**
 * On a new page, start at the top and re-measure scroll animations.
 * With a hash (e.g. /#contact) the home page does both itself, then scrolls to the section.
 */
function useRouteScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    getLenis()?.resize()
    getLenis()?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => window.clearTimeout(t)
    // Only page changes matter here, not hash changes within a page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}

function Layout() {
  useRouteScroll()
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <DragCursor />
    </>
  )
}

export default function App() {
  useSmoothScroll()
  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </ToastProvider>
  )
}
