"use server";

import { IOrderMeal } from "@/types/cart";
import { cookies } from "next/headers";

export const createOrder = async (order: IOrderMeal) => {
  // console.log((await cookies()).get("accessToken")!.value);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/customers/order`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const verifyOrder = async (order_id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/verify?order_id=${order_id}`,
      {
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
