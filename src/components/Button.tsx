import { JSX } from "react";
import { motion, Variants } from "motion/react";
import { hoverClickVariants } from "@/utils/framerAnimations";

export type ButtonVariant = "text" | "text-icon" | "icon";
export type IconPosition = "left" | "right";

interface ButtonProps {
  variant?: ButtonVariant;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  variant = "text",
  label = "",
  icon,
  iconPosition = "left",
  onClick,
  className = "",
  disabled = false,
}: ButtonProps): JSX.Element {
  let content;

  switch (variant) {
    case "icon":
      content = icon;
      break;
    case "text-icon":
      content = (
        <div className="flex items-center">
          {icon && iconPosition === "left" && (
            <span className="mr-2">{icon}</span>
          )}
          <span>{label}</span>
          {icon && iconPosition === "right" && (
            <span className="ml-2">{icon}</span>
          )}
        </div>
      );
      break;
    case "text":
    default:
      content = label;
      break;
  }
  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      variants={hoverClickVariants}
      whileHover="hover"
      whileTap="tap"
      className={`px-4 py-2 rounded hover:cursor-pointer ${className}`}
    >
      {content}
    </motion.button>
  );
}
