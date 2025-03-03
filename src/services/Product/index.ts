"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all products
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
export const getProviderSpecificMeals = async (
	page?: string,
	limit?: string,
	query?: { [key: string]: string | string[] | undefined }
) => {
	const params = new URLSearchParams();

	if (query?.cuisineType)
		params.append("cuisineType", query?.cuisineType.toString());

	if (query?.dietaryPreferences)
		params.append("dietaryPreferences", query?.dietaryPreferences.toString());

	if (query?.rating) params.append("rating", query?.rating.toString());

	if (query?.availability)
		params.append("availability", query?.availability.toString());

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/meals/provider-meals?limit=${limit}&page=${page}&${params}`,
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

// get single product
export const getSingleProduct = async (productId: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
			{
				next: {
					tags: ["PRODUCT"],
				},
			}
		);
		const data = await res.json();
		return data;
	} catch (error: any) {
		return Error(error.message);
	}
};

// add product
export const addProduct = async (productData: FormData): Promise<any> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/product`, {
			method: "POST",
			body: productData,
			headers: {
				Authorization: (await cookies()).get("accessToken")!.value,
			},
		});
		revalidateTag("PRODUCT");
		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

// update product
export const updateProduct = async (
	productData: FormData,
	productId: string
): Promise<any> => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
			{
				method: "PATCH",
				body: productData,
				headers: {
					Authorization: (await cookies()).get("accessToken")!.value,
				},
			}
		);
		revalidateTag("PRODUCT");
		return res.json();
	} catch (error: any) {
		return Error(error);
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
