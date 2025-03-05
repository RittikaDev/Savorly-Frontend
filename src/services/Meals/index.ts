"use server";
import { cookies } from "next/headers";

// GET ALL MEALS
export const getAllMeals = async (
	page?: string,
	limit?: string,
	query?: { [key: string]: string | string[] | undefined }
) => {
	const params = new URLSearchParams();

	if (query?.cuisineType)
		params.append("cuisineType", query?.cuisineType.toString());

	if (query?.dietaryPreferences)
		params.append("dietaryPreferences", query?.dietaryPreferences.toString());
	if (query?.providerId)
		params.append("providerId", query?.providerId.toString());

	if (query?.rating) params.append("rating", query?.rating.toString());

	if (query?.availability)
		params.append("availability", query?.availability.toString());

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/meals?limit=${limit}&page=${page}&${params}`,
			{
				next: {
					tags: ["MEALS"],
				},
			}
		);
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error: any) {
		return Error(error.message);
	}
};

// GET PROVIDER SPECIFIC MEALS ONLY
export const getProviderSpecificMeals = async (
	page?: string,
	limit?: string
) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/meals/provider-meals?limit=${limit}&page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${
						(await cookies()).get("accessToken")!.value
					}`,
				},
			}
		);
		const data = await res.json();
		console.log(data);
		return data;
	} catch (error: any) {
		return Error(error.message);
	}
};

export const getAllCuisine = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/meals/cusine`,
			{
				next: {
					tags: ["CusineTypes"],
				},
			}
		);
		const data = await res.json();
		return data;
	} catch (error: any) {
		return Error(error.message);
	}
};
export const getDietaryPreference = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/meals/dieteryPreference`
		);

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};
export const getAllProviders = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/user/all-providers`
		);

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};
