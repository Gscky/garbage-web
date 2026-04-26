'use client'

import { createContext, useContext, useState } from 'react'

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
  const [activeTab, setActiveTab] = useState<TabId>('inicio')
  const [prefill, setPrefill] = useState<FormPrefill>({ nombre: '', email: '' })

  const handleSetTab = (tab: TabId) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab: handleSetTab, prefill, setPrefill }}>
      {children}
    </TabContext.Provider>
  )
}

export function useTab(): TabContextValue {
  const ctx = useContext(TabContext)
  if (!ctx) throw new Error('useTab must be used within TabProvider')
  return ctx
}
