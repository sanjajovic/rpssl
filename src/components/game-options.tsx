import { useEffect } from "react";
import * as motion from "motion/react-client";
import { IconType } from "react-icons";
import { GiCardRandom } from "react-icons/gi";
//STORE
import { useBoard } from "../store/boardStore";

interface IGameOptionsProps {
  getResult: (choiceId: number) => void;
  getRandomChoice: () => void;
}

const GameOptions = ({ getResult, getRandomChoice }: IGameOptionsProps) => {
  const { options, fetchOptions } = useBoard();

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return options.length ? (
    <div className="middle">
      <p className="bold text-4xl lg:text-5xl">Pick a hand</p>
      <div className="flex gap-3 justify-center items-center p-2">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
          <GiCardRandom
            className="cursor-pointer hover:text-[#b17f53] border border-2 text-[2em]"
            onClick={getRandomChoice}
          />
        </motion.div>
        {options.map(
          (
            { Icon, choiceId }: { Icon: IconType; choiceId: number },
            index: number
          ) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <Icon
                className="cursor-pointer hover:text-[#b17f53] text-[2em]"
                onClick={() => getResult(choiceId)}
              />
            </motion.div>
          )
        )}
      </div>
    </div>
  ) : null;
};
export default GameOptions;
