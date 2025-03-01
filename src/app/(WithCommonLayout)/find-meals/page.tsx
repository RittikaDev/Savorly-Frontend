import AllMeals from "@/components/modules/products";
// import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import { getAllCategories } from "@/services/Category";
import { getAllMeals } from "@/services/Product";
import { ICategory } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const FindMeals = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;

  const { data: categories } = await getAllCategories();
  const { data: meals } = await getAllMeals(undefined, undefined, query);

  return (
    <SavorlyContainer>
      {/* <ProductBanner title="All Products" path="Home - Products" /> */}
      <h2 className="text-xl font-bold my-5">Featured Collection </h2>
      <div className="grid grid-cols-6 gap-6">
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
      <AllMeals meals={meals} />
    </SavorlyContainer>
  );
};

export default FindMeals;
