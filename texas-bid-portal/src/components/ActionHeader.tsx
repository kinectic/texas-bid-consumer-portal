import type { ReactNode } from 'react'

type ActionHeaderProps = {
  eyebrow: string
  title: string
  intro: string
  actions?: ReactNode
}

export function ActionHeader({ eyebrow, title, intro, actions }: ActionHeaderProps) {
  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p className="intro">{intro}</p>
      </div>
      {actions ? <div className="top-actions">{actions}</div> : null}
    </header>
  )
}
