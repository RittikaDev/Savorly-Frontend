import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
	Cartmeal,
	decrementOrderQuantity,
	incrementOrderQuantity,
	removeMeal,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import Empty from "@/assets/empty.jpg";

export default function CartMealCard({ meal }: { meal: Cartmeal }) {
	const dispatch = useAppDispatch();

	// console.log(meal);

	const handleIncrementQuantity = (id: string) => {
		dispatch(incrementOrderQuantity(id));
	};

	const handleDecrementQuantity = (id: string) => {
		dispatch(decrementOrderQuantity(id));
	};

	const handleRemoveMeal = (id: string) => {
		dispatch(removeMeal(id));
	};

	return (
		<div className="bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-lg border border-gray-300 p-5 flex items-center gap-5 hover:shadow-xl transition-all duration-300">
			{/* Meal Image */}
			<div className="w-28 h-28 rounded-lg overflow-hidden shadow-md">
				<Image
					src={meal?.image?.[0] || Empty}
					height={112}
					width={112}
					alt={meal?.name || "meal"}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Meal Details */}
			<div className="flex flex-col flex-grow">
				<h1 className="text-lg font-bold text-gray-900">{meal?.name}</h1>
				<p className="text-gray-600 text-sm mt-1">{meal?.description}</p>

				<div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-3">
					<p className="flex items-center gap-1">
						<span className="font-medium text-gray-700">🍽 Cuisine:</span>{" "}
						{meal?.cuisineType}
					</p>
					<p className="flex items-center gap-1">
						<span className="font-medium text-gray-700">📏 Size:</span>{" "}
						{meal?.portionSize}
					</p>
					<p className="flex items-center gap-1">
						<span className="font-medium text-gray-700">📦 Stock:</span>
						<span
							className={
								meal?.availability
									? "text-green-600 font-medium"
									: "text-red-600 font-medium"
							}
						>
							{meal?.availability ? " Available" : " Out of Stock"}
						</span>
					</p>
				</div>
			</div>

			{/* Price & Quantity Controls */}
			<div className="flex flex-col items-end">
				<h2 className="text-lg font-semibold text-gray-900">
					{currencyFormatter(meal.price)}
				</h2>

				<div className="flex items-center gap-3 mt-2">
					<Button
						onClick={() => handleDecrementQuantity(meal._id!)}
						className="size-8 p-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
					>
						<Minus />
					</Button>

					<p className="font-semibold text-md">{meal?.orderQuantity}</p>

					<Button
						onClick={() => handleIncrementQuantity(meal._id!)}
						className="size-8 p-1 bg-primary text-white rounded-full hover:bg-rose-700"
					>
						<Plus />
					</Button>

					<Button
						onClick={() => handleRemoveMeal(meal._id!)}
						className="size-8 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
					>
						<Trash />
					</Button>
				</div>
			</div>
		</div>
	);
}
