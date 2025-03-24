import { forwardRef } from "react";

interface CustomTimeInputProps {
  value: string;
  onClick: () => void;
}

const CustomTimeInput = forwardRef<HTMLButtonElement, CustomTimeInputProps>(
  ({ value, onClick }, ref) => {
    // Tampilkan waktu dalam format "HH:mm WIB" jika ada, atau placeholder
    const displayValue = value || "Pilih waktu...";
    return (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="w-full text-4xl overflow-hidden focus:outline-none"
      >
        {displayValue}
      </button>
    );
  }
);

CustomTimeInput.displayName = "CustomTimeInput";

export default CustomTimeInput;
