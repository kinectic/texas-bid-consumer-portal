export type OpportunityReadinessSummary = {
  label: string
  detail: string
}

export function presentReadinessForRole(
  readiness: OpportunityReadinessSummary | undefined,
  role: 'vendor' | 'agency',
) {
  if (!readiness) {
    return { label: '', detail: '' }
  }

  if (role === 'vendor') {
    return readiness
  }

  return {
    label: readiness.label
      .replace('Saved row active', 'Vendor prep state: saved response active')
      .replace('Unsaved draft lane has edits', 'Vendor prep state: unsent draft work exists')
      .replace('No activity yet', 'Vendor prep state: no saved or draft activity'),
    detail: readiness.detail
      .replace('buffer saved-row', 'saved response package on file')
      .replace('unsaved lane has preserved edits', 'vendor still has unsent draft work')
      .replace('unsaved lane empty', 'no extra unsent draft work')
      .replace('Unsaved draft buffer', 'Unsent draft work'),
  }
}
