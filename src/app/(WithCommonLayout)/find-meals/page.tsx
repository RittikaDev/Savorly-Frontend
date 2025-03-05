import AllMeals from "@/components/modules/products";
// import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import { getAllCategories } from "@/services/Category";
import { getAllMeals } from "@/services/Meals";
import { ICategory } from "@/types";
import Image from "next/image";

import Slider4 from "@/assets/hero_section/slider4.jpg";
import LoadingPage from "@/components/shared/Loader";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const FindMeals = async ({ searchParams }: { searchParams: SearchParams }) => {
	const query = await searchParams;

	const { data: categories } = await getAllCategories();
	const { data: meals } = await getAllMeals(undefined, undefined, query);

	//   console.log(meals);
	if (meals.length === 0) <LoadingPage />;

	return (
		<SavorlyContainer>
			<div className="relative flex items-center justify-center my-12 bg-cover bg-center h-[200px]">
				<Image
					src={Slider4}
					alt="Hero Image"
					layout="fill"
					objectFit="cover"
					className="opacity-20"
				/>
				<h2 className="text-4xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text z-10">
					Find Meals
				</h2>
			</div>

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
