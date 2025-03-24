import { motion } from "motion/react";
import { useState } from "react";

export interface AcaraType {
  nama_acara: string;
  waktu_mulai: string;
  waktu_selesai: string;
  link_acara: string;
}

interface DetailsProps {
  hoverRotate: number;
  className?: string;
  acara: AcaraType[];
}

const Details: React.FC<DetailsProps> = ({ acara, hoverRotate, className }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          Details
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
            <p className="w-[280px] font-[family-name:var(--font-caveat)] text-2xl leading-none text-center">
              With love and gratitude, we invite you to celebrate our special
              day. Your presence is the greatest gift we could ask for.
            </p>
            <section>
              {acara && acara.length > 0 ? (
                <ul className="flex flex-col gap-3 ">
                  {acara.map((item, index) => (
                    <li
                      key={index}
                      className=" flex flex-row justify-between items-center"
                    >
                      <div className="">
                        <p className="font-[family-name:var(--font-instrument-serif)] text-[28px]">
                          {item.nama_acara}
                        </p>
                        <p className="font-[family-name:var(--font-caveat)] text-xl">
                          {item.waktu_mulai} - {item.waktu_selesai}
                        </p>
                      </div>
                      <a
                        href={item.link_acara}
                        className="w-fit h-fit bg-[#EEE7CA] flex items-center justify-center rounded-2xl p-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="32px"
                          viewBox="0 -960 960 960"
                          width="32px"
                          fill="#4E522D"
                        >
                          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 400Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Z" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Tidak ada acara yang tersedia.</p>
              )}
            </section>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Details;
