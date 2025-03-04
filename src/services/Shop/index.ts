"use server";

import { IMeal } from "@/types";
import { cookies } from "next/headers";

export const createMealMenu = async (userId: string, data: IMeal) => {
	try {
		const res = await fetch(
			// `${process.env.NEXT_PUBLIC_BASE_API}/providers/menu/${userId}`,
			`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`,
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
		// console.log(res.json());
		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

export const updateMealMenu = async (
	mealId: string,
	userId: string,
	data: IMeal
) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${
						(await cookies()).get("accessToken")!.value
					}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);
		// console.log(res.json());
		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};
export const deleteMealMenu = async (mealId: string, providerId: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/meals/${mealId}/${providerId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${
						(await cookies()).get("accessToken")!.value
					}`,
					"Content-Type": "application/json",
				},
			}
		);
		// console.log(res.json());
		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};
