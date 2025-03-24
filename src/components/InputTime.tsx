import CustomTimeInput from "./CustomTimeInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InputTimeProps {
  label: string;
  selectedTime: Date | null;
  onChange: (time: Date | null) => void;
  required?: boolean;
}

export default function InputTime({
  label,
  selectedTime,
  onChange,
  required = false,
}: InputTimeProps) {
  return (
    <div className="w-full flex gap-7 items-center justify-center">
      <label className="w-full text-3xl">
        <span className="text-current/50">
          {label}
          {required && " *"}
        </span>
        <div className="w-full flex items-center gap-2 mt-3.5 border-b">
          <DatePicker
            selected={selectedTime}
            onChange={onChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Waktu"
            dateFormat="hh:mm aa"
            customInput={
              <CustomTimeInput
                value={""}
                onClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
        </div>
      </label>
    </div>
  );
}
