"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import {
  createMealPreferences,
  getMealPreferences,
} from "@/services/MealPreferences";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";

const DIETARY_OPTIONS = ["Vegan", "Veg", "Keto", "Gluten-Free", "Non Veg"];

const ManagePreferencePage = () => {
  const { user } = useUser();

  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [] as string[],
    preferredCuisines: [] as string[],
    portionSize: "Medium",
  });

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string[]>([]);

  const options = [
    "Mexican",
    "Italian",
    "Indian",
    "Chinese",
    "Japanese",
    "Thai",
  ];

  useEffect(() => {
    if (!user?.userId) return;

    const fetchPreferences = async () => {
      try {
        const data = await getMealPreferences(user.userId);
        if (data) {
          setPreferences({
            dietaryRestrictions: data.data.dietaryRestrictions || [],
            preferredCuisines: data.data.preferredCuisines || [],
            portionSize: data.data.portionSize || "Medium",
          });
          setSelectedSpecialties(data.data.preferredCuisines || []);
          setSelectedDiet(data.data.dietaryRestrictions || []);
        }
      } catch (error) {
        console.error("Error fetching meal preferences:", error);
      }
    };

    fetchPreferences();
  }, [user]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (e.target.checked)
      setSelectedSpecialties([...selectedSpecialties, value]);
    else
      setSelectedSpecialties(
        selectedSpecialties.filter((item) => item !== value)
      );
  };

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

  // Handle portion size change
  const handlePortionSizeChange = (value: string) => {
    setPreferences((prev) => ({ ...prev, portionSize: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await createMealPreferences(user?.userId, {
        dietaryRestrictions: selectedDiet,
        preferredCuisines: selectedSpecialties,
        portionSize: preferences.portionSize,
      });
      // console.log(response);
      if (response && response.success)
        toast.success("Meal preferences updated successfully!");
      else toast.error("Failed to save preferences");
    } catch (error) {
      console.log(error);
      toast.error("Error updating preferences");
    }
  };

  return (
    <SavorlyContainer>
      <Card className="bg-white shadow-lg rounded-lg p-8 px-40">
        <CardHeader className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-primary text-transparent bg-clip-text z-10 mb-6">
            Manage Meal Preferences
          </h2>
          <p className="text-sm text-gray-600 mt-3">
            Set your dietary restrictions, preferred cuisines, and portion
            sizes.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Dietary Restrictions */}
          <div className="space-y-6">
            <label
              htmlFor="dietaryRestrictions"
              className="block text-lg font-medium text-gray-700"
            >
              Dietary Restrictions
            </label>
            <div className="flex flex-wrap space-x-8 items-center">
              {DIETARY_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedDiet.includes(option)}
                    onChange={() =>
                      toggleSelection(option, setSelectedDiet, selectedDiet)
                    }
                    className="h-5 w-5 text-rose-500 border-gray-300 rounded"
                  />
                  {option}
                </label>
              ))}
            </div>
            {/* Selected Dietary Preferences */}
            <div className="mt-6">
              <label
                htmlFor="selectedDiet"
                className="block text-sm text-gray-700"
              >
                Selected Diet Preferences
              </label>
              <div className="flex flex-wrap space-x-4 mt-3">
                {selectedDiet.map((option, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-sm px-4 py-2 rounded-full text-gray-700"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Cuisine Specialties */}
          <div className="space-y-6">
            <label
              htmlFor="cuisineSpecialties"
              className="block text-lg font-medium text-gray-700"
            >
              Cuisine Specialties
            </label>
            <div className="flex flex-wrap space-x-8 items-center">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    id={option}
                    value={option}
                    checked={selectedSpecialties.includes(option)}
                    onChange={handleChange}
                    className="h-5 w-5 text-rose-500 border-gray-300 rounded"
                  />
                  <label htmlFor={option} className="ml-3">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {/* Selected Cuisines */}
            <div className="mt-6">
              <label
                htmlFor="selectedCuisines"
                className="block text-sm text-gray-700"
              >
                Selected Cuisines
              </label>
              <div className="flex flex-wrap space-x-4 mt-3">
                {selectedSpecialties.map((option, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 text-sm px-4 py-2 rounded-full text-gray-700"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portion Size */}
          <div className="mt-6">
            <Label
              htmlFor="portionSize"
              className="block text-lg font-medium text-gray-700"
            >
              Portion Size
            </Label>
            <Select
              onValueChange={handlePortionSizeChange}
              defaultValue={preferences.portionSize}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select portion size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center mt-8">
          <Button
            onClick={handleSubmit}
            className="bg-primary text-white px-8 py-3 rounded-md hover:bg-rose-800 transition"
          >
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </SavorlyContainer>
  );
};

export default ManagePreferencePage;
