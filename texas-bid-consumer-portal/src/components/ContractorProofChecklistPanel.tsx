const contractorProofChecklist = [
  {
    title: 'Get contact verified first',
    detail: 'Confirm phone and email so customers know the business can respond reliably.',
  },
  {
    title: 'Add business identity proof',
    detail: 'Show the real operating business behind the profile so the listing feels credible.',
  },
  {
    title: 'Upload trade and insurance proof',
    detail: 'Strengthen the trust summary with the documents that matter most for higher-confidence jobs.',
  },
  {
    title: 'Respond clearly and on time',
    detail: 'Marketplace performance should reinforce trust, not just paperwork.',
  },
] as const

export function ContractorProofChecklistPanel() {
  return (
    <section className="panel contractor-proof-checklist-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Proof checklist</div>
          <div className="panel-title">How contractors improve visibility and trust</div>
        </div>
        <span className="status status-review">{contractorProofChecklist.length} steps</span>
      </div>
      <div className="draft-list">
        {contractorProofChecklist.map((item) => (
          <div key={item.title} className="draft-card contractor-proof-card">
            <strong>{item.title}</strong>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
