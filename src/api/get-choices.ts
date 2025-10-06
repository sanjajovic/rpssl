import { client } from "./client";
//TYPES
import { IChoiceResponse } from "./types";

export const fetchChoices = async () => {
  try {
    const result: {data: IChoiceResponse[]} = await client({
      url: "/choices",
      method: "GET",
    });
    return result?.data;
  } catch (e) {
    console.error(e);
  }
};
