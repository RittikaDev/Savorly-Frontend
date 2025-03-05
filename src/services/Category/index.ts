"use server";

export const getAllCategories = async () => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`);

		return res.json();
	} catch (error: any) {
		return Error(error);
	}
};
