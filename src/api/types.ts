export interface IChoiceResponse {
  id: 1 | 2 | 3 | 4 | 5;
  name: "rock" | "paper" | "scissors" | "lizard" | "spock";
}
export interface IPlayResponse {
  results: "win" | "lose" | "tie";
  player: 1 | 2 | 3 | 4 | 5;
  computer: 1 | 2 | 3 | 4 | 5;
}
