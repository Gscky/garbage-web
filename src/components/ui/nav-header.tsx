"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

interface NavHeaderProps {
  links: NavLink[];
  onNavClick: (href: string) => void;
}

function NavHeader({ links, onNavClick }: NavHeaderProps) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative flex w-fit rounded-full p-1 gap-1"
      style={{
        border: '1px solid rgba(255,255,255,0.2)',
        backgroundColor: 'rgba(26,26,26,0.6)',
      }}
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {links.map((link) => (
        <Tab
          key={link.href}
          setPosition={setPosition}
          onClick={() => onNavClick(link.href)}
        >
          {link.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  onClick,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
        (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = 'rgba(240,237,230,0.6)';
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 md:px-4 md:py-2"
      style={{
        fontSize: '0.8rem',
        fontFamily: 'var(--font-dm-sans)',
        fontWeight: 400,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(240,237,230,0.6)',
        transition: 'color 0.2s',
      }}
    >
      {children}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full md:h-9"
      style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
    />
  );
};

export default NavHeader;
