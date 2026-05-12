import type { BidDocument, SubmissionFormState } from '../types/forms'

type SubmissionPacketReadinessPanelProps = {
  formState: SubmissionFormState
  documents: BidDocument[]
}

function fieldReady(value: string) {
  return value.trim().length > 0
}

function presentPacketTone(readyCount: number, totalCount: number) {
  if (readyCount === totalCount) return 'status-live'
  if (readyCount >= Math.max(1, totalCount - 1)) return 'status-review'
  return 'status-planning'
}

export function SubmissionPacketReadinessPanel({
  formState,
  documents,
}: SubmissionPacketReadinessPanelProps) {
  const readinessItems = [
    {
      title: 'Authorized signer',
      ready: fieldReady(formState.signer),
      detail: fieldReady(formState.signer) ? 'Signer details are captured for final confirmation.' : 'Signer details still need to be added before submit.',
    },
    {
      title: 'Pricing response',
      ready: fieldReady(formState.pricing),
      detail: fieldReady(formState.pricing) ? 'Pricing total is present in the draft response.' : 'Pricing total is still missing from the draft response.',
    },
    {
      title: 'Delivery timeline',
      ready: fieldReady(formState.timeline),
      detail: fieldReady(formState.timeline) ? 'Timeline is present for the agency-facing packet.' : 'Timeline still needs to be entered for the packet.',
    },
    {
      title: 'Narrative support',
      ready: fieldReady(formState.narrative),
      detail: fieldReady(formState.narrative) ? 'Narrative support is included in the response packet.' : 'Narrative support is still missing from the packet.',
    },
    {
      title: 'Attachment packet',
      ready: documents.every((document) => !document.status.toLowerCase().includes('pending')),
      detail: documents.every((document) => !document.status.toLowerCase().includes('pending'))
        ? 'All required attachments are ready for agency review.'
        : `${documents.filter((document) => document.status.toLowerCase().includes('pending')).map((document) => document.name).join(', ')} still pending upload.`,
    },
  ]

  const readyCount = readinessItems.filter((item) => item.ready).length
  const packetTone = presentPacketTone(readyCount, readinessItems.length)
  const pendingItems = readinessItems.filter((item) => !item.ready)

  return (
    <div className="panel submission-packet-readiness-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Submission packet readiness</div>
          <div className="panel-title">Packet completeness check</div>
          <p className="muted response-builder-intro">
            A direct pre-submit gate showing which pieces of the vendor packet are ready versus still missing.
          </p>
        </div>
        <span className={`status ${packetTone}`}>{readyCount}/{readinessItems.length} ready</span>
      </div>

      <div className="draft-card submission-packet-summary-card">
        <strong>Packet summary</strong>
        <div className="muted">
          {pendingItems.length === 0
            ? 'The vendor packet is structurally complete for submission.'
            : `${pendingItems.length} packet item${pendingItems.length === 1 ? '' : 's'} still need attention before final submit.`}
        </div>
      </div>

      <div className="submission-packet-grid">
        <div className="package-completeness-list">
          {readinessItems.map((item) => (
            <div className="draft-card" key={item.title}>
              <div className="submission-status-snapshot-row">
                <strong>{item.title}</strong>
                <span className={`status ${item.ready ? 'status-live' : 'status-planning'}`}>{item.ready ? 'Ready' : 'Missing'}</span>
              </div>
              <div className="muted">{item.detail}</div>
            </div>
          ))}
        </div>

        <div className="draft-card submission-packet-summary-card">
          <strong>Before submit</strong>
          <div className="agency-readiness-guidance-list">
            <div className="muted">• Confirm signer, pricing, and timeline match the final response row.</div>
            <div className="muted">• Make sure the narrative explains fit and delivery confidence.</div>
            <div className="muted">• Resolve missing attachments before handing the packet to agency review.</div>
            <div className="muted">• Use this gate as the final pre-submit check, not just a passive summary.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
