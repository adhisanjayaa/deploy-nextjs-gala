// app/[link_undangan]/page.tsx
import { notFound } from "next/navigation";
import PocketBase from "pocketbase";
import TemplateA from "@/app/template/stickytheme/page";
import { getImageUrl } from "@/utils/getImageUrl";
import { JSX } from "react";

interface Acara {
  nama_acara: string;
  waktu_mulai: string;
  waktu_selesai: string;
  link_acara: string;
}

export interface Customer {
  id: string;
  link_undangan: string;
  nama_pria: string;
  profil_pria: string;
  foto_pria: string;
  nama_wanita: string;
  profil_wanita: string;
  foto_wanita: string;
  tgl_pernikahan: string;
  quote: string;
  // Field acara yang tersimpan (hanya berupa ID) jika expand tidak digunakan
  acara: Acara[];
  template: string;
  // Jika menggunakan opsi expand, data lengkap akan disimpan di sini
  expand?: {
    acara?: Acara[];
  };
}

interface PageProps {
  params: {
    link_undangan: string;
  };
}

export default async function CustomerPage({
  params,
}: PageProps): Promise<JSX.Element> {
  // Inisiasi PocketBase dengan base URL yang benar
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "");
  try {
    // Decode parameter link undangan
    const decodedLink = decodeURIComponent(params.link_undangan);

    // Query customer dengan opsi expand untuk field "acara"
    const customer: Customer = await pb
      .collection("customers")
      .getFirstListItem(`link_undangan="${decodedLink}"`, { expand: "acara" });

    // Format tanggal pernikahan ke format Indonesia (contoh: "10 September 2025")
    const formattedDate = new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(customer.tgl_pernikahan));
    customer.tgl_pernikahan = formattedDate;

    // Pilih template berdasarkan field template pada customer
    if (customer.template === "templateA") {
      return <TemplateA customer={customer} />;
    } else {
      notFound();
      return <></>;
    }
  } catch (error) {
    console.error("Error fetching customer:", error);
    notFound();
    return <></>;
  }
}
