import ProductBanner from "@/components/modules/products/banner";
import ProductDetails from "@/components/modules/products/productDetails";
import EliteContainer from "@/components/ui/core/EliteContainer";
import { getSingleProduct } from "@/services/Product";

const ProductDetailsPage = async ({
	params,
}: {
	params: Promise<{ productId: string }>;
}) => {
	const { productId } = await params;

	const { data: product } = await getSingleProduct(productId);

	return (
		<EliteContainer>
			<ProductBanner
				title="Product Details"
				path="Home - Products - Product Details"
			/>
			<ProductDetails product={product} />
		</EliteContainer>
	);
};

export default ProductDetailsPage;
