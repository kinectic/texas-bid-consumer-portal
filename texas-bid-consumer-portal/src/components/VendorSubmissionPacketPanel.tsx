import { vendorSubmissionPacket } from '../data/submissionPacket'

export function VendorSubmissionPacketPanel() {
  return (
    <div className="panel vendor-submission-packet-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Bid comparison packet</div>
          <div className="panel-title">Contractor bid packet summary</div>
        </div>
        <span className="status status-review">{vendorSubmissionPacket.length} items</span>
      </div>
      <div className="draft-list">
        {vendorSubmissionPacket.map((document) => (
          <div className="draft-card" key={document.name}>
            <strong>{document.name}</strong>
            <div className="muted">{document.state}</div>
            <div className="dashboard-note compact-note">{document.note}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
