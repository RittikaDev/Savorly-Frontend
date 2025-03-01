"use client";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllCuisine, getDietaryPreference } from "@/services/Product";

export default function FilterSidebar() {
  const [isLoading, setIsLoading] = useState(false);

  const [diet, setDiet] = useState([]);
  const [cusine, setCusine] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [{ data: dietData }, { data: cusineData }] = await Promise.all([
          getDietaryPreference(),
          getAllCuisine(),
        ]);
        console.log(dietData);
        setDiet(dietData);
        setCusine(cusineData);
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
    <div className="p-6  bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter</h2>
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => {
              router.push(`${pathname}`, {
                scroll: false,
              });
            }}
            size="sm"
            className="bg-black hover:bg-gray-700 ml-5"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Product Types */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Dietery Preference</h2>
        {!isLoading && (
          <RadioGroup className="space-y-2">
            {diet?.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  onClick={() =>
                    handleSearchQuery("dietaryPreferences", category)
                  }
                  value={category}
                  id={category}
                />
                <Label htmlFor={category} className="text-gray-500 font-light">
                  {category}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
      {/* Cusine */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Cusine</h2>
        {!isLoading && (
          <RadioGroup className="space-y-2">
            {cusine?.map((brand, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem
                  onClick={() => handleSearchQuery("cuisineType", brand)}
                  value={brand}
                  id={brand}
                />
                <Label htmlFor={brand} className="text-gray-500 font-light">
                  {brand}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
      {/* Available */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Availability</h2>
        {!isLoading && (
          <RadioGroup className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery("availability", "Available")}
                value="Available"
                id="available"
              />
              <Label htmlFor="available" className="text-gray-500 font-light">
                Available
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery("availability", "Unavailable")}
                value="Unavailable"
                id="unavailable"
              />
              <Label htmlFor="unavailable" className="text-gray-500 font-light">
                Unavailable
              </Label>
            </div>
          </RadioGroup>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Rating</h2>
        <RadioGroup className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery("rating", rating)}
                value={`${rating}`}
                id={`rating-${rating}`}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    size={18}
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
