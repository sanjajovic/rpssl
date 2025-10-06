import { AnimatePresence } from "framer-motion";
//COMPONENTS
import Animation from "./animation";
//HOOKS
import useWindowSize from "../hooks/useWindowSize";
//CONSTANTS
import { MoveOptions } from "../constants/moveOptions";

interface IBoardProps {
  results: "win" | "lose" | "tie";
  player: number;
  computer: number;
}

const Board = ({ results, player, computer }: IBoardProps) => {
  const { width, height } = useWindowSize();
  const maxWidth = width >= 1140 ? 900 : width;
  return (
    <AnimatePresence>
      <>
        <Animation
          Choice={MoveOptions[computer - 1]}
          isWinner={results === "lose"}
          startPos={{ x: maxWidth / 2 - 50, y: height / 2 }}
        />
        <Animation
          Choice={MoveOptions[player - 1]}
          isWinner={results === "win"}
          startPos={{ x: -(maxWidth / 2 - 50), y: height / 2 }}
        />
      </>
    </AnimatePresence>
  );
};
export default Board;
