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
import { toast } from "sonner";
import {
  createMealMenu,
  deleteMealMenu,
  updateMealMenu,
} from "@/services/Shop";
import { useUser } from "@/context/UserContext";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import TablePagination from "@/components/ui/core/NMTable/TablePagination";

const dietaryOptions = ["Vegan", "Veg", "Keto", "Gluten-Free", "Non Veg"];
const cuisineOptions = [
  "Mexican",
  "Italian",
  "Indian",
  "Chinese",
  "Japanese",
  "Thai",
];

const ManageMenusPage = ({ mealList, meta }: any) => {
  const { user } = useUser();
  const [meals, setMeals] = useState<any[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState<any>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    ingredients: string;
    portionSize: string;
    price: number;
    dietaryPreferences: string[];
    cuisineType: string;
    availability: boolean;
    rating: number;
    image: string;
  }>({
    name: "",
    description: "",
    ingredients: "",
    portionSize: "",
    price: 0,
    dietaryPreferences: [],
    cuisineType: "",
    availability: true,
    rating: 0,
    image: "",
  });

  useEffect(() => {
    setMeals(mealList);
  }, [mealList]);

  useEffect(() => {
    const {
      name,
      description,
      ingredients,
      portionSize,
      price,
      rating,
      dietaryPreferences,
      cuisineType,
    } = formData;

    // Ensure all required fields are filled
    setIsFormValid(
      name.trim() !== "" &&
        description.trim() !== "" &&
        ingredients.trim() !== "" &&
        portionSize.trim() !== "" &&
        price > 0 &&
        rating > 0 &&
        dietaryPreferences.length > 0 &&
        cuisineType.trim() !== ""
    );
  }, [formData]);

  const handleCreate = () => {
    setCurrentMeal(null);
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      portionSize: "",
      price: 0,
      dietaryPreferences: [],
      cuisineType: "",
      availability: true,
      rating: 0,
      image: "",
    });
    setModalOpen(true);
  };

  const handleEdit = (meal: any) => {
    setCurrentMeal(meal);
    setFormData({
      name: meal.name,
      description: meal.description,
      ingredients: meal.ingredients.join(", "),
      portionSize: meal.portionSize,
      price: meal.price,
      dietaryPreferences: meal.dietaryPreferences || [],
      cuisineType: meal.cuisineType,
      availability: meal.availability,
      rating: meal.rating,
      image: meal.image.join(", "),
    });
    setModalOpen(true);
  };
  const handleDelete = async (meal: any) => {
    try {
      // Call the delete API
      const res = await deleteMealMenu(meal._id, meal.providerId);

      if (res.success) {
        toast.success(res.message);

        // Update the state by removing the deleted meal from the meals array
        setMeals((prevMeals) =>
          prevMeals.filter((item) => item._id !== meal._id)
        );
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
      toast.error("An error occurred while deleting the meal.");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // For price and rating fields, ensure they are numbers
    if (name === "price" || name === "rating") {
      // Convert the value to a number, defaulting to 0 if invalid
      const numericValue = value === "" ? 0 : parseFloat(value);
      setFormData((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      }));
    } else {
      // For other fields, just update the state with the value
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: any) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          [name]: [...(prev[name as keyof typeof formData] as string[]), value],
        };
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof formData] as string[]).filter(
            (item) => item !== value
          ),
        };
      }
    });
  };

  const handleSave = async () => {
    const ingredientsArray = formData.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient !== "");

    const imageArray = formData.image
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img !== "");

    const updatedFormData = {
      ...formData,
      ingredients: ingredientsArray,
      image: imageArray,
    };

    try {
      if (user?.userId) {
        if (currentMeal) {
          const res = await updateMealMenu(
            currentMeal._id,
            user.userId,
            updatedFormData
          );
          if (res.success) {
            toast.success(res.message);
            setMeals((prevMeals) =>
              prevMeals.map((meal) =>
                meal._id === currentMeal._id
                  ? { ...meal, ...updatedFormData }
                  : meal
              )
            );
          } else toast.error(res.message);
        } else {
          const res = await createMealMenu(user.userId, updatedFormData);
          if (res.success) {
            toast.success(res.message);
            setMeals((prevMeals) => [
              ...prevMeals,
              { ...updatedFormData, _id: res.newMealId },
            ]);
          } else toast.error(res.message);
        }

        // Close modal & refresh the meal list
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };

  return (
    <SavorlyContainer>
      <div className="p-6">
        <Button onClick={handleCreate} className="mb-4">
          Create Meal
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Ingredients</TableHead>
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
                    {" "}
                    <Pencil />{" "}
                  </Button>
                  <Button variant="ghost" onClick={() => handleDelete(meal)}>
                    {" "}
                    <Trash />{" "}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {currentMeal ? "Edit Meal" : "Create Meal"}
              </DialogTitle>
            </DialogHeader>
            <form>
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
              {/* Portion, Price, Rating */}
              <div className="flex gap-4 my-4">
                <div className="flex-1">
                  <label
                    htmlFor="portionSize"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Portion Size
                  </label>
                  <select
                    name="portionSize"
                    id="portionSize"
                    value={formData.portionSize}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Portion Size</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="portionSize"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <Input
                    name="price"
                    type="number"
                    placeholder="Price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="portionSize"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating
                  </label>
                  <Input
                    name="rating"
                    type="number"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                  />
                </div>
              </div>
              <Input
                name="ingredients"
                placeholder="Ingredients (comma separated)"
                value={formData.ingredients}
                onChange={handleChange}
              />
              <div className="flex flex-wrap gap-4 mb-4">
                <label className="block text-sm font-medium text-gray-700 w-full">
                  Dietary Preferences:
                </label>
                {dietaryOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      name="dietaryPreferences"
                      checked={formData.dietaryPreferences.includes(option)}
                      onChange={handleCheckboxChange}
                      value={option}
                    />
                    {option}
                  </label>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <label className="block text-sm font-medium text-gray-700 w-full">
                  Cuisine Type:
                </label>
                {cuisineOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name="cuisineType"
                      value={option}
                      checked={formData.cuisineType === option}
                      onChange={handleChange}
                    />
                    {option}
                  </label>
                ))}
              </div>

              <Input
                name="image"
                placeholder="Image URLs (comma separated)"
                value={formData.image}
                onChange={handleChange}
              />
              <Button
                type="button"
                onClick={handleSave}
                className="flex justify-center mx-auto mt-4"
                disabled={!isFormValid}
              >
                {currentMeal ? "Update Meal" : "Save New Meal"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <TablePagination totalPage={meta?.totalPages} />
    </SavorlyContainer>
  );
};

export default ManageMenusPage;
