import { Button } from "@/components/ui/button";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
// import ProductCard from "@/components/ui/core/ProductCard";
import { getAllProducts } from "@/services/Product";
// import { IProduct } from "@/types";
import Link from "next/link";
import TabwiseProducts from "./TabwiseProducts";

const FeaturedProducts = async () => {
	const { data: products } = await getAllProducts();

	return (
		<div className="bg-white bg-opacity-50 pt-6 pb-8">
			<SavorlyContainer className="my-16">
				<div className="flex items-center justify-between ">
					<h2 className="text-3xl font-bold">Featured Products</h2>
					<Link href="/products">
						<Button variant="outline" className="rounded-full">
							All Collection
						</Button>
					</Link>
				</div>
				{/* <TabwiseProducts products={products} /> */}
				{/* <div className="grid grid-cols-5 gap-4 mt-10">
					{products?.slice(0, 5).map((product: IProduct, idx: number) => (
						<ProductCard key={idx} product={product} />
					))}
				</div> */}
			</SavorlyContainer>
		</div>
	);
};

export default FeaturedProducts;
