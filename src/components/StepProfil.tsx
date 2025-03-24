import InputImage from "./InputImage";
import InputText from "./InputText";
import InputTextArea from "./InputTextArea";

interface Step2Props {
  namaPria: string;
  setNama: (value: string) => void;
  profilPria: string;
  setProfil: (value: string) => void;
  fotoFile: File | null;
  setFotoFile: (file: File | null) => void;
  placeholderNamaPanggilan: string;
  placeholderProfil: string;
  labelNamaPanggilan: string;
  labelProfil: string;
  labelImage: string;
}

export default function Step2({
  namaPria,
  setNama,
  profilPria,
  setProfil,
  fotoFile,
  setFotoFile,
  placeholderNamaPanggilan,
  placeholderProfil,
  labelNamaPanggilan,
  labelProfil,
  labelImage,
}: Step2Props) {
  return (
    <div className="w-full flex flex-col gap-14 items-center">
      <InputText
        placeholder={placeholderNamaPanggilan}
        label={labelNamaPanggilan}
        value={namaPria}
        onChange={(e) => setNama(e.target.value)}
        required
      />
      <InputTextArea
        placeholder={placeholderProfil}
        label={labelProfil}
        value={profilPria}
        onChange={(e) => setProfil(e.target.value)}
        required
      />
      <InputImage
        file={fotoFile}
        label={labelImage}
        onFileChange={setFotoFile}
        required
      />
    </div>
  );
}
