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
import { cn } from "@/lib/utils";

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
    console.log(date?.toISOString());
    setDate(date);
    if (date) dispatch(updateScheduledDelivery(date.toISOString()));
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5">
      <div className="flex flex-col justify-between h-full">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
          Customize Your Meal
        </h2>

        {/* Spice Tolerance Dropdown */}
        <div className="mt-4">
          <Select onValueChange={(spice) => handleSpiceSelect(spice)}>
            <SelectTrigger className="mb-5">
              <SelectValue placeholder="Select Spice Level" />
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
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <Checkbox
              onCheckedChange={(isChecked: boolean) =>
                handleAddonChange("sauce", isChecked)
              }
            />
            <span>Extra Sauce</span>
          </label>
        </div>

        {/* Special Instructions */}
        <div className="mt-4">
          <Textarea
            placeholder="Do you have any specific requests or dietary restrictions?"
            onChange={(e) => handleDiteryRestrictions(e.target.value)}
            rows={5}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
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
