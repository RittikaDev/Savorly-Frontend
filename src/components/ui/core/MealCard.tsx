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

	console.log("from product cart", meal);

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
			className="relative p-6 shadow-lg rounded-xl transition-transform hover:scale-105 bg-white"
		>
			{/* Add to Cart Button with Icon and Item Count */}
			{/* onClick={() => handleAddProduct(meal)} */}
			<Button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md border-2 border-primary hover:bg-primary transition duration-300 ease-in-out ">
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

			<CardContent className="text-center space-y-4">
				<h3 className="text-2xl font-semibold text-primary">{meal?.name}</h3>

				{/* Cuisine Type and Dietary Preferences */}
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

				{/* Description */}
				<p className="text-gray-600 text-sm mt-2">{meal?.description}</p>

				{/* Price */}
				<span className="text-xl font-bold text-primary">
					BDT {meal?.price}
				</span>

				{/* Centered Add to Cart Button */}
				<div className="flex justify-center items-center mt-4">
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
