interface InputTextProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export default function InputText({
  label,
  value,
  onChange,
  required = false,
  placeholder,
}: InputTextProps) {
  return (
    <div className="w-full flex flex-col gap-7 mt-1 font-[family-name:var(--font-chakra-petch)]">
      <label className="text-3xl">
        <span className="text-current/50">{label}:</span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full border-b text-4xl mt-3.5 focus:outline-none"
        />
      </label>
    </div>
  );
}
