type InputProps = { placeholder?: string; value?: string };

export function Input({ placeholder, value = '' }: InputProps) {
  return <input className="input" readOnly value={value} placeholder={placeholder} />;
}
