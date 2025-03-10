"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
// import NMImageUploader from "@/components/ui/core/NMImageUploader";
// import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { createMealMenu } from "@/services/Meals";
import { IMeal } from "@/types";

import axios from "axios";

const DIETARY_OPTIONS: string[] = [
	"Vegan",
	"Veg",
	"Non Veg",
	"Gluten Free",
	"Keto",
];
const CUISINE_OPTIONS: string[] = [
	"Mexican",
	"Italian",
	"Indian",
	"Chinese",
	"Japanese",
	"Thai",
];
const PORTION_OPTIONS: string[] = ["Small", "Medium", "Large"];

export default function CreateMealMenu() {
	const { user } = useUser();

	const [imageFiles, setImageFiles] = useState<File[] | []>([]);
	const [imagePreview, setImagePreview] = useState<string[] | []>([]);
	const [loading, setLoading] = useState(false);

	const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<
		string[]
	>([]);
	const [selectedCuisineTypes, setSelectedCuisineTypes] = useState<string>("");
	const [selectedPortionSize, setSelectedPortionSize] = useState<string>("");

	const form = useForm();
	const {
		formState: { isSubmitting },
	} = form;

	const toggleSelection = (
		value: string,
		setter: any,
		selectedValues: string[]
	) => {
		setter(
			selectedValues.includes(value)
				? selectedValues.filter((item) => item !== value)
				: [...selectedValues, value]
		);
	};

	const handleImageUpload = async (event: any) => {
		const file = event.target.files[0];
		if (file) {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append("upload_preset", "WheelDeal");

			try {
				const res = await axios.post(
					`https://api.cloudinary.com/v1_1/dxm5tpw0l/image/upload`,
					formData
				);
				const imageUrl = res.data.secure_url;
				setImageFiles([file]); // Optionally store the file as well
				setImagePreview([imageUrl]); // If you want to display a preview
				console.log(imageFiles);
				setLoading(false);
			} catch (err) {
				console.error("Error uploading image", err);
				setLoading(false);
			}
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const dietaryPreferences = selectedDietaryPreferences;

		const ingredients = data?.ingredients
			.split(",")
			.map((ing: string) => ing.trim())
			.filter((ing: string) => ing !== "");

		const mealData: IMeal = {
			name: data.name,
			description: data.description,
			ingredients,
			portionSize: selectedPortionSize,
			price: Number(data.price),
			cuisineType: selectedCuisineTypes,
			dietaryPreferences,
			availability: data.availability === "true",
			image: imagePreview.length > 0 ? [imagePreview[0]] : [],
			rating: 0,
		};
		// console.log(mealData, user?.userId);

		try {
			if (user?.userId) {
				const res = await createMealMenu(user.userId, mealData);
				if (res.success) toast.success(res.message);
			} else toast.error("User ID is missing");
		} catch (err) {
			console.error(err);
			toast.error((err as any).message);
		}
	};

	return (
		<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-3xl p-5 my-5">
			<h1 className="text-xl font-semibold">Create Meal Menu</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Meal Name</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="ingredients"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ingredients (comma-separated)</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
              control={form.control}
              name="portionSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portion Size</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input type="number" {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div>
							<div className="flex flex-wrap space-x-4 items-center">
								<FormLabel>Dietary Preferences</FormLabel>
								{DIETARY_OPTIONS.map((option) => (
									<label key={option} className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={selectedDietaryPreferences.includes(option)}
											onChange={() =>
												toggleSelection(
													option,
													setSelectedDietaryPreferences,
													selectedDietaryPreferences
												)
											}
										/>
										{option}
									</label>
								))}
							</div>
							<div className="mt-4">
								<label htmlFor="selectedCuisines" className="block">
									Selected Diet Preference
								</label>
								<div className="flex flex-wrap space-x-2 mt-2">
									{selectedDietaryPreferences.map((option, index) => (
										<span
											key={index}
											className="inline-block bg-gray-200 text-sm px-3 py-1 rounded-full"
										>
											{option}
										</span>
									))}
								</div>
							</div>
						</div>

						<div className="flex flex-wrap space-x-4 items-center">
							<FormLabel>Cuisine Type</FormLabel>
							{CUISINE_OPTIONS.map((option) => (
								<label key={option} className="flex items-center gap-2">
									<input
										type="radio"
										name="cuisineType"
										value={option}
										checked={selectedCuisineTypes === option}
										onChange={() => setSelectedCuisineTypes(option)}
									/>
									{option}
								</label>
							))}
						</div>

						<div className="flex flex-wrap space-x-4 items-center">
							<FormLabel>Portion Size</FormLabel>
							{PORTION_OPTIONS.map((option) => (
								<label key={option} className="flex items-center gap-2">
									<input
										type="radio"
										name="portionSize"
										value={option}
										checked={selectedPortionSize === option}
										onChange={() => setSelectedPortionSize(option)}
									/>
									{option}
								</label>
							))}
						</div>
						<FormField
							control={form.control}
							name="availability"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Availability</FormLabel>
									<FormControl>
										<select {...field} className="border rounded p-2 w-full">
											<option value="true">Available</option>
											<option value="false">Not Available</option>
										</select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="mt-4">
						{/* Image Upload */}
						<label htmlFor="image">Image</label>
						<input
							id="image"
							type="file"
							onChange={handleImageUpload}
							className="block w-full p-2 border border-gray-300 rounded-md"
						/>
						{loading && (
							<p className="text-sm text-gray-500 mt-2">Uploading...</p>
						)}
						{/* {imagePreview.length > 0 ? (
							<ImagePreviewer
								setImageFiles={setImageFiles}
								imagePreview={imagePreview}
								setImagePreview={setImagePreview}
							/>
						) : (
							<NMImageUploader
								setImageFiles={setImageFiles}
								setImagePreview={setImagePreview}
								label="Upload Meal Images"
							/>
						)} */}
					</div>

					<Button type="submit" className="mt-5 w-full">
						{isSubmitting ? "Creating..." : "Create Meal"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
