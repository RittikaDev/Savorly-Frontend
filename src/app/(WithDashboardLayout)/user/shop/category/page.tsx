import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "User Category",
	description: "",
	openGraph: {
		url: "https://localhost/user/shop/category",
		title: "Login",
		description: "",
	},
};

const ProductCategoryPage = async () => {
	const { data, meta } = await getAllCategories();
	return (
		<div>
			<ManageCategories categories={data} />
		</div>
	);
};

export default ProductCategoryPage;
