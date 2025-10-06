import { client } from "./client";
//TYPES
import { IPlayResponse } from "./types";

export const postPlay = async (player: number) => {
  try {
    const result: {data: IPlayResponse} = await client({
      url: "/play",
      data: { player },
      method: "POST",
    });
    return result?.data;
  } catch (e) {
    console.error(e);
  }
};
