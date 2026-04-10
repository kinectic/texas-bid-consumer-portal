type FieldMockProps = {
  label: string
  value: string
  multiline?: boolean
}

export function FieldMock({ label, value, multiline = false }: FieldMockProps) {
  return (
    <div className={multiline ? 'field-mock field-mock-multiline' : 'field-mock'}>
      <div className="field-mock-label">{label}</div>
      <div className="field-mock-value">{value}</div>
    </div>
  )
}
