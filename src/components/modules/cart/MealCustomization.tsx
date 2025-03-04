"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch } from "@/redux/hooks";
import { spiceLevel } from "@/constants/spiceLevels";
import {
	updateDietaryPreferences,
	updateExtraSauce,
	updateSpiceLevel,
} from "@/redux/features/cartSlice";

export default function MealCustomization() {
	const dispatch = useAppDispatch();

	const handleSpiceSelect = (spice: string) => {
		dispatch(updateSpiceLevel(spice));
	};

	const handleAddonChange = (addon: string, isChecked: boolean) => {
		const value = isChecked ? "Yes" : "No";
		dispatch(updateExtraSauce(value));
	};
	const handleDiteryRestrictions = (diet: string) => {
		dispatch(updateDietaryPreferences(diet));
	};

	return (
		<div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5">
			<div className="flex flex-col justify-between h-full">
				<h2 className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
					Customize Your Meal
				</h2>

				{/* Spice Tolerance Dropdown */}
				<div className="mt-4">
					<Select onValueChange={(spice) => handleSpiceSelect(spice)}>
						<SelectTrigger className="mb-5">
							<SelectValue placeholder="Select Spice Level" />
						</SelectTrigger>
						<SelectContent>
							{spiceLevel.map((spice) => (
								<SelectItem key={spice} value={spice}>
									{spice}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Add-ons */}
				<div className="mt-4">
					<label className="flex items-center space-x-2">
						<Checkbox
							onCheckedChange={(isChecked: boolean) =>
								handleAddonChange("sauce", isChecked)
							}
						/>
						<span>Extra Sauce</span>
					</label>
				</div>

				{/* Special Instructions */}
				<div className="mt-4">
					<Textarea
						placeholder="Do you have any specific requests or dietary restrictions?"
						onChange={(e) => handleDiteryRestrictions(e.target.value)}
						rows={5}
					/>
				</div>
			</div>
		</div>
	);
}
