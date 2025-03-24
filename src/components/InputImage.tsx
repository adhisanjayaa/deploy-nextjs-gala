import { useState, useEffect } from "react";

interface InputImageProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  required?: boolean;
}

export default function InputImage({
  label,
  file,
  onFileChange,
  required = false,
}: InputImageProps) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    } else {
      onFileChange(null);
    }
  };
  return (
    <div className="w-full flex flex-col gap-7 mt-1 font-[family-name:var(--font-chakra-petch)]">
      <label className="text-3xl">
        <span className="text-current/50">
          {label}
          {required && " *"}
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required={required}
          className="mt-1 w-full text-current/100"
        />
      </label>
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", height: "280px" }}
            className="max-w-full h-auto object-cover rounded-3xl"
          />
        </div>
      )}
    </div>
  );
}
