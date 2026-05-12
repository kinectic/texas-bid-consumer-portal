import type { ReactNode } from 'react'

type TexasMarketplaceShellProps = {
  eyebrow: string
  title: string
  intro: string
  countyLabel?: string
  cityLabel?: string
  children: ReactNode
}

export function TexasMarketplaceShell({
  eyebrow,
  title,
  intro,
  countyLabel,
  cityLabel,
  children,
}: TexasMarketplaceShellProps) {
  return (
    <section className="texas-shell">
      <div className="texas-shell-backdrop" aria-hidden="true" />
      <div className="texas-shell-overlay" aria-hidden="true" />
      <div className="texas-shell-content">
        <div className="texas-shell-copy">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="intro">{intro}</p>
          <div className="texas-shell-breadcrumbs" aria-label="Location context">
            <span className="texas-shell-crumb texas-shell-crumb-active">Texas</span>
            {countyLabel ? <span className="texas-shell-crumb">{countyLabel}</span> : null}
            {cityLabel ? <span className="texas-shell-crumb">{cityLabel}</span> : null}
          </div>
          <div className="small-note">Demo frame: show local discovery first, then move directly into posted-bid action.</div>
        </div>
        {children}
      </div>
    </section>
  )
}
