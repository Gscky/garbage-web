'use client'

import { createContext, useContext, useState } from 'react'

interface Color {
  nombre: string
  hex: string
}

interface ColorContextValue {
  selectedColor: Color | null
  setSelectedColor: (color: Color | null) => void
  COLORES_GARBAGE: Color[]
}

const ColorContext = createContext<ColorContextValue | null>(null)

export const COLORES_GARBAGE: Color[] = [
  { nombre: 'Lila / Morado',    hex: '#6B4C9A' },
  { nombre: 'Burdeo',           hex: '#6B1A2A' },
  { nombre: 'Rojo',             hex: '#CC2222' },
  { nombre: 'Café',             hex: '#6B4423' },
  { nombre: 'Rosado Claro',     hex: '#E8A0A0' },
  { nombre: 'Khaky',            hex: '#8B7355' },
  { nombre: 'Gris Claro',       hex: '#A0A0A0' },
  { nombre: 'Gris Oscuro',      hex: '#4A4A4A' },
  { nombre: 'Gris Plata',       hex: '#808080' },
  { nombre: 'Azul Claro',       hex: '#4A90D9' },
  { nombre: 'Azul Oscuro',      hex: '#0A1F6E' },
  { nombre: 'Celeste',          hex: '#5BB8E8' },
  { nombre: 'Verde Fuji',       hex: '#2E7D4F' },
  { nombre: 'Verde Oscuro',     hex: '#1A4A2E' },
  { nombre: 'Verde Limón',      hex: '#8BC34A' },
  { nombre: 'Negro',            hex: '#1A1A1A' },
  { nombre: 'Dorado',           hex: '#C8A030' },
  { nombre: 'Amarillo',         hex: '#E8C200' },
  { nombre: 'Salmon / Naranja', hex: '#E86040' },
  { nombre: 'Blanco',           hex: '#F0F0F0' },
  { nombre: 'Calipso',          hex: '#00BCD4' },
  { nombre: 'Fucsia',           hex: '#E040A0' },
]

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor, COLORES_GARBAGE }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColor(): ColorContextValue {
  const ctx = useContext(ColorContext)
  if (!ctx) throw new Error('useColor must be used within ColorProvider')
  return ctx
}
