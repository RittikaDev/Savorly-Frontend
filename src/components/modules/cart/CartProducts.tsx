"use client";

import Image from "next/image";
import emptyCart from "@/assets/empty-cart.png";
import { useAppSelector } from "@/redux/hooks";
import { Cartmeal, orderedMealsSelector } from "@/redux/features/cartSlice";
import CartMealCard from "./CartProductCard";
import Link from "next/link";
export default function CartProducts() {
	const meals = useAppSelector(orderedMealsSelector);

	return (
		<div className="border border-gray-300 bg-white shadow-lg rounded-sm col-span-12 lg:col-span-8  h-full row-span-3 p-8 space-y-6">
			{meals.length === 0 && (
				<div className="flex flex-col items-center justify-center bg-gradient-to-r from-rose-50 via-rose-100 to-rose-200 p-8 rounded-xl shadow-xl">
					{/* Title */}
					<p className="text-3xl font-semibold text-rose-600">
						Oops! Your cart is empty
					</p>

					{/* Description */}
					<p className="mt-3 text-sm text-gray-600 text-center max-w-lg">
						Looks like you have not added anything yet. Explore our delicious
						meals and fill up your cart before hunger strikes!
					</p>

					{/* Illustration */}
					<div className="mt-6">
						<Image
							src={emptyCart}
							alt="Empty cart"
							className="w-72 h-auto animate-pulse"
						/>
					</div>

					{/* Call-to-Action Button */}
					<Link href="/find-meals" className="mt-6">
						<button className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-rose-700 transition duration-300">
							Start Ordering!
						</button>
					</Link>
				</div>
			)}

			{meals?.map((meal: Cartmeal) => (
				<CartMealCard key={meal._id} meal={meal} />
			))}
		</div>
	);
}
