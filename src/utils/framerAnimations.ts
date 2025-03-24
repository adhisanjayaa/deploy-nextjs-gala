import { Variants } from "framer-motion";

// Variants untuk animasi hover dan tap (click)
export const hoverClickVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

// Jika diperlukan, Anda juga dapat membuat fungsi untuk menghasilkan variants secara dinamis
export const getHoverClickVariants = (
  hoverScale = 1.05,
  tapScale = 0.95,
  hoverDuration = 0.2,
  tapDuration = 0.1
): Variants => ({
  hover: {
    scale: hoverScale,
    transition: { duration: hoverDuration },
  },
  tap: {
    scale: tapScale,
    transition: { duration: tapDuration },
  },
});
