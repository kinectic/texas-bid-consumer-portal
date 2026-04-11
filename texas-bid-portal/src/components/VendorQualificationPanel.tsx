import { vendorQualificationSnapshot } from '../data/vendorQualification'

export function VendorQualificationPanel() {
  return (
    <div className="panel">
      <div className="panel-title">Vendor qualification snapshot</div>
      <div className="draft-list">
        <div className="draft-card">
          <strong>{vendorQualificationSnapshot.matchScore}</strong>
          <div className="muted">{vendorQualificationSnapshot.fitReason}</div>
        </div>
        <div className="draft-card">
          <strong>{vendorQualificationSnapshot.complianceReadiness}</strong>
          <div className="muted">{vendorQualificationSnapshot.complianceDetail}</div>
        </div>
        <div className="draft-card">
          <strong>{vendorQualificationSnapshot.urgency}</strong>
          <div className="muted">{vendorQualificationSnapshot.urgencyDetail}</div>
        </div>
      </div>
    </div>
  )
}
