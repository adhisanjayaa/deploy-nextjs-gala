import React, { JSX } from "react";
import PocketBase from "pocketbase";
import { notFound } from "next/navigation";

interface Undangan {
  id: string;
  nama_undangan: string;
  jumlah_undangan: number | null;
  status: string;
  customer: string;
}

interface Customer {
  id: string;
  link_undangan: string;
}

interface RSVPPageProps {
  params: {
    link_undangan: string;
  };
}

export default async function RSVPPage({
  params,
}: RSVPPageProps): Promise<JSX.Element> {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "");
  try {
    const decodedLink = decodeURIComponent(params.link_undangan);
    // Ambil customer berdasarkan link undangan
    const customer: Customer = await pb
      .collection("customers")
      .getFirstListItem(`link_undangan="${decodedLink}"`);
    // Query collection undangan berdasarkan relasi customer
    const undanganData = await pb.collection("undangan").getList(1, 50, {
      filter: `customer="${customer.id}"`,
    });

    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Data RSVP</h1>
        {undanganData.items.length > 0 ? (
          <ul className="space-y-4">
            {(undanganData.items as unknown as Undangan[]).map(
              (item: Undangan) => (
                <li key={item.id} className="p-4 border rounded">
                  <p className="font-medium">
                    Nama Undangan: {item.nama_undangan}
                  </p>
                  <p>Jumlah Undangan: {item.jumlah_undangan || "-"}</p>
                  <p>Status: {item.status}</p>
                </li>
              )
            )}
          </ul>
        ) : (
          <p>Belum ada RSVP yang masuk.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching RSVP data:", error);
    notFound();
    return <></>;
  }
}
