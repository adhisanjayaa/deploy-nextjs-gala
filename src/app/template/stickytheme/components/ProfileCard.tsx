import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import ProfileButton from "./ProfileButton";

interface ProfileCardProps {
  hoverRotate: number;
  src: string;
  name: string;
  profil: string;
  className?: string;
}

export default function ProfileCard({
  className,
  hoverRotate,
  src,
  name,
  profil,
}: ProfileCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      style={{ perspective: 3000 }}
      drag
      dragMomentum={false}
      dragElastic={0.2}
      className={className}
    >
      <motion.div
        style={{
          borderRadius: "1.5rem",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: 1,
          boxShadow: "4px 4px 8px 0 rgba(0, 0, 0, 0.25)",
        }}
        whileHover={{
          scale: isFlipped ? 1 * 1.05 : 1 * 1.05,
          rotate: isFlipped ? -hoverRotate : -hoverRotate,
          boxShadow: "10px 10px 20px 0 rgba(0, 0, 0, 0.25)",
        }}
        whileTap={{
          scale: isFlipped ? 1 * 1.1 : 1 * 1.1,
          boxShadow: "20px 20px 40px 0 rgba(0, 0, 0, 0.25)",
        }}
        transition={{
          type: "spring",
          duration: 0.45,
          bounce: 0.25,
        }}
        className="w-[200px] h-[280px] flex items-end justify-end cursor-grab active:cursor-grabbing"
      >
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="inset-0 items-end justify-end w-full h-fit z-10"
        >
          <div className="p-[14px]">
            <Image
              src={src}
              fill
              alt="couple"
              className="object-cover object-center rounded-3xl select-none touch-none"
              draggable="false"
            />
            <ProfileButton bgColor="#4E522D" onClick={handleFlip}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#EEE7CA"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </ProfileButton>
          </div>
        </div>
        <div
          className="absolute inset-0 min-h-[280px] h-fit p-[14px] leading-[1.1] tracking-tighter bg-[#4E522D] rounded-3xl z-[1]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          draggable="false"
        >
          <h3 className="font-[family-name:var(--font-instrument-serif)] text-[34px] text-[#EEE7CA]">
            {name}
          </h3>
          <p className="font-[family-name:var(--font-caveat)] text-[18px] mt-4 text-[#EEE7CA]">
            {profil}
          </p>
          <div className="pt-[14px]">
            <ProfileButton bgColor="#EEE7CA" onClick={handleFlip}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#4E522D"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </ProfileButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
