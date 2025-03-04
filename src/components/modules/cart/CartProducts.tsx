"use client";

import Image from "next/image";
import emptyCart from "@/assets/empty-cart.png";
import { useAppSelector } from "@/redux/hooks";
import { Cartmeal, orderedMealsSelector } from "@/redux/features/cartSlice";
import CartMealCard from "./CartProductCard";
export default function CartProducts() {
	const meals = useAppSelector(orderedMealsSelector);

	return (
		<div className="border border-gray-300 bg-white shadow-lg rounded-lg col-span-8 h-full row-span-3 p-8 space-y-6">
			{meals.length === 0 && (
				<div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-sm">
					<p className="text-2xl font-bold text-gray-700">Your cart is empty</p>
					<p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
						Your stomach is rumbling, but your cart is empty! Fill it up with
						some delicious meals before hunger takes over.
					</p>
					<div className="flex justify-center items-center mt-5">
						<Image src={emptyCart} alt="empty cart" className="w-64 h-auto" />
					</div>
				</div>
			)}

			{meals?.map((meal: Cartmeal) => (
				<CartMealCard key={meal._id} meal={meal} />
			))}
		</div>
	);
}
