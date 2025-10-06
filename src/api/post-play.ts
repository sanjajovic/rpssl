import { client } from "./client";

export const postPlay = async (player: number) => {
  try {
    const result = await client({
      url: "/play",
      data: { player },
      method: "POST",
    });
    return result?.data;
  } catch (e) {
    console.error(e);
  }
};
