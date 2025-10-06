import { motion } from "framer-motion";

interface IButtonData {
  text: string;
  onClick?: () => void;
  customStyle?: string;
  icon?: React.ReactNode;
  link?: string;
}

const Button = ({
  onClick,
  text,
  customStyle,
  icon,
  link,
}: IButtonData) =>
  link ? (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={`flex items-center gap-3 font-bold border-2 border-black px-4 py-2 rounded-md text-[clamp(16px,2vw,25px)] cursor-pointer ${customStyle}`}
    >
      {text} {icon}
    </motion.a>
  ) : (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={onClick}
      className={`flex items-center gap-3 font-bold border-2 border-black px-4 py-2 rounded-md text-[clamp(16px,2vw,25px)] cursor-pointer ${customStyle}`}
    >
      {text} {icon}
    </motion.div>
  );

export default Button;
