import { Button } from "@/components/ui/button";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import { getAllMeals } from "@/services/Product";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
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
  console.log(meals);
  return (
    <div className="bg-white bg-opacity-50 pt-6 pb-8">
      <SavorlyContainer className="my-16">
        <div className="flex items-center justify-between ">
          <h2 className="text-3xl font-bold">Featured Products</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
          {meals.map((meal: IMeal, index: number) => (
            <Card key={index} className="relative p-4 shadow-lg rounded-2xl">
              <div className="absolute top-2 left-2 bg-white p-1 rounded-full shadow">
                <Heart size={18} className="text-gray-500" />
              </div>
              <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                <ShoppingCart size={18} className="text-gray-500" />
              </div>
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
                <div className="flex justify-center gap-1 mt-2">
                  {/* {meal.cuisineType.map((tag: any, i: any) => ( */}
                  <span className="bg-gray-100 text-sm px-2 py-1 rounded-full">
                    {meal.cuisineType}
                  </span>
                  {/* ))} */}
                </div>
                <p className="text-gray-600 text-sm mt-2">{meal.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold">BDT {meal.price}</span>
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    Buy Now
                  </Button>
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
