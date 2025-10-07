import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaRedditAlien } from "react-icons/fa";
import { GiNinjaHead } from "react-icons/gi";
import { FaExternalLinkAlt } from "react-icons/fa";
//COMPONENTS
import GameOptions from "./game-options";
import Board from "./board";
import Button from "./button";
import Modal from "./modal";
//DATA ACCESS
import { postPlay } from "../api/post-play";
import { fetchChoice } from "../api/get-choice";
//STORE
import { useBoard } from "../store/boardStore";
//TYPES
import { IChoiceResponse, IPlayResponse } from "../api/types";

const GameBoard = () => {
  const { rounds, updateScore, users, resetGame, scoreboard } = useBoard();
  const [outcome, setOutcome] = useState<IPlayResponse | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(false);

  const getRandomChoice = async () => {
    setOutcome(undefined);
    const result: IChoiceResponse | undefined = await fetchChoice();
    if (result) {
      getResult(result.id);
    }
  };

  const getResult = async (choiceId: number) => {
    setOutcome(undefined);
    try {
      await postPlay(choiceId).then((res: IPlayResponse | undefined) => {
        setOutcome(res);
        updateScore(res?.results!);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="game-container">
      <div className="score-text">
        <p className="md:p-5 text-2xl md:text-4xl lg:text-5xl">
          Round: {rounds} <br />
          Score: {users[1]?.score} - {users[0]?.score}
        </p>
      </div>

      <Button
        text="Reset"
        onClick={() => {
          setShowAlert(true);
        }}
        disabled={scoreboard.length<1}
        customStyle="col-start-1 row-start-1 justify-self-start self-start"
      />
      <Button
        text="Rules"
        link="https://www.samkass.com/theories/RPSSL.html"
        customStyle="col-start-3 row-start-1 justify-self-end self-start"
        icon={<FaExternalLinkAlt />}
      />
      <Button
        text="Scoreboard"
        onClick={() => {
          setIsOpen(true);
        }}
        customStyle="col-start-2 row-start-2 lg:row-start-3 justify-self-center self-end lg:self-center"
      />

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
              <Button
                text="PLAY AGAIN"
                customStyle="text-md bold p-2"
                onClick={() => setOutcome(undefined)}
              />
            </div>
          </div>
        </>
      ) : (
        <GameOptions getResult={getResult} getRandomChoice={getRandomChoice} />
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center">
          <h2 className="text-4xl font-semibold mb-8">
            Scoreboard <p className="text-sm">*last 10 games</p>
          </h2>
          {scoreboard?.length ? (
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-black font-bold py-2">
                Player
              </div>
              <div className="border-b border-black font-bold py-2">
                Computer
              </div>

              {scoreboard.slice(-10).map((score, index) => (
                <React.Fragment key={index}>
                  <div className="border-b border-black border-r py-2">
                    {score.player}
                  </div>
                  <div className="border-b border-black py-2">
                    {score.computer}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="text-3xl">No results yet.</div>
          )}
        </div>
      </Modal>

      <Modal isOpen={showAlert} onClose={() => setShowAlert(false)}>
        <div className="text-center">
          <h2 className="font-semibold mb-8">
            Are you sure you want to delete all results?
          </h2>
          <div className="flex justify-end gap-3">
            <Button
              text="Delete"
              onClick={() => {
                resetGame();
                setOutcome(undefined);
                setShowAlert(false)
              }}
            />
            <Button text="Cancel" onClick={() => setShowAlert(false)} />
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default GameBoard;
