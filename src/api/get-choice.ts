import { client } from "./client";

export const fetchChoice = async () => {
  try {
    const result = await client({
      url: "/choice",
      method: "GET",
    });
    return result?.data;
  } catch (e) {
    console.error(e);
  }
};
