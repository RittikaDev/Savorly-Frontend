import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import Image from "next/image";

// Import category images
import NonVeg from "@/assets/category/non-veg.png";
import keto from "@/assets/category/keto.png";
import vegan from "@/assets/category/vegan.png";
import GlutenFree from "@/assets/category/gluten-free.png";
import LowCarb from "@/assets/category/LowCarb.png";

// Category data array
const categories = [
	{ src: NonVeg, title: "Non Veg" },
	{ src: keto, title: "Keto" },
	{ src: vegan, title: "Vegan" },
	{ src: GlutenFree, title: "Gluten Free" },
	{ src: LowCarb, title: "Low Carb" },
];

const Category = () => {
	return (
		<SavorlyContainer className="my-20">
			<div className="flex items-center justify-center mb-12">
				<h2 className="text-4xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
					Category
				</h2>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-4">
				{categories.map((category, index) => (
					<div
						key={index}
						className="flex flex-col items-center bg-rose-50 gap-6 p-4 rounded-lg group cursor-pointer hover:bg-rose-300"
					>
						<Image
							src={category.src}
							width={80}
							height={80}
							alt={`${category.title} icon`}
							className="group-hover:scale-125 transition-all ease-in-out"
						/>
						<h2 className="text-primary text-xl font-semibold">
							{category.title}
						</h2>
					</div>
				))}
			</div>
		</SavorlyContainer>
	);
};

export default Category;
