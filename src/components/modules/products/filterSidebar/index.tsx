"use client";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	getAllCuisine,
	getAllProviders,
	getDietaryPreference,
} from "@/services/Meals";

export default function FilterSidebar() {
	const [isLoading, setIsLoading] = useState(false);

	const [diet, setDiet] = useState([]);
	const [cusine, setCusine] = useState([]);
	interface Provider {
		_id: string;
		restaurantName: string;
	}

	const [providers, setProviders] = useState<Provider[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const [
					{ data: dietData },
					{ data: cusineData },
					{ data: providerData },
				] = await Promise.all([
					getDietaryPreference(),
					getAllCuisine(),
					getAllProviders(),
				]);
				// console.log(providerData);
				setDiet(dietData);
				setCusine(cusineData);
				setProviders(providerData);
			} catch (error: any) {
				console.error(error);
				toast.error("Failed to fetch filters");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSearchQuery = (query: string, value: string | number) => {
		// http://localhost:3000/products?brands=82350482560349
		// brands IS query AND THE NUMBER AFTER THAT IS THE value
		const params = new URLSearchParams(searchParams.toString());

		params.set(query, value.toString()); // WILL SET LIKE THIS => http://localhost:3000/products?brands=82350482560349&CATEGORY=CAT AND LIKE THIS, FOR EACH FILTER WILL BE CONCATENATED

		// http://localhost:3000/products?brands=82350482560349 SETTING THIS AS THE URL, WHEN A FILTER IS CLICKED
		router.push(`${pathname}?${params.toString()}`, {
			scroll: false, // SO THAT IT DOES NOT SCROLL TO TOP
		});
	};

	return (
		<div className="p-8 bg-gray-50 rounded-lg shadow-lg">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-xl font-semibold text-primary">Filter</h2>
				{searchParams.toString().length > 0 && (
					<Button
						onClick={() => {
							router.push(`${pathname}`, {
								scroll: false,
							});
						}}
						size="sm"
						className="bg-primary hover:bg-rose-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
					>
						Clear Filters
					</Button>
				)}
			</div>

			{/* Meal Provider */}
			<div className="mb-8">
				<h3 className="text-lg font-semibold mb-4 text-primary">
					Meal Provider
				</h3>
				{!isLoading && (
					<RadioGroup className="space-y-4">
						{providers?.map((provider, index) => (
							<div key={index} className="flex items-center space-x-4">
								<RadioGroupItem
									onClick={() => handleSearchQuery("providerId", provider._id)}
									value={provider._id}
									id={provider._id}
									className="text-gray-700"
								/>
								<Label
									htmlFor={provider._id}
									className="text-gray-600 font-medium"
								>
									{provider?.restaurantName}
								</Label>
							</div>
						))}
					</RadioGroup>
				)}
			</div>

			{/* Dietary Preferences */}
			<div className="mb-8">
				<h3 className="text-lg font-semibold mb-4 text-primary">
					Dietary Preference
				</h3>
				{!isLoading && (
					<RadioGroup className="space-y-4">
						{diet?.map((category, index) => (
							<div key={index} className="flex items-center space-x-4">
								<RadioGroupItem
									onClick={() =>
										handleSearchQuery("dietaryPreferences", category)
									}
									value={category}
									id={category}
									className="text-gray-700"
								/>
								<Label htmlFor={category} className="text-gray-600 font-medium">
									{category}
								</Label>
							</div>
						))}
					</RadioGroup>
				)}
			</div>

			{/* Cuisine */}
			<div className="mb-8">
				<h3 className="text-lg font-semibold mb-4 text-primary">Cuisine</h3>
				{!isLoading && (
					<RadioGroup className="space-y-4">
						{cusine?.map((brand, index) => (
							<div key={index} className="flex items-center space-x-4">
								<RadioGroupItem
									onClick={() => handleSearchQuery("cuisineType", brand)}
									value={brand}
									id={brand}
									className="text-gray-700"
								/>
								<Label htmlFor={brand} className="text-gray-600 font-medium">
									{brand}
								</Label>
							</div>
						))}
					</RadioGroup>
				)}
			</div>

			{/* Availability */}
			<div className="mb-8">
				<h3 className="text-lg font-semibold mb-4 text-primary">
					Availability
				</h3>
				{!isLoading && (
					<RadioGroup className="space-y-4">
						<div className="flex items-center space-x-4">
							<RadioGroupItem
								onClick={() => handleSearchQuery("availability", "Available")}
								value="Available"
								id="available"
								className="text-gray-700"
							/>
							<Label htmlFor="available" className="text-gray-600 font-medium">
								Available
							</Label>
						</div>
						<div className="flex items-center space-x-4">
							<RadioGroupItem
								onClick={() => handleSearchQuery("availability", "Unavailable")}
								value="Unavailable"
								id="unavailable"
								className="text-gray-700"
							/>
							<Label
								htmlFor="unavailable"
								className="text-gray-600 font-medium"
							>
								Unavailable
							</Label>
						</div>
					</RadioGroup>
				)}
			</div>

			{/* Rating */}
			<div className="mb-8">
				<h3 className="text-lg font-semibold mb-4 text-primary">Rating</h3>
				<RadioGroup className="space-y-4">
					{[5, 4, 3, 2, 1].map((rating) => (
						<div key={rating} className="flex items-center space-x-4">
							<RadioGroupItem
								onClick={() => handleSearchQuery("rating", rating)}
								value={`${rating}`}
								id={`rating-${rating}`}
								className="text-gray-700"
							/>
							<Label
								htmlFor={`rating-${rating}`}
								className="flex items-center space-x-1"
							>
								{Array.from({ length: 5 }, (_, i) => (
									<Star
										size={20}
										key={i}
										fill={i < rating ? "orange" : "lightgray"}
										stroke={i < rating ? "orange" : "lightgray"}
									/>
								))}
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>
		</div>
	);
}
