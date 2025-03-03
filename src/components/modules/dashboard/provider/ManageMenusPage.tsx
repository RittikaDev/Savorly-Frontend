"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash } from "lucide-react";

const ManageMenusPage = ({ meals }: { meals: any }) => {
	// const [meals, setMeals] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentMeal, setCurrentMeal] = useState<any>(null);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		ingredients: "",
		portionSize: "",
		price: 0,
		dietaryPreferences: "",
		cuisineType: "",
		availability: true,
		rating: 0,
		image: "",
	});

	const handleCreate = () => {
		setCurrentMeal(null);
		setFormData({
			name: "",
			description: "",
			ingredients: "",
			portionSize: "",
			price: 0,
			dietaryPreferences: "",
			cuisineType: "",
			availability: true,
			rating: 0,
			image: "",
		});
		setModalOpen(true);
	};

	// const handleCreate = () => {
	// 	setCurrentMeal(null);
	// 	setModalOpen(true);
	// };

	const handleEdit = (meal: any) => {
		setCurrentMeal(meal);
		setModalOpen(true);
		setFormData({
			name: meal.name,
			description: meal.description,
			ingredients: meal.ingredients.join(", "),
			portionSize: meal.portionSize,
			price: meal.price,
			dietaryPreferences: meal.dietaryPreferences.join(", "),
			cuisineType: meal.cuisineType,
			availability: meal.availability,
			rating: meal.rating,
			image: meal.image.join(", "),
		});
	};

	const handleDelete = async (mealId: any) => {
		console.log(mealId);
		// Call delete API and update state
		// Handle create or update API request using formData
		console.log(formData);
	};
	useEffect(() => {
		if (!modalOpen) handleSubmit(new Event("submit")); // Manually trigger submit event for creating a meal
	}, [currentMeal, modalOpen]);
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// Call create/update API and update state
	};
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="p-6">
			<Button onClick={handleCreate} className="mb-4">
				Create Meal
			</Button>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>ingredients</TableHead>
						<TableHead>Price</TableHead>
						<TableHead>Cuisine</TableHead>
						<TableHead>Availability</TableHead>
						<TableHead>Rating</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{meals.map((meal: any) => (
						<TableRow key={meal._id}>
							<TableCell>{meal.name}</TableCell>
							<TableCell>{meal.ingredients.join(", ")}</TableCell>
							<TableCell>BDT {meal.price}</TableCell>
							<TableCell>{meal.cuisineType}</TableCell>
							<TableCell>
								{meal.availability ? "Available" : "Unavailable"}
							</TableCell>
							<TableCell>{meal.rating}</TableCell>
							<TableCell>
								<Button variant="ghost" onClick={() => handleEdit(meal)}>
									<Pencil />
								</Button>
								<Button variant="ghost" onClick={() => handleDelete(meal.id)}>
									<Trash />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Dialog open={modalOpen} onOpenChange={setModalOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{currentMeal ? "Edit Meal" : "Create Meal"}
						</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<Input
							name="name"
							placeholder="Name"
							required
							value={formData.name}
							onChange={handleChange}
						/>
						<Textarea
							name="description"
							placeholder="Description"
							value={formData.description}
							onChange={handleChange}
						/>
						<Input
							name="portionSize"
							placeholder="Portion Size"
							value={formData.portionSize}
							onChange={handleChange}
						/>
						<Input
							name="price"
							type="number"
							placeholder="Price"
							required
							value={formData.price}
							onChange={handleChange}
						/>
						<Input
							name="ingredients"
							placeholder="Ingredients (comma separated)"
							value={formData.ingredients}
							onChange={handleChange}
						/>
						<Input
							name="dietaryPreferences"
							placeholder="Dietary Preferences (comma separated)"
							value={formData.dietaryPreferences}
							onChange={handleChange}
						/>
						<Input
							name="cuisineType"
							placeholder="Cuisine Type"
							value={formData.cuisineType}
							onChange={handleChange}
						/>
						{/* <Select
							name="availability"
							value={formData.availability ? "true" : "false"}
							onChange={handleChange}
						>
							<SelectOption value="true">Available</SelectOption>
							<SelectOption value="false">Unavailable</SelectOption>
						</Select> */}
						<Input
							name="rating"
							type="number"
							placeholder="Rating"
							value={formData.rating}
							onChange={handleChange}
						/>
						<Input
							name="image"
							placeholder="Image URLs (comma separated)"
							value={formData.image}
							onChange={handleChange}
						/>
						<Button type="submit">Save</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ManageMenusPage;
