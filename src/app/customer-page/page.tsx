"use client";

import React, { useState, useEffect, KeyboardEvent, JSX } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

import NavigationButtons from "../../components/NavigationButtons";
import StepLink from "@/components/StepLink";
import StepProfil from "@/components/StepProfil";
import StepQuote from "@/components/StepQuote";
import StepDetails from "@/components/StepDetails";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess: (result: any) => void;
          onPending: (result: any) => void;
          onError: (result: any) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

export type AcaraType = {
  nama_acara: string;
  waktu_mulai: string;
  waktu_selesai: string;
  link_acara: string;
};

export default function CreateCustomerPage(): JSX.Element {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Slide 1: Link undangan (otomatis lowercase & tanpa spasi)
  const [linkUndangan, setLinkUndangan] = useState<string>("");

  // Slide 2: Data Pria
  const [namaPria, setNamaPria] = useState<string>("");
  const [profilPria, setProfilPria] = useState<string>("");
  const [fotoPriaFile, setFotoPriaFile] = useState<File | null>(null);

  // Slide 3: Data Wanita
  const [namaWanita, setNamaWanita] = useState<string>("");
  const [profilWanita, setProfilWanita] = useState<string>("");
  const [fotoWanitaFile, setFotoWanitaFile] = useState<File | null>(null);

  // Slide 4: Quote
  const [quote, setQuote] = useState<string>("");

  // Slide 5: Data Acara & Pilihan Template
  const [tglPernikahan, setTglPernikahan] = useState<string>("");
  const [acaraList, setAcaraList] = useState<AcaraType[]>([
    { nama_acara: "", waktu_mulai: "", waktu_selesai: "", link_acara: "" },
  ]);
  const [template, setTemplate] = useState<string>("templateA");

  // Slide 6: Payment (tidak ada input tambahan)
  const [captchaToken, setCaptchaToken] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Validasi tiap slide
  const isStep1Valid = linkUndangan.trim() !== "";
  const isStep2Valid =
    namaPria.trim() !== "" && profilPria.trim() !== "" && !!fotoPriaFile;
  const isStep3Valid =
    namaWanita.trim() !== "" && profilWanita.trim() !== "" && !!fotoWanitaFile;
  const isStep4Valid = quote.trim() !== "";
  const isAcaraValid = acaraList.every(
    (acara) =>
      acara.nama_acara.trim() !== "" &&
      acara.waktu_mulai.trim() !== "" &&
      acara.waktu_selesai.trim() !== "" &&
      acara.link_acara.trim() !== ""
  );
  const isStep5Valid = tglPernikahan !== "" && isAcaraValid;
  const isStep6Valid = captchaToken.trim() !== "";

  // Load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "YOUR_CLIENT_KEY_HERE"
    );
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Navigasi antar slide
  const handleNext = async (): Promise<void> => {
    if (currentStep === 1) {
      if (!isStep1Valid) {
        setError("Link undangan tidak boleh kosong.");
        return;
      }
      const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "");
      try {
        const existing = await pb.collection("customers").getList(1, 1, {
          filter: `link_undangan="${linkUndangan}"`,
        });
        if (existing.items.length > 0) {
          setError("Link undangan sudah digunakan.");
          return;
        }
      } catch (error) {
        console.error("Error checking uniqueness:", error);
        setError("Terjadi kesalahan saat memeriksa link undangan.");
        return;
      }
    }
    if (currentStep === 2 && !isStep2Valid) {
      setError("Semua data pria (nama, profil, dan foto) harus diisi.");
      return;
    }
    if (currentStep === 3 && !isStep3Valid) {
      setError("Semua data wanita (nama, profil, dan foto) harus diisi.");
      return;
    }
    if (currentStep === 4 && !isStep4Valid) {
      setError("Quote harus diisi.");
      return;
    }
    if (currentStep === 5 && !isStep5Valid) {
      setError("Pastikan tanggal pernikahan dan semua data acara telah diisi.");
      return;
    }
    if (currentStep === 6 && !isStep6Valid) {
      setError("Verifikasi captcha wajib.");
      return;
    }
    setError("");
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = (): void => {
    setCurrentStep((prev) => prev - 1);
  };

  // Fungsi untuk membuat record acara di collection "acara" dan mengembalikan array ID
  const createAcaraRecords = async (): Promise<string[]> => {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "");
    const eventIds: string[] = [];
    for (const acara of acaraList) {
      const eventRecord = await pb.collection("acara").create({
        nama_acara: acara.nama_acara,
        waktu_mulai: acara.waktu_mulai,
        waktu_selesai: acara.waktu_selesai,
        link_acara: acara.link_acara,
      });
      eventIds.push(eventRecord.id);
    }
    return eventIds;
  };

  // Fungsi untuk membuat data customer ke PocketBase menggunakan FormData (untuk file upload)
  const createCustomer = async (
    orderId: string,
    eventIds: string[]
  ): Promise<void> => {
    try {
      const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "");
      const formData = new FormData();
      formData.append("order_id", orderId);
      formData.append("link_undangan", linkUndangan);
      formData.append("nama_pria", namaPria);
      formData.append("profil_pria", profilPria);
      if (fotoPriaFile) formData.append("foto_pria", fotoPriaFile);
      formData.append("nama_wanita", namaWanita);
      formData.append("profil_wanita", profilWanita);
      if (fotoWanitaFile) formData.append("foto_wanita", fotoWanitaFile);
      formData.append("quote", quote);
      formData.append("tgl_pernikahan", tglPernikahan);
      // Kirim data relasi "acara" sebagai JSON string
      formData.append("acara", JSON.stringify(eventIds));
      formData.append("template", template);

      await pb.collection("customers").create(formData);
    } catch (error) {
      console.error("Error creating customer:", error);
      setError("Terjadi kesalahan saat menyimpan data customer.");
    }
  };

  // Fungsi untuk memproses pembayaran via Midtrans Snap pada slide 6
  const handlePayment = async (): Promise<void> => {
    setLoading(true);
    try {
      const amount =
        template === "templateA"
          ? 100000
          : template === "templateB"
          ? 200000
          : 100000;
      const orderId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const res = await fetch("/api/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, amount }),
      });
      const data = await res.json();
      const token: string = data.token;

      if (!window.snap) {
        setError(
          "Script Midtrans Snap belum tersedia. Silahkan refresh halaman."
        );
        setLoading(false);
        return;
      }
      window.snap.pay(token, {
        onSuccess: async (result: any) => {
          const eventIds = await createAcaraRecords();
          await createCustomer(orderId, eventIds);
          router.push(`/success?link=${encodeURIComponent(linkUndangan)}`);
        },
        onPending: async (result: any) => {
          const eventIds = await createAcaraRecords();
          await createCustomer(orderId, eventIds);
          router.push(`/success?link=${encodeURIComponent(linkUndangan)}`);
        },
        onError: (result: any) => {
          setError("Pembayaran gagal, silahkan coba lagi.");
        },
      });
    } catch (err: any) {
      console.error("Error during payment:", err);
      setError(err.message || "Terjadi kesalahan saat memproses pembayaran");
    } finally {
      setLoading(false);
    }
  };

  // Tangani tombol Enter sebagai Next atau Payment
  const handleKeyDown = async (
    e: KeyboardEvent<HTMLFormElement>
  ): Promise<void> => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentStep < 6) {
        await handleNext();
      } else {
        await handlePayment();
      }
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 items-center justify-center place-items-center mt-10 mx-52 text-foreground font-[family-name:var(--font-chakra-petch)]">
      {currentStep === 1 && (
        <StepLink
          linkUndangan={linkUndangan}
          setLinkUndangan={setLinkUndangan}
        />
      )}
      {currentStep === 2 && (
        <StepProfil
          placeholderNamaPanggilan="Tom Hansen"
          placeholderProfil="Meet Tom, a passionate designer with a love for gaming. Known for his humble, he is excited to begin this new chapter with the love of his life."
          labelNamaPanggilan="Nama Panggilan"
          labelProfil="Profil"
          labelImage="Foto"
          namaPria={namaPria}
          setNama={setNamaPria}
          profilPria={profilPria}
          setProfil={setProfilPria}
          fotoFile={fotoPriaFile}
          setFotoFile={setFotoPriaFile}
        />
      )}
      {currentStep === 3 && (
        <StepProfil
          placeholderNamaPanggilan="Summer Fin"
          placeholderProfil="Meet Summer, a passionate designer with a love for gaming. Known for his humble, he is excited to begin this new chapter with the love of his life."
          labelNamaPanggilan="Nama Panggilan Pasangan"
          labelProfil="Profil Pasangan"
          labelImage="Foto Pasangan"
          namaPria={namaWanita}
          setNama={setNamaWanita}
          profilPria={profilWanita}
          setProfil={setProfilWanita}
          fotoFile={fotoWanitaFile}
          setFotoFile={setFotoWanitaFile}
        />
      )}
      {currentStep === 4 && <StepQuote quote={quote} setQuote={setQuote} />}
      {currentStep === 5 && (
        <StepDetails
          tglPernikahan={tglPernikahan}
          setTglPernikahan={setTglPernikahan}
          acaraList={acaraList}
          setAcaraList={setAcaraList}
          template={template}
          setTemplate={setTemplate}
        />
      )}
      {currentStep === 6 && (
        <div className="text-center">
          <div className="mb-4">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={(token) => setCaptchaToken(token || "")}
            />
          </div>
          <p className="mb-4 font-medium">
            Klik "Pay Now" untuk menyelesaikan pembayaran.
          </p>
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading || !captchaToken}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={6}
        isNextDisabled={
          (currentStep === 1 && !linkUndangan.trim()) ||
          (currentStep === 2 &&
            (!namaPria.trim() || !profilPria.trim() || !fotoPriaFile)) ||
          (currentStep === 3 &&
            (!namaWanita.trim() || !profilWanita.trim() || !fotoWanitaFile)) ||
          (currentStep === 4 && !quote.trim()) ||
          (currentStep === 5 &&
            (!tglPernikahan ||
              !acaraList.every(
                (acara) =>
                  acara.nama_acara.trim() &&
                  acara.waktu_mulai.trim() &&
                  acara.waktu_selesai.trim() &&
                  acara.link_acara.trim()
              ))) ||
          (currentStep === 6 && !captchaToken.trim())
        }
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
