import type { ReactNode } from 'react'

type Props = {
  id: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  /** Slightly lighter “panel” band (GitHub-style elevated surface) */
  tone?: 'plain' | 'band'
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  tone = 'plain',
}: Props) {
  const band =
    tone === 'band'
      ? 'border-y border-gh-border bg-gh-elevated/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]'
      : ''

  return (
    <section id={id} className={`scroll-mt-16 px-6 py-20 md:py-28 ${band} ${className}`}>
      <div className="mx-auto max-w-4xl">
        {title && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-neutral-50 md:text-3xl">{title}</h2>
            {subtitle && <p className="mt-2 text-neutral-400">{subtitle}</p>}
            <div className="mt-4 h-px w-12 bg-gh-accent" />
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
