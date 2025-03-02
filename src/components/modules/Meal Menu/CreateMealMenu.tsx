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
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

export default function CreateMealMenu() {
	const { user, setIsLoading } = useUser();

	const [imageFiles, setImageFiles] = useState<File[] | []>([]);
	const [imagePreview, setImagePreview] = useState<string[] | []>([]);
	const form = useForm();
	const {
		formState: { isSubmitting },
	} = form;

	console.log(user, setIsLoading);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const dietaryPreferences = data?.dietaryPreferences
			.split(",")
			.map((preference: string) => preference.trim())
			.filter((preference: string) => preference !== "");

		const mealData = {
			...data,
			price: Number(data.price),
			availability: data.availability === "true",
			dietaryPreferences,
			image: imageFiles.map((file) => URL.createObjectURL(file)),
		};
		console.log(mealData, user?.userId);

		try {
			// const res = await createMealMenu(providerId, mealData);
			// if (res) toast.success("Meal menu created successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to create meal menu");
		}
	};

	return (
		<div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
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
						<FormField
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
						/>
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
						<FormField
							control={form.control}
							name="cuisineType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cuisine Type</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dietaryPreferences"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Dietary Preferences (comma-separated)</FormLabel>
									<FormControl>
										<Input {...field} value={field.value || ""} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						{imagePreview.length > 0 ? (
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
						)}
					</div>

					<Button type="submit" className="mt-5 w-full">
						{isSubmitting ? "Creating..." : "Create Meal"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
