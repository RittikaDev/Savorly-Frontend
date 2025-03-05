"use server";
import { cookies } from "next/headers";

export const getUserSpecificOrders = async (page?: string, limit?: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/customers/orders?limit=${limit}&page=${page}`,
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
export const getProviderSpecificOrders = async (
	page?: string,
	limit?: string
) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/providers/orders?limit=${limit}&page=${page}`,
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

export const updateOrderStatusByProvider = async (order: any) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/providers/response`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${
						(await cookies()).get("accessToken")!.value
					}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(order),
			}
		);

		if (!response.ok) throw new Error("Failed to update order status");

		const result = await response.json();
		return result;
	} catch (error: any) {
		console.error(error);
		return { success: false, message: error.message };
	}
};
