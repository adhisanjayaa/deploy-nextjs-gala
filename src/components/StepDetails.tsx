import InputDate from "./InputDate";
import InputText from "./InputText";
import InputTime from "./InputTime";

export type AcaraType = {
  nama_acara: string;
  waktu_mulai: string;
  waktu_selesai: string;
  link_acara: string;
};

interface StepDetailsProps {
  tglPernikahan: string;
  setTglPernikahan: (value: string) => void;
  acaraList: AcaraType[];
  setAcaraList: (value: AcaraType[]) => void;
  template: string;
  setTemplate: (value: string) => void;
}

export default function StepDetails({
  tglPernikahan,
  setTglPernikahan,
  acaraList,
  setAcaraList,
  template,
  setTemplate,
}: StepDetailsProps) {
  const addAcara = () => {
    setAcaraList([
      ...acaraList,
      { nama_acara: "", waktu_mulai: "", waktu_selesai: "", link_acara: "" },
    ]);
  };

  const updateAcara = (
    index: number,
    field: keyof AcaraType,
    value: string
  ) => {
    const updated = acaraList.map((acara, i) =>
      i === index ? { ...acara, [field]: value } : acara
    );
    setAcaraList(updated);
  };

  const removeAcara = (index: number) => {
    if (acaraList.length === 1) return;
    setAcaraList(acaraList.filter((_, i) => i !== index));
  };
  return (
    <div className="w-full flex flex-col gap-14 items-center justify-center place-items-center">
      <InputDate
        label="Tanggal Pernikahan"
        value={tglPernikahan}
        onChange={(date: Date | null) =>
          setTglPernikahan(date ? date.toISOString().split("T")[0] : "")
        }
        required
      />
      <div className="w-full rounded-3xl flex flex-col justify-center items-center">
        {acaraList.map((acara, index) => (
          <div
            key={index}
            className=" w-full text-background flex flex-col gap-6 bg-foreground p-10 rounded-3xl mb-10"
          >
            <InputText
              placeholder="Marriage Ceremony"
              label="Nama Acara"
              value={acara.nama_acara}
              onChange={(e) => updateAcara(index, "nama_acara", e.target.value)}
              required
            />
            <div className="flex gap-5">
              <InputTime
                label="Jam Mulai"
                selectedTime={
                  acara.waktu_mulai
                    ? new Date(`1970-01-01T${acara.waktu_mulai}:00`)
                    : null
                }
                onChange={(date) =>
                  updateAcara(
                    index,
                    "waktu_mulai",
                    date ? date.toTimeString().slice(0, 5) : ""
                  )
                }
                required
              />
              <InputTime
                label="Jam Selesai"
                selectedTime={
                  acara.waktu_selesai
                    ? new Date(`1970-01-01T${acara.waktu_selesai}:00`)
                    : null
                }
                onChange={(date) =>
                  updateAcara(
                    index,
                    "waktu_selesai",
                    date ? date.toTimeString().slice(0, 5) : ""
                  )
                }
                required
              />
            </div>
            <InputText
              placeholder="https://maps.app.goo.gl/M4cXMzVUxMXPakz58"
              label="Link Alamat Acara"
              value={acara.link_acara}
              onChange={(e) => updateAcara(index, "link_acara", e.target.value)}
              required
            />
            <div className="">
              {acaraList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAcara(index)}
                  className="mt-2 bg-red-400 px-2.5 py-1 rounded-2xl font-bold mb-3.5 hover:underline"
                >
                  Hapus Acara
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addAcara}
          className="max-w-3xs mt-2 bg-foreground text-background px-2.5 py-1 rounded-2xl font-bold mb-3.5 uppercase hover:scale-110"
        >
          ADD Event
        </button>
      </div>
    </div>
  );
}
