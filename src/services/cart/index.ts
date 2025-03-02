"use server";

import { IOrderMeal } from "@/types/cart";
import { cookies } from "next/headers";

export const createOrder = async (order: IOrderMeal) => {
	console.log((await cookies()).get("accessToken")!.value);
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
		});

		return await res.json();
	} catch (error: any) {
		return Error(error);
	}
};

export const addCoupon = async (
	couponCode: string,
	subTotal: number,
	shopId: string
) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/coupon/${couponCode}`,
			{
				method: "POST",
				headers: {
					Authorization: (await cookies()).get("accessToken")!.value,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ orderAmount: subTotal, shopId }),
			}
		);

		return await res.json();
	} catch (error: any) {
		return Error(error);
	}
};
