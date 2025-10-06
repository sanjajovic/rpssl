import { useState } from "react";
import { motion } from "framer-motion";
import { FaRedditAlien } from "react-icons/fa";
import { GiNinjaHead } from "react-icons/gi";
import { FaExternalLinkAlt } from "react-icons/fa";
//COMPONENTS
import GameOptions from "./game-options";
import Board from "./board";
//DATA ACCESS
import { postPlay } from "../api/post-play";
import { fetchChoice } from "../api/get-choice";
//STORE
import { useBoard } from "../store/boardStore";
//CONSTANTS
import { reset, rules } from "../constants/motionStyles";

const GameBoard = () => {
  const { rounds, increaseRound, updateScore, users, resetGame } = useBoard();
  const [outcome, setOutcome] = useState<{
    results: "win" | "lose" | "tie";
    player: number;
    computer: number;
  } | null>(null);

  const getRandomChoice = async () => {
    setOutcome(null);
    const result = await fetchChoice();
    if (result) {
      getResult(result?.id);
    }
  };

  const getResult = async (choiceId: number) => {
    setOutcome(null);
    try {
      await postPlay(choiceId).then((res) => {
        increaseRound();
        setOutcome(res);
        updateScore(res?.results);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="game-container">
      <div className="score-text">
        <p className="md:p-5 text-xl md:text-5xl">
          Round: {rounds} <br />
          Score: {users[1]?.score} - {users[0]?.score} 
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.2 }}
        style={reset}
        onClick={() => {
          resetGame();
          setOutcome(null);
        }}
      >
        Reset
      </motion.div>
      <motion.a
        href="https://www.samkass.com/theories/RPSSL.html"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        style={rules}
        className="text-md md:text-5xl"
      >
        Rules <FaExternalLinkAlt />
      </motion.a>
      <div className="left">
        <motion.div
          animate={
            outcome?.results === "win" ? { scale: [1, 1.3, 1] } : { scale: 1 }
          }
          transition={{ duration: 0.5 }}
          className="avatar-container"
        >
          <GiNinjaHead className="text-[4em]" />
        </motion.div>
      </div>
      <div className="right">
        <motion.div
          animate={
            outcome?.results === "lose" ? { scale: [1, 1.3, 1] } : { scale: 1 }
          }
          transition={{ duration: 0.5 }}
          className="avatar-container"
        >
          <FaRedditAlien className="text-[4em]" />
        </motion.div>
      </div>
      {outcome ? (
        <>
          <div className="center-text">
            <Board
              results={outcome.results}
              player={outcome.player}
              computer={outcome.computer}
            />
            <div className="flex flex-col w-[max-content] gap-3 items-center bold text-lg md:text-3xl lg:text-5xl justify-self-center self-end bottom-20">
              <p>YOU {outcome.results.toUpperCase()}</p>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className="text-md bold border border-black rounded-md p-2 cursor-pointer"
                onClick={() => setOutcome(null)}
              >
                PLAY AGAIN
              </motion.div>
            </div>
          </div>
        </>
      ) : (
        <GameOptions getResult={getResult} getRandomChoice={getRandomChoice} />
      )}
    </div>
  );
};
export default GameBoard;
