import { copy } from '@/lib/copy'

export default function Footer() {
  const { footer, contacto, productos } = copy

  return (
    <footer className="bg-[#F5F5F5] border-t border-[#E5E5E5]" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-10 pt-12 pb-8">

        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

          {/* Columna 1 — Logo + tagline */}
          <div className="lg:col-span-1">
            <p className="text-xl font-black tracking-[-0.04em] text-[#1A1A1A] mb-3">
              {copy.nav.logo}
            </p>
            <p className="text-sm text-[#666666] leading-relaxed max-w-[280px]">
              {footer.tagline}
            </p>
          </div>

          {/* Columna 2 — Productos + Empresa */}
          <div className="grid grid-cols-2 gap-8 md:gap-10">
            {/* Productos */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1A1A1A] mb-4">
                Productos
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {productos.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href="#productos"
                      className="text-sm text-[#666666] hover:text-[#E63000] transition-colors duration-150"
                    >
                      {item.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1A1A1A] mb-4">
                Empresa
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                <li>
                  <a
                    href="#por-que-elegirnos"
                    className="text-sm text-[#666666] hover:text-[#E63000] transition-colors duration-150"
                  >
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#proceso"
                    className="text-sm text-[#666666] hover:text-[#E63000] transition-colors duration-150"
                  >
                    Proceso
                  </a>
                </li>
                <li>
                  <a
                    href="#contacto"
                    className="text-sm text-[#666666] hover:text-[#E63000] transition-colors duration-150"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna 3 — Contacto */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#1A1A1A] mb-4">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {/* Teléfonos fijos */}
              <li className="flex flex-col gap-0.5">
                <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-[0.05em]">
                  Teléfono
                </span>
                {contacto.info_contacto.telefono.map((tel) => (
                  <a
                    key={tel}
                    href={`tel:${tel.replace(/\s/g, '')}`}
                    className="text-sm text-[#666666] hover:text-[#E63000] transition-colors duration-150"
                  >
                    {tel}
                  </a>
                ))}
              </li>

              {/* Celulares */}
              <li className="flex flex-col gap-0.5">
                <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-[0.05em]">
                  Celular
                </span>
                {contacto.info_contacto.celular.map((cel) => (
                  <a
                    key={cel}
                    href={`tel:${cel.replace(/\s/g, '')}`}
                    className="text-sm text-[#666666] hover:text-[#E63000] transition-colors duration-150"
                  >
                    {cel}
                  </a>
                ))}
              </li>

              {/* Email */}
              <li className="flex flex-col gap-0.5">
                <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-[0.05em]">
                  Email
                </span>
                <a
                  href={`mailto:${contacto.info_contacto.email}`}
                  className="text-sm text-[#666666] hover:text-[#E63000] transition-colors duration-150"
                >
                  {contacto.info_contacto.email}
                </a>
              </li>

              {/* Dirección */}
              <li className="flex flex-col gap-0.5">
                <span className="text-xs text-[#9CA3AF] font-medium uppercase tracking-[0.05em]">
                  Dirección
                </span>
                <span className="text-sm text-[#666666]">
                  {contacto.info_contacto.direccion}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-[#E5E5E5] mb-6" role="separator" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#9CA3AF]">
            {footer.copyright}
          </p>
          <p className="text-xs text-[#9CA3AF]">
            {contacto.info_contacto.cobertura}
          </p>
        </div>
      </div>
    </footer>
  )
}
