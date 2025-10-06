import { create } from "zustand";
//DATA ACCESS
import { fetchChoices } from "../api/get-choices";
//CONSTANTS
import { MoveOptions } from "../constants/moveOptions";
//TYPES
import { BoardState, IOptionsData } from "../libs/types";

export const useBoard = create<BoardState>((set, get) => ({
  users: [
    { id: 0, score: 0 },
    { id: 1, score: 0 },
  ],
  options: [],
  rounds: 0,
  updateScore: (results: string) =>
    set((state) => ({
      users: state.users.map((user) => {
        const isWinner = results === "win";
        const isLoser = results === "lose";

        return {
          ...user,
          score:
            isWinner && user.id === 1
              ? user.score + 1
              : isLoser && user.id === 0
              ? user.score + 1
              : user.score,
        };
      }),
    })),
  fetchOptions: async () => {
    const state = get();
    if (state.options.length === 0) {
      const result = await fetchChoices();
      if (result) {
        const merged: IOptionsData[] = result.map(
          (choice: { name: string; id: number }) => ({
            choiceId: choice.id,
            name: choice.name,
            Icon: MoveOptions[choice.id - 1],
          })
        );
        set({ options: merged });
      }
    }
  },
  increaseRound: () =>
    set((state: { rounds: number }) => ({ rounds: state.rounds + 1 })),
  resetGame: () =>
    set((state) => ({
      rounds: 0,
      users: state.users.map((user) => ({ ...user, score: 0, choiceId: null })),
    })),
}));
