"use server";

import { cookies } from "next/headers";

export const getMealPreferences = async (userID: any) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/meal-preference/${userID}`
		);
		const result = await res.json();
		// console.log(result);

		return result;
	} catch (error: any) {
		return Error(error);
	}
};
export const createMealPreferences = async (
	userID: any,
	preferenceData: any
) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/meal-preference/${userID}/set`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${
						(await cookies()).get("accessToken")!.value
					}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(preferenceData),
			}
		);
		const result = await res.json();
		// console.log(result);

		return result;
	} catch (error: any) {
		return Error(error);
	}
};
