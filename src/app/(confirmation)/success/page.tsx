import React, { JSX } from "react";

interface SuccessPageProps {
  searchParams: { link?: string };
}

export default function SuccessPage({
  searchParams,
}: SuccessPageProps): JSX.Element {
  const invitationLink = searchParams.link || "";

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">Pembayaran Berhasil! 🎉</h1>
      <p>Terima kasih telah menggunakan layanan kami.</p>
      {invitationLink ? (
        <div className="mt-4">
          <p className="font-medium">Link Undangan Anda:</p>
          <a
            href={`/${encodeURIComponent(invitationLink)}`}
            className="text-blue-500 hover:underline"
          >
            /{invitationLink}
          </a>
        </div>
      ) : (
        <p className="mt-4 text-red-500">Link undangan tidak tersedia.</p>
      )}
    </div>
  );
}
