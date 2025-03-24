interface InputTextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export default function InputTextArea({
  label,
  value,
  onChange,
  required = false,
  placeholder,
}: InputTextAreaProps) {
  return (
    <div className="w-full flex flex-col gap-7 font-[family-name:var(--font-chakra-petch)]">
      <label className="text-3xl">
        <span className="text-current/50">{label}:</span>
        <textarea
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full border-b text-4xl overflow-hidden mt-3.5 focus:outline-none"
        />
      </label>
    </div>
  );
}
