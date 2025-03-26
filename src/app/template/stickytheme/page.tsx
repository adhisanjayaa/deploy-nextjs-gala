"use client";
import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import ImageCard from "./components/ImageCard";
import ProfileCard from "./components/ProfileCard";
import Details, { AcaraType } from "./components/Details";
import Acc from "./components/Acc";
import Ornament from "./components/Ornament";
import PocketBase from "pocketbase";
import RSVP from "./components/RSVP";

export interface Customer {
  id: string;
  link_undangan: string;
  nama_pria: string;
  nama_lengkap_pria: string;
  profil_pria: string;
  foto_pria: string;
  nama_wanita: string;
  nama_lengkap_wanita: string;
  profil_wanita: string;
  foto_wanita: string;
  tgl_pernikahan: string;
  quote: string;
  acara: AcaraType[];
  template: string;
  expand?: { acara?: AcaraType[] };
}

interface StickyThemeProps {
  customer: Customer;
}

const StickyTheme: React.FC<StickyThemeProps> = ({ customer }) => {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || "");
  const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL;
  const cleanFotoPria = customer.foto_pria.replace(
    new RegExp(`^${baseUrl}`),
    ""
  );
  const cleanFotoWanita = customer.foto_wanita.replace(
    new RegExp(`^${baseUrl}`),
    ""
  );
  const fotoPriaUrl = pb.files.getURL(customer, cleanFotoPria);
  const fotoWanitaUrl = pb.files.getURL(customer, cleanFotoWanita);
  const constrainsRef = useRef(null);
  const acaraData: AcaraType[] = customer.expand?.acara || customer.acara;
  const [isOpened, setIsOpened] = useState(false);
  const handleOpenInvitation = () => {
    setIsOpened(true);
  };
  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpened && (
          <div className="absolute w-full h-screen flex items-center justify-center bg-[#4E522D] z-10">
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex flex-col gap-8 items-center text-[#EEE7CA]"
            >
              <div className="flex items-end">
                <h1 className="text-8xl font-[family-name:var(--font-instrument-serif)]">
                  Wedding Invitation
                </h1>
                <Acc fill="#EEE7CA" />
              </div>
              <motion.button
                initial={{
                  scale: 1,
                  boxShadow: "4px 4px 8px 0 rgba(0, 0, 0, 0.25)",
                }}
                whileHover={{
                  scale: 1.05,
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
                onClick={handleOpenInvitation}
                className="px-6 py-2 bg-[#EEE7CA] font-[family-name:var(--font-instrument-serif)] text-[#4E522D] text-4xl rounded-3xl hover:cursor-pointer"
              >
                OPEN
              </motion.button>
              <div className="w-[500px] text-center">
                <q className="text-2xl font-[family-name:var(--font-caveat)]">
                  {customer.quote}
                </q>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.main
        ref={constrainsRef}
        className="relative w-full h-screen flex basis-auto items-center justify-center overflow-hidden"
      >
        <motion.div
          drag
          dragMomentum={false}
          dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
          dragElastic={0.2}
          dragConstraints={constrainsRef}
          className="relative w-[3000px] h-[3000px] bg-[#EEE7CA] cursor-pointer shrink-0"
        >
          <div className="absolute top-[50%] left-[50%] flex flex-col gap-2.5 transform -translate-x-1/2 -translate-y-1/2 text-center leading-[1.1] tracking-tight font-[family-name:var(--font-instrument-serif)] text-[#4E522D]">
            <h3 className="text-[48px]">The Wedding</h3>
            <div className="text-[122px] my-5 leading-[1]">
              <h1>{customer.nama_pria}</h1>
              <h1>{customer.nama_wanita}</h1>
            </div>
            <h3 className="text-[24px] font-[family-name:var(--font-caveat)] font-medium">
              {customer.tgl_pernikahan}
            </h3>
          </div>
          <ImageCard
            hoverRotate={-4}
            src="/image-17.webp"
            className="absolute w-[184px] h-[273px] bottom-[54%] left-[32%] rotate-[4deg]"
          />
          <ImageCard
            hoverRotate={-4}
            src="/image-18.jpg"
            className="absolute w-[200px] h-[280px] bottom-[36%] right-[30%] rotate-[4deg]"
          />
          <ImageCard
            hoverRotate={4}
            src="/image-10.webp"
            className="absolute w-[200px] h-[160px] bottom-[35%] right-[34%] rotate-[-4deg]"
          />
          <Ornament
            hoverRotate={-4}
            className="absolute bottom-[35%] right-[34%] rotate-[4deg] flex items-center justify-center"
          />
          <ProfileCard
            src={fotoPriaUrl}
            hoverRotate={-4}
            className="absolute bottom-[54%] right-[32%] rotate-[-4deg]"
            name={customer.nama_lengkap_pria}
            profil={customer.profil_pria}
          />
          <ProfileCard
            src={fotoWanitaUrl}
            hoverRotate={-4}
            className="absolute bottom-[36%] left-[32%] rotate-[-4deg]"
            name={customer.nama_lengkap_wanita}
            profil={customer.profil_wanita}
          />
          <Details
            hoverRotate={0}
            className="absolute top-[1720px] left-[47%] -translate-x-1/2"
            acara={acaraData}
          />
          <RSVP
            props={{
              hoverRotate: 0,
              className: "absolute top-[1720px] right-[47%] translate-x-1/2",
            }}
            customer={customer}
          />
        </motion.div>
      </motion.main>
    </>
  );
};

export default StickyTheme;
