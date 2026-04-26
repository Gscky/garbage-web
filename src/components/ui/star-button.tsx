'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface StarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  lightColor?: string
  backgroundColor?: string
  children: ReactNode
}

export function StarButton({
  lightColor = '#FFFFFF',
  backgroundColor = '#0A1628',
  children,
  className = '',
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: StarButtonProps) {
  return (
    <button
      {...props}
      className={className}
      style={{
        position: 'relative',
        backgroundColor,
        color: '#FFFFFF',
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 500,
        fontSize: '0.85rem',
        padding: '0.6rem 1.4rem',
        border: `1.5px solid ${lightColor}66`,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        whiteSpace: 'nowrap',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1a2d4a'
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = backgroundColor
        onMouseLeave?.(e)
      }}
    >
      {/* Orbiting dot */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: lightColor,
          boxShadow: `0 0 8px ${lightColor}, 0 0 16px ${lightColor}80`,
          offsetPath: 'border-box',
          animation: 'star-btn 2.5s linear infinite',
          pointerEvents: 'none',
        } as React.CSSProperties}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </button>
  )
}
