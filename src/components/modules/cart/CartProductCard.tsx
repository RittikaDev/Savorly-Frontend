import { Button } from "@/components/ui/button";
import {
	Cartmeal,
	decrementOrderQuantity,
	incrementOrderQuantity,
	removeMeal,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";

export default function CartMealCard({ meal }: { meal: Cartmeal }) {
	const dispatch = useAppDispatch();

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
		<div className="bg-white rounded-lg flex p-5 gap-5">
			<div className="h-full w-32 rounded-md overflow-hidden">
				<Image
					src={meal?.image?.[0]}
					height={200}
					width={200}
					alt="meal"
					className="aspect-square object-cover"
				/>
			</div>
			<div className="flex flex-col justify-between flex-grow">
				<h1 className="text-xl font-semibold">{meal?.name}</h1>
				<div className="flex gap-5 my-2">
					<p>
						<span className="text-gray-500">Color:</span>{" "}
						<span className="font-semibold">Black</span>
					</p>
					<p>
						<span className="text-gray-500"> Availability:</span>{" "}
						<span className="font-semibold">{meal?.availability}</span>
					</p>
				</div>
				<hr className="my-1" />
				<div className="flex items-center justify-between">
					<h2>Price: currencyFormatter(meal.price)</h2>
					<div className="flex items-center gap-2">
						<p className="text-gray-500 font-semibold">Quantity</p>
						<Button
							onClick={() => handleDecrementQuantity(meal._id)}
							variant="outline"
							className="size-8 rounded-sm"
						>
							<Minus />
						</Button>
						<p className="font-semibold text-xl p-2">{meal?.orderQuantity}</p>
						<Button
							onClick={() => handleIncrementQuantity(meal._id)}
							variant="outline"
							className="size-8 rounded-sm"
						>
							<Plus />
						</Button>
						<Button
							onClick={() => handleRemoveMeal(meal._id)}
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
