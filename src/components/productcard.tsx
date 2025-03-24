import Image from "next/image";

export default function ProductCard() {
  return (
    <>
      <div>
        <Image
          src="/theme-1.png"
          width={1920 / 4}
          height={1080 / 4}
          alt="digital invitation template"
        />
      </div>
    </>
  );
}
