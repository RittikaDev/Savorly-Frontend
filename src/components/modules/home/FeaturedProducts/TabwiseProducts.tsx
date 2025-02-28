"use client";
import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const TabwiseProducts = ({ products }: { products: IProduct[] }) => {
	const [gallery, setGallery] = useState<IProduct[]>([]);
	const [filteredGallery, setFilteredGallery] = useState<IProduct[]>([]);
	const [activeTab, setActiveTab] = useState<string>("all");

	// Load gallery data initially
	useEffect(() => {
		try {
			setGallery(products);
			setFilteredGallery(products);
		} catch (error) {
			console.error("Error fetching gallery data", error);
			toast.error("Error fetching gallery data");
		}
	}, [products]); // Removed `gallery` to prevent unnecessary re-renders

	// Filter function
	const filterCategory = (category: string) => {
		setActiveTab(category);
		if (category === "all") setFilteredGallery(gallery.slice(0, 8));
		else
			setFilteredGallery(
				gallery.filter((item) => item.gender === category).slice(0, 8)
			);
	};

	return (
		<div className="container mx-auto my-10 px-4 md:px-8">
			{/* Filter Tabs */}
			<div className="flex justify-center gap-4 mb-8">
				{["all", "men", "women"].map((category) => (
					<button
						key={category}
						onClick={() => filterCategory(category)}
						className={`px-5 py-2 text-lg font-semibold rounded-lg transition-all duration-300
							${
								activeTab === category
									? "bg-red-800 text-white"
									: "bg-gray-200 text-gray-700"
							}`}
					>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</button>
				))}
			</div>

			{/* Gallery Section */}
			<motion.div
				layout
				className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
			>
				<AnimatePresence>
					{filteredGallery.map((product, idx) => (
						<motion.div
							key={idx}
							layout
							className="bg-white rounded-lg shadow-lg overflow-hidden"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -30 }}
							transition={{ duration: 0.4 }}
						>
							<ProductCard key={idx} product={product} />
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};

export default TabwiseProducts;
