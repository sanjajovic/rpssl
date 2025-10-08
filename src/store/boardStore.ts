import { create } from "zustand";
//DATA ACCESS
import { fetchChoices } from "../api/get-choices";
//CONSTANTS
import { MoveOptions } from "../constants/moveOptions";
//TYPES
import { BoardState, IOptionsData } from "./types";
import { IChoiceResponse } from "../api/types";

export const useBoard = create<BoardState>((set, get) => ({
  users: [
    { id: 0, score: 0 },
    { id: 1, score: 0 },
  ],
  scoreboard: [],
  options: [],
  rounds: 0,
  updateScore: (results: string) =>
    set((state) => {
      const isWinner = results === "win";
      const isLoser = results === "lose";
      const updatedUsers = state.users.map((user) => ({
        ...user,
        score:
          isWinner && user.id === 1
            ? user.score + 1
            : isLoser && user.id === 0
            ? user.score + 1
            : user.score,
      }));
      const newResult = {
        player: results,
        computer: isWinner ? "lose" : isLoser ? "win" : "tie",
      };
      return {
        users: updatedUsers,
        scoreboard: [...state.scoreboard, newResult],
        rounds: state.rounds + 1,
      };
    }),
  fetchOptions: async () => {
    const state = get();
    if (state.options.length === 0) {
      const result: IChoiceResponse[] | undefined = await fetchChoices();
      if (result) {
        const merged: IOptionsData[] = result.map((choice) => ({
          choiceId: choice.id,
          name: choice.name,
          Icon: MoveOptions[choice.id - 1],
        }));
        set({ options: merged });
      }
    }
  },
  resetGame: () =>
    set((state) => ({
      rounds: 0,
      scoreboard: [],
      users: state.users.map((user) => ({ ...user, score: 0, choiceId: null })),
    })),
}));
