import { motion } from "framer-motion";
import { IconType } from "react-icons";
//HOOKS
import useWindowSize from "../hooks/useWindowSize";

const Animation = ({
  Choice,
  isWinner,
  startPos,
}: {
  Choice: IconType;
  isWinner: boolean;
  startPos: { x: number; y: number };
}) => {
  const { height } = useWindowSize();

  return (
    <motion.div
      initial={{
        x:  startPos.x,
        y: height / 2 - 300,
        scale: 0.5,
        rotate: 0,
      }}
      animate={{
        x: startPos.x > 0 ? startPos.x - (startPos.x/3) : startPos.x + (startPos.x/-3),
        y: -height / 8,
        scale: 4,
        rotate: isWinner ? [0, 360] : [0, 0],
      }}
      transition={{ duration: 1 }}
      className="absolute"
    >
      <Choice
        className={`text-3xl md:text-6xl ${
          isWinner && "animate-pulse text-[#929a68]"
        }`}
      />
    </motion.div>
  );
};
export default Animation;
