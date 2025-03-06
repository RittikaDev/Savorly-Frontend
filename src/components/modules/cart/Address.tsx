"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cities } from "@/constants/cities";
import {
	citySelector,
	phoneSelector,
	shippingAddressSelector,
	updateCity,
	updatePhone,
	updateShippingAddress,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Address() {
	const dispatch = useAppDispatch();
	const selectedCity = useAppSelector(citySelector);
	const shippingAddress = useAppSelector(shippingAddressSelector);
	const phoneNumber = useAppSelector(phoneSelector);

	const handleCitySelect = (city: string) => {
		dispatch(updateCity(city));
	};
	const handlePhone = (city: string) => {
		dispatch(updatePhone(city));
	};

	const handleShippingAddress = (address: string) => {
		dispatch(updateShippingAddress(address));
		console.log(selectedCity);
		console.log(shippingAddress);
		console.log(phoneNumber);
	};

	return (
		<>
			<div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 p-6">
				<div className="bg-white rounded-md shadow-md border border-gray-200 p-4 flex flex-col gap-4">
					<h2 className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
						Address Details
					</h2>

					<div className="grid grid-cols-2 gap-4">
						{/* City Selection */}
						<Select onValueChange={(city) => handleCitySelect(city)}>
							<SelectTrigger>
								<SelectValue placeholder="City" />
							</SelectTrigger>
							<SelectContent>
								{cities.map((city) => (
									<SelectItem key={city} value={city}>
										{city}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						{/* Phone Number */}
						<input
							type="text"
							className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
							placeholder="Phone Number"
							onChange={(e) => handlePhone(e.target.value)}
						/>
					</div>

					{/* Shipping Address */}
					<Textarea
						onChange={(e) => handleShippingAddress(e.target.value)}
						rows={3}
						className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
						placeholder="Shipping Address"
					/>
				</div>
			</div>
		</>
	);
}
