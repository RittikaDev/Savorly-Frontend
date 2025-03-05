"use client";
import { IMeal } from "@/types";
import FilterSidebar from "./filterSidebar";
import MealCard from "@/components/ui/core/MealCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LoadingPage from "@/components/shared/Loader";

const AllMeals = ({ meals }: { meals: IMeal[] }) => {
	const [page, setPage] = useState<number>(1);
	const limit = 6; // Number of meals per page
	const totalPages = Math.ceil(meals.length / limit);
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		// Get the current page from the URL
		const pageParam = searchParams.get("page");
		if (pageParam) setPage(Number(pageParam));
	}, [searchParams]);

	const updatePageInURL = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const paginatedMeals = meals.slice((page - 1) * limit, page * limit);

	// console.log("all roducts", meals);
	return (
		<Suspense fallback={<LoadingPage />}>
			<div className="flex gap-8 my-10">
				<div className="w-full max-w-sm">
					<FilterSidebar />
				</div>
				<div className="flex flex-col gap-8 my-10">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{paginatedMeals?.map((meal: IMeal, idx: number) => (
							<MealCard key={idx} meal={meal} />
						))}
					</div>

					{/* Pagination buttons below the meal cards */}
					<div className="flex justify-center mt-6">
						<button
							onClick={() => {
								if (page > 1) updatePageInURL(page - 1);
							}}
							disabled={page === 1}
							className="px-4 py-2 border rounded-lg mr-4"
						>
							Previous
						</button>
						<span className="mx-4 pt-2">{`Page ${page} of ${totalPages}`}</span>
						<button
							onClick={() => {
								if (page < totalPages) updatePageInURL(page + 1);
							}}
							disabled={page === totalPages}
							className="px-4 py-2 border rounded-lg ml-4"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</Suspense>
	);
};

export default AllMeals;
