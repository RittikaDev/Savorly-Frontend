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
		<div className="bg-white rounded-lg flex p-5 gap-5 shadow-md border border-gray-200">
			{/* Meal Image */}
			<div className="h-full w-32 rounded-md overflow-hidden">
				<Image
					src={meal?.image?.[0] || Empty}
					height={200}
					width={200}
					alt={meal?.name || "meal"}
					className="aspect-square object-cover"
				/>
			</div>

			{/* Meal Details */}
			<div className="flex flex-col justify-between flex-grow">
				<h1 className="text-xl font-semibold">{meal?.name}</h1>
				<p className="text-gray-600 text-sm mt-1">{meal?.description}</p>

				<div className="flex flex-wrap gap-2 my-2 text-sm text-gray-500">
					<p>
						<span className="font-semibold">Cuisine:</span> {meal?.cuisineType}
					</p>
					<p>
						<span className="font-semibold">Portion Size:</span>{" "}
						{meal?.portionSize}
					</p>
					<p>
						<span className="font-semibold">Availability:</span>{" "}
						<span
							className={meal?.availability ? "text-green-600" : "text-red-600"}
						>
							{meal?.availability ? "In Stock" : "Out of Stock"}
						</span>
					</p>
				</div>

				{/* Ingredients & Dietary Preferences */}
				<div className="text-xs text-gray-500">
					<p>
						<span className="font-semibold">Ingredients:</span>{" "}
						{meal?.ingredients?.join(", ") || "N/A"}
					</p>
					<p>
						<span className="font-semibold">Dietary Preferences:</span>{" "}
						{meal?.dietaryPreferences?.join(", ") || "None"}
					</p>
				</div>

				<hr className="my-2" />

				{/* Price & Quantity Controls */}
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">
						Price: {currencyFormatter(meal.price)}
					</h2>
					<div className="flex items-center gap-2">
						<p className="text-gray-500 font-semibold">Quantity</p>
						<Button
							onClick={() => handleDecrementQuantity(meal._id!)}
							variant="outline"
							className="size-8 rounded-sm"
						>
							<Minus />
						</Button>
						<p className="font-semibold text-xl p-2">{meal?.orderQuantity}</p>
						<Button
							onClick={() => handleIncrementQuantity(meal._id!)}
							variant="outline"
							className="size-8 rounded-sm"
						>
							<Plus />
						</Button>
						<Button
							onClick={() => handleRemoveMeal(meal._id!)}
							variant="outline"
							className="size-8 rounded-sm"
						>
							<Trash className="text-red-500/50" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
