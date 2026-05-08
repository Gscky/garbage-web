'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export type TabId =
  | 'inicio'
  | 'productos'
  | 'personaliza'
  | 'cotizar'
  | 'faq'
  | 'contacto'

export const TABS: { id: TabId; label: string }[] = [
  { id: 'inicio',      label: 'Inicio' },
  { id: 'productos',   label: 'Productos' },
  { id: 'personaliza', label: 'Personaliza' },
  { id: 'cotizar',     label: 'Cotizar' },
  { id: 'faq',         label: 'FAQ' },
  { id: 'contacto',    label: 'Contacto' },
]

const PATH_TO_TAB: Record<string, TabId> = {
  '/':            'inicio',
  '/productos':   'productos',
  '/personaliza': 'personaliza',
  '/cotizar':     'cotizar',
  '/faq':         'faq',
  '/contacto':    'contacto',
}

const TAB_TO_PATH: Record<TabId, string> = {
  inicio:      '/',
  productos:   '/productos',
  personaliza: '/personaliza',
  cotizar:     '/cotizar',
  faq:         '/faq',
  contacto:    '/contacto',
}

export interface FormPrefill {
  nombre: string
  email: string
}

interface TabContextValue {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
  prefill: FormPrefill
  setPrefill: (data: FormPrefill) => void
}

const TabContext = createContext<TabContextValue | null>(null)

export function TabProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [prefill, setPrefillState] = useState<FormPrefill>({ nombre: '', email: '' })

  const activeTab: TabId = PATH_TO_TAB[pathname] ?? 'inicio'

  const setActiveTab = useCallback((tab: TabId) => {
    router.push(TAB_TO_PATH[tab])
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [router])

  const setPrefill = useCallback((data: FormPrefill) => {
    setPrefillState(data)
  }, [])

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, prefill, setPrefill }}>
      {children}
    </TabContext.Provider>
  )
}

export function useTab(): TabContextValue {
  const ctx = useContext(TabContext)
  if (!ctx) throw new Error('useTab must be used within TabProvider')
  return ctx
}
