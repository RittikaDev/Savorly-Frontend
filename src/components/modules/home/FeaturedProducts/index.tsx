import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import { getAllMeals } from "@/services/Product";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { IMeal } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const FeaturedProducts = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	const query = await searchParams;

	const { data: meals } = await getAllMeals(undefined, undefined, query);
	// console.log(meals);
	return (
		<div className="bg-white bg-opacity-50 pt-6 pb-8 ">
			<SavorlyContainer className="my-16">
				<div className="flex items-center justify-center mb-12">
					<h2 className="text-4xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
						Featured Products
					</h2>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
					{meals.map((meal: IMeal, index: number) => (
						<Card
							key={index}
							className="relative p-4 shadow-lg rounded-2xl mb-10"
						>
							<div className="flex justify-center -mt-12">
								<Image
									src={meal.image[0]}
									alt={meal.name}
									width={80}
									height={80}
									className="rounded-full border-4 border-green-500 w-20 h-20 object-cover"
								/>
							</div>
							<CardContent className="text-center">
								<h3 className="text-lg font-semibold mt-4">{meal.name}</h3>
								<div className="flex justify-center gap-3 mt-2">
									<span className="bg-gray-200 text-xs px-4 py-1 rounded-full text-gray-800">
										{meal?.cuisineType}
									</span>
									{meal.dietaryPreferences.map((diet, i) => (
										<span
											className="bg-gray-200 text-xs px-4 py-1 rounded-full text-gray-800"
											key={i}
										>
											{diet}
										</span>
									))}
								</div>
								<p className="text-gray-600 text-sm mt-2">{meal.description}</p>
								<div className="flex justify-center mt-4">
									<span className="text-xl font-bold">BDT {meal.price}</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</SavorlyContainer>
		</div>
	);
};

export default FeaturedProducts;
