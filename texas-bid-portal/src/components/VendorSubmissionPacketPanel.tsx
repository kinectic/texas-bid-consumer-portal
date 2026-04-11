import { vendorSubmissionPacket } from '../data/submissionPacket'

export function VendorSubmissionPacketPanel() {
  return (
    <div className="panel">
      <div className="panel-title">Submission packet summary</div>
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
