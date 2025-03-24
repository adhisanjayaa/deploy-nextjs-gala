interface InputLinkProps {
  pathLink: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

export default function InputLink({
  pathLink,
  value,
  onChange,
  required = false,
  placeholder,
}: InputLinkProps) {
  return (
    <div className="mt-1">
      <div className="w-fit flex items-center rounded-full text-2xl font-semibold border-3 bg-current justify-center overflow-hidden">
        <div className="h-full p-2 bg-foreground text-background">
          <p className="pl-3">{pathLink}</p>
        </div>
        <input
          type="text"
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="h-full p-3 bg-background rounded-br-full rounded-tr-full focus:outline-none"
        />
      </div>
    </div>
  );
}
