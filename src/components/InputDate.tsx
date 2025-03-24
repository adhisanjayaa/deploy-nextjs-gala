import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import CustomDateInput from "./CustomDateInput";
import "react-datepicker/dist/react-datepicker.css";

interface InputdateProps {
  label: string;
  value: string;
  onChange: (date: Date | null) => void;
  required?: boolean;
}

export default function InputDate({
  label,
  value,
  onChange,
  required = false,
}: InputdateProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      // Format ke "10 oktober 2025" (bulan dalam huruf kecil)
      const formatted = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
        .format(date)
        .toLowerCase();
      setFormattedDate(formatted);
    } else {
      setFormattedDate("");
    }
  }, [value]);
  return (
    <div className="w-full flex gap-7 items-center justify-center">
      <label className="w-full text-3xl">
        <span className="text-current/50">{label}</span>
        <div className="w-full flex items-center gap-2 mt-3.5 border-b">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-current"
            style={{ opacity: 0.5 }}
          >
            <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm280-240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
          </svg> */}
          <DatePicker
            value={value}
            onChange={(date) => {
              setStartDate(date);
              onChange(date);
            }}
            required={required}
            selected={startDate}
            disabledKeyboardNavigation
            placeholderText="Select your lucky date"
            customInput={
              <CustomDateInput
                value={""}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
            dateFormat="P"
          />
        </div>
      </label>
    </div>
  );
}
