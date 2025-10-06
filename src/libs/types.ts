import { IconType } from "react-icons";

export interface IUsersData {
  id: number;
  score: number;
}
export interface IOptionsData {
  Icon: IconType;
  choiceId: number;
  name: string;
}
export interface BoardState {
  users: IUsersData[];
  options: IOptionsData[];
  rounds: number;
  updateScore: (results: string) => void;
  fetchOptions: () => void,
  increaseRound: () => void;
  resetGame: () => void;
}