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
			<div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 ">
				<div className="flex flex-col justify-between h-full">
					<h1 className="text-2xl font-bold">Address</h1>
					<p className="text-gray-500">Enter your address.</p>
					<div className="mt-5">
						<Select onValueChange={(city) => handleCitySelect(city)}>
							<SelectTrigger className="mb-5">
								<SelectValue placeholder="Select a city" />
							</SelectTrigger>
							<SelectContent>
								{cities.map((city) => (
									<SelectItem key={city} value={city}>
										{city}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Textarea
							onChange={(e) => handleShippingAddress(e.target.value)}
							rows={5}
						/>

						{/* Phone Number Input */}
						<div className="mt-4">
							<label className="block text-gray-500 text-sm font-semibold mb-1">
								Phone Number
							</label>
							<input
								type="text"
								className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								placeholder="Enter your phone number"
								onChange={(e) => handlePhone(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
