import { motion } from "framer-motion";

interface IButtonData {
  text: string;
  onClick?: () => void;
  customStyle?: string;
  icon?: React.ReactNode;
  link?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  text,
  customStyle,
  icon,
  link,
  disabled = false,
}: IButtonData) =>
  link ? (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      onClick={() => !disabled && onClick && onClick()}
      className={`flex items-center gap-3 font-bold border-2 ${
        disabled ? "border-gray-500 text-gray-500" : "border-black"
      } px-4 py-2 rounded-md text-[clamp(16px,2vw,25px)] cursor-pointer ${customStyle}`}
    >
      {text} {icon}
    </motion.a>
  ) : (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      onClick={() => !disabled && onClick && onClick()}
      className={`flex items-center gap-3 font-bold border-2 ${
        disabled ? "border-gray-500 text-gray-500" : "border-black"
      } px-4 py-2 rounded-md text-[clamp(16px,2vw,25px)] cursor-pointer ${customStyle}`}
    >
      {text} {icon}
    </motion.div>
  );

export default Button;
