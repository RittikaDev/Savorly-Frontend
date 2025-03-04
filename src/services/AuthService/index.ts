"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}
		);
		const result = await res.json();
		// console.log("after registration", result);

		// MANUALLY HAVE TO SET THE REFRESH TOKEN TO COOKIES, SINCE, SERVER COMPONENTS DON'T SAVE REFRESH TOKEN AUTOMATICALLY, THIS REFRESH TOKEN WILL BE USED TO GENERATE NEW ACCESS TOKEN
		if (result.success) {
			(await cookies()).set("accessToken", result.data.accessToken);
			(await cookies()).set("refreshToken", result?.data?.refreshToken);
		}

		return result;
	} catch (error: any) {
		return Error(error);
	}
};

export const loginUser = async (userData: FieldValues) => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const result = await res.json();

		if (result.success) {
			(await cookies()).set("accessToken", result.data.accessToken);
			(await cookies()).set("refreshToken", result?.data?.refreshToken);
		}

		return result;
	} catch (error: any) {
		return Error(error);
	}
};

export const getCurrentUser = async () => {
	const accessToken = (await cookies()).get("accessToken")?.value;
	let decodedData = null;

	if (accessToken) {
		decodedData = await jwtDecode(accessToken);
		return decodedData;
	} else return null;
};

export const reCaptchaTokenVerification = async (token: string) => {
	try {
		const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
				response: token,
			}),
		});

		return res.json();
	} catch (err: any) {
		return Error(err);
	}
};

export const logout = async () => {
	(await cookies()).delete("accessToken");
};

// CREATING NEW ACCESS TOKEN BY USING REFRESH TOKEN
export const getNewToken = async () => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: (await cookies()).get("refreshToken")!.value,
				},
			}
		);

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};

export const changePassword = async (password: any) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/user/update-password`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${
						(await cookies()).get("accessToken")!.value
					}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(password),
			}
		);
		const result = await res.json();

		return result;
	} catch (error: any) {
		return Error(error);
	}
};

export const updateProfile = async (profileInfo: any) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/customers/profile`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${
						(await cookies()).get("accessToken")!.value
					}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(profileInfo),
			}
		);
		const result = await res.json();

		return result;
	} catch (error: any) {
		return Error(error);
	}
};

export const currentUserDetails = async (userInfo: any) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API}/auth/current-user`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${
						(await cookies()).get("accessToken")!.value
					}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userInfo),
			}
		);
		const result = await res.json();
		// console.log(result);

		return result;
	} catch (error: any) {
		return Error(error);
	}
};
