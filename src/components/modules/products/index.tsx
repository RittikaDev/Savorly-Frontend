import { IMeal } from "@/types";
import FilterSidebar from "./filterSidebar";
import MealCard from "@/components/ui/core/MealCard";

const AllMeals = ({ meals }: { meals: IMeal[] }) => {
  console.log("all roducts", meals);
  return (
    <div className="flex gap-8 my-10">
      <div className="w-full max-w-sm">
        <FilterSidebar />
      </div>
      <div>
        <div className="grid grid-cols-3 gap-8">
          {meals?.map((meal: IMeal, idx: number) => (
            <MealCard key={idx} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
