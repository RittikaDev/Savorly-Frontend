"use server";

import { IMeal } from "@/types";
import { cookies } from "next/headers";

export const createMealMenu = async (userId: string, data: IMeal) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/meals/${userId}/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
