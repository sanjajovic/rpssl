import { client } from "./client";
import { IChoiceResponse } from "./types";

export const fetchChoice = async () => {
  try {
    const result: {data: IChoiceResponse} = await client({
      url: "/choice",
      method: "GET",
    });
    return result?.data;
  } catch (e) {
    console.error(e);
  }
};
