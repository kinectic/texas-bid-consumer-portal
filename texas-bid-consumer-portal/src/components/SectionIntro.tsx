type SectionIntroProps = {
  eyebrow?: string
  title: string
  description: string
}

export function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="section-intro">
      {eyebrow ? <div className="section-intro-eyebrow">{eyebrow}</div> : null}
      <div className="panel-title">{title}</div>
      <div className="section-intro-copy">{description}</div>
      <div className="small-note">Use this section to frame the next visible product block for the demo.</div>
    </div>
  )
}
