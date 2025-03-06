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
		<div className="bg-white rounded-md shadow-md border border-gray-200 p-4 flex items-center gap-4">
			{/* Meal Image */}
			<div className="w-24 h-24 rounded-md overflow-hidden">
				<Image
					src={meal?.image?.[0] || Empty}
					height={100}
					width={100}
					alt={meal?.name || "meal"}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Meal Details */}
			<div className="flex flex-col flex-grow">
				<h1 className="text-lg font-semibold">{meal?.name}</h1>
				<p className="text-gray-600 text-sm">{meal?.description}</p>

				<div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-3">
					<p>
						<span className="font-medium">Cuisine:</span> {meal?.cuisineType}
					</p>
					<p>
						<span className="font-medium">Size:</span> {meal?.portionSize}
					</p>
					<p>
						<span className="font-medium">Stock:</span>
						<span
							className={meal?.availability ? "text-green-600" : "text-red-600"}
						>
							{meal?.availability ? " Available" : " Out of Stock"}
						</span>
					</p>
				</div>
			</div>

			{/* Price & Quantity Controls */}
			<div className="flex flex-col items-end">
				<h2 className="text-md font-semibold">
					{currencyFormatter(meal.price)}
				</h2>

				<div className="flex items-center gap-2 mt-1">
					<Button
						onClick={() => handleDecrementQuantity(meal._id!)}
						className="size-6 p-1"
					>
						<Minus />
					</Button>

					<p className="font-semibold text-md">{meal?.orderQuantity}</p>

					<Button
						onClick={() => handleIncrementQuantity(meal._id!)}
						className="size-6 p-1"
					>
						<Plus />
					</Button>

					<Button
						onClick={() => handleRemoveMeal(meal._id!)}
						className="size-6 p-2 border border-red-300"
					>
						<Trash className="text-white" />
					</Button>
				</div>
			</div>
		</div>
	);
}
