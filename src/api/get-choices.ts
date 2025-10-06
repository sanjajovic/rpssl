import { client } from "./client";

export const fetchChoices = async () => {
  try {
    const result = await client({
      url: "/choices",
      method: "GET",
    });
    return result?.data;
  } catch (e) {
    console.error(e);
  }
};
