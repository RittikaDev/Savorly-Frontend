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
	updateScheduledDelivery,
	updateSpiceLevel,
} from "@/redux/features/cartSlice";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function MealCustomization() {
	const [date, setDate] = useState<Date>();

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
	const handleScheduledDelivery = (date: Date | undefined) => {
		// console.log(date?.toISOString());
		setDate(date);
		if (date) dispatch(updateScheduledDelivery(date.toISOString()));
	};

	return (
		<div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5">
			<div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 flex flex-col gap-4">
				<h2 className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
					Meal Customization
				</h2>

				<div className="grid grid-cols-2 gap-4">
					{/* Spice Level Selection */}
					<div>
						<Select onValueChange={(spice) => handleSpiceSelect(spice)}>
							<SelectTrigger>
								<SelectValue placeholder="Choose Spice Level" />
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
					<div className="flex items-center gap-2">
						<Checkbox
							onCheckedChange={(isChecked: boolean) =>
								handleAddonChange("sauce", isChecked)
							}
						/>
						<span className="text-sm text-gray-700">Extra Sauce</span>
					</div>
				</div>

				{/* Special Instructions */}
				<Textarea
					placeholder="Any special requests or dietary restrictions?"
					onChange={(e) => handleDiteryRestrictions(e.target.value)}
					rows={3}
					className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
				/>

				{/* Delivery Date Picker */}
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={`w-full justify-start text-left font-normal flex items-center gap-2 ${
								!date ? "text-gray-500" : ""
							}`}
						>
							<CalendarIcon />
							{date ? format(date, "PPP") : <span>Select Delivery Date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							onSelect={handleScheduledDelivery}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
