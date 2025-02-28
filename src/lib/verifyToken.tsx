"use server";

import { getNewToken } from "@/services/AuthService";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
	if (!token) return true;

	try {
		const decoded: { exp: number } = jwtDecode(token);

		return decoded.exp * 1000 < Date.now(); // IF LESS THAN Date.now(), MEANS TOKEN HAS EXPIRED
	} catch (err: any) {
		console.error(err);
		return true;
	}
};

export const getValidToken = async (): Promise<string> => {
	const cookieStore = await cookies();

	let token = cookieStore.get("accessToken")!.value;

	// IF TOKEN IS NULL OR HAS EXPIRED
	if (!token || (await isTokenExpired(token))) {
		const { data } = await getNewToken();
		token = data?.accessToken;
		cookieStore.set("accessToken", token);
	}

	return token;
};
