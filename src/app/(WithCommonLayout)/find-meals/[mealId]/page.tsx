import ProductBanner from "@/components/modules/products/banner";
import MealDetails from "@/components/modules/products/MealDetails";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import { getSingleProduct } from "@/services/Product";

const MealDeatilspage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const { data: product } = await getSingleProduct(productId);

  return (
    <SavorlyContainer>
      <ProductBanner
        title="Product Details"
        path="Home - Products - Product Details"
      />
      <MealDetails product={product} />
    </SavorlyContainer>
  );
};

export default MealDeatilspage;
