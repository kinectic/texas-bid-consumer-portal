type FieldMockProps = {
  label: string
  value: string
  multiline?: boolean
  onChange?: (value: string) => void
}

export function FieldMock({ label, value, multiline = false, onChange }: FieldMockProps) {
  return (
    <label className={multiline ? 'field-mock field-mock-multiline' : 'field-mock'}>
      <div className="field-mock-label">{label}</div>
      {multiline ? (
        <textarea className="field-mock-input field-mock-textarea" value={value} onChange={(event) => onChange?.(event.target.value)} />
      ) : (
        <input className="field-mock-input" value={value} onChange={(event) => onChange?.(event.target.value)} />
      )}
    </label>
  )
}
