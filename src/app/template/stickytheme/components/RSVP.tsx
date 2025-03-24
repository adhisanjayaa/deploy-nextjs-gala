import { motion } from "motion/react";
import { useState } from "react";
import InputNumber from "./InputNumber";

export interface Customer {
  id: string;
  link_undangan: string;
}
interface RSVPProps {
  className?: string;
  hoverRotate: number;
}

const RSVP: React.FC<{ props: RSVPProps; customer: Customer }> = ({
  customer,
  props: { className, hoverRotate },
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [namaUndangan, setNamaUndangan] = useState<string>("");
  const [jumlahUndangan, setJumlahUndangan] = useState<string>(""); // optional
  const [status, setStatus] = useState<string>(""); // "hadir" atau "tidak hadir"
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaUndangan.trim() || !status.trim()) {
      setError("Nama undangan dan status kehadiran wajib diisi.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/create-undangan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: customer.id,
          nama_undangan: namaUndangan,
          jumlah_undangan: jumlahUndangan ? Number(jumlahUndangan) : null,
          status,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("RSVP berhasil dikirim!");
        // Bersihkan form
        setNamaUndangan("");
        setJumlahUndangan("");
        setStatus("");
      } else {
        setError(data.error || "Gagal mengirim RSVP.");
      }
    } catch (err: any) {
      setError(err.message || "Gagal mengirim RSVP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.2}
      className={className}
    >
      <motion.div
        style={{
          borderRadius: "1.5rem",
          originY: 0,
        }}
        initial={{
          scale: 1,
          boxShadow: "4px 4px 8px 0 rgba(0, 0, 0, 0.25)",
        }}
        whileHover={{
          scale: 1.05,
          rotate: hoverRotate,
          boxShadow: "10px 10px 20px 0 rgba(0, 0, 0, 0.25)",
        }}
        whileTap={{
          scale: 1.1,
          boxShadow: "20px 20px 40px 0 rgba(0, 0, 0, 0.25)",
        }}
        transition={{
          type: "spring",
          duration: 0.45,
          bounce: 0.25,
        }}
        layout="size" // Animate size changes
        className="w-fit h-fit px-5 py-2 items-center flex flex-col gap-7 rounded-3xl bg-[#4E522D] text-[#EEE7CA] cursor-grab active:cursor-grabbing"
      >
        <motion.h3
          onClick={() => setIsOpen(!isOpen)}
          className="font-[family-name:var(--font-instrument-serif)] text-5xl "
          layout="position" // Animate position changes
        >
          RSVP
        </motion.h3>
        {isOpen && (
          <motion.div
            className="flex flex-col gap-7 mx-auto"
            initial={{
              opacity: 0,
              scaleY: 0,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
            }}
            exit={{
              opacity: 0,
              scaleY: 0,
            }}
            transition={{
              type: "spring",
              duration: 0.1,
              bounce: 0.1,
            }}
            layout="size"
          >
            <section>
              {error && (
                <p className="text-[#fa5b5b] mb-2 font-[family-name:var(--font-caveat)] underline">
                  {error}
                </p>
              )}
              {message && (
                <p className="text-[#EEE7CA] mb-2 font-[family-name:var(--font-caveat)] underline">
                  {message}
                </p>
              )}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 font-[family-name:var(--font-caveat)]"
              >
                <div>
                  <label className="block text-xl">Nama Undangan</label>
                  <input
                    type="text"
                    placeholder="Hadi Saputra"
                    value={namaUndangan}
                    onChange={(e) => setNamaUndangan(e.target.value)}
                    required
                    className="w-full border-b text-2xl font-bold font-[family-name:var(--font-caveat)]  focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xl">Jumlah Undangan</label>
                  <input
                    type="number"
                    min="0" // Mencegah nilai negatif
                    value={jumlahUndangan}
                    onChange={(e) => setJumlahUndangan(e.target.value)}
                    className="w-full border-b text-2xl font-bold font-[family-name:var(--font-caveat)]  focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xl">Status Kehadiran</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    className="w-full border-b text-2xl font-bold font-[family-name:var(--font-caveat)]  focus:outline-none"
                  >
                    <option value="" className="text-gray-400">
                      Status Kehadiran
                    </option>
                    <option value="hadir" className="text-gray-400">
                      Hadir
                    </option>
                    <option value="tidak hadir" className="text-gray-400">
                      Tidak Hadir
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-fit py-2.5 bg-[#EEE7CA] text-xl text-[#4E522D] font-[family-name:var(--font-instrument-serif)] rounded-2xl mb-3"
                >
                  {loading ? "Mengirim..." : "Kirim RSVP"}
                </button>
              </form>
            </section>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RSVP;
