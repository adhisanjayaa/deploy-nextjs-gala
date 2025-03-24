import { forwardRef } from "react";

interface CustomDateInputProps {
  value: string;
  onClick: () => void;
}

const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
  ({ value, onClick }, ref) => {
    let displayValue = value;
    if (value) {
      const date = new Date(value);
      // Format tanggal ke "10 oktober 2025"
      displayValue = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
        .format(date)
        .toLowerCase();
    } else {
      displayValue = "Pilih tanggal...";
    }
    return (
      <button
        type="button"
        onClick={onClick}
        ref={ref}
        className="w-full text-4xl overflow-hidden capitalize focus:outline-none"
      >
        {displayValue}
      </button>
    );
  }
);

CustomDateInput.displayName = "CustomDateInput";

export default CustomDateInput;
