"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { addmeal } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { IMeal } from "@/types";

import { ShoppingCart } from "lucide-react";

const MealCard = ({ meal }: { meal: IMeal }) => {
	const dispatch = useAppDispatch();

	// console.log("from product cart", meal);

	const cart = useAppSelector((state) => state.cart.meals);

	// Find the specific meal in the cart
	const mealInCart = cart.find((item) => item._id === meal._id);

	// Get the quantity of the meal, default to 0 if not found
	const itemCount = mealInCart ? mealInCart.orderQuantity : 0;

	const handleAddProduct = (meal: IMeal) => {
		dispatch(addmeal(meal));
	};

	return (
		<Card
			key={meal?._id}
			className="relative p-2 shadow-lg rounded-xl transition-transform hover:scale-105 bg-white flex flex-col h-full"
		>
			{/* Add to Cart Button */}
			<Button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md border-2 border-primary hover:bg-primary transition duration-300 ease-in-out">
				{itemCount > 0 && (
					<span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
						{itemCount}
					</span>
				)}
				<ShoppingCart size={20} className="text-primary" />
			</Button>

			{/* Centered Image */}
			<div className="flex justify-center -mt-16 mb-4">
				<Image
					src={meal?.image[0]}
					alt={meal?.name}
					width={120}
					height={120}
					className="rounded-full border-4 border-primary w-28 h-28 object-cover shadow-md"
				/>
			</div>

			<CardContent className="text-center space-y-4 flex flex-col flex-grow">
				{/* Meal Name (Fixed Height) */}
				<h3 className="text-xl font-semibold text-primary min-h-[56px] max-h-[56px] flex items-center justify-center overflow-hidden text-ellipsis text-center">
					{meal?.name}
				</h3>

				{/* Cuisine Type and Dietary Preferences (Fixed Height) */}
				<div className="flex justify-center items-center  gap-1 flex-wrap h-[50px] overflow-hidden">
					<span className="bg-gray-200 text-xs px-3 py-1 rounded-full text-gray-800 whitespace-nowrap">
						{meal?.cuisineType}
					</span>
					{meal.dietaryPreferences.map((diet, i) => (
						<span
							className="bg-gray-200 text-xs px-4 py-1 rounded-full text-gray-800 whitespace-nowrap "
							key={i}
							title={diet}
						>
							{diet}
						</span>
					))}
				</div>

				{/* Description (Fixed Height) */}
				<p className="text-gray-600 text-sm mt-2 min-h-[52px] max-h-[62px] overflow-hidden text-ellipsis text-center line-clamp-3">
					{meal?.description}
				</p>

				{/* Price */}
				<span className="text-xl font-bold text-primary">
					{" "}
					BDT {meal?.price}{" "}
				</span>

				{/* Ensure Button is Always at Bottom */}
				<div className="mt-auto flex justify-center">
					<Button
						onClick={() => handleAddProduct(meal)}
						className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300 ease-in-out"
						disabled={meal?.availability == false}
					>
						{itemCount > 0 ? `Added (${itemCount})` : "Add to Cart"}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default MealCard;
