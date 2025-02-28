// import { Button } from "@/components/ui/button";
// import CategoryCard from "@/components/ui/core/CategoryCard";
import EliteContainer from "@/components/ui/core/EliteContainer";
import { getAllCategories } from "@/services/Category";
// import { ICategory } from "@/types";
import Image from "next/image";
// import Link from "next/link";

import Denim from "@/assets/category/denim.jpg";
import Slider2 from "@/assets/hero_section/slider2.jpg";
import Slider3 from "@/assets/hero_section/slider3.jpg";
import Slider4 from "@/assets/hero_section/slider4.jpg";
import Slider5 from "@/assets/hero_section/slider5.jpg";

const Category = async () => {
	const { data: categories } = await getAllCategories();

	console.log(categories);

	return (
		<EliteContainer className="my-20">
			<section className="p-8 grid grid-cols-3 gap-8">
				{/* Left Text Section */}
				<div className="col-span-1 flex flex-col justify-center">
					<h2 className="text-xl tracking-wide text-center md:text-left">
						P R E - S P R I N G 2 0 2 5
					</h2>
					<p className="mt-4 text-gray-600 text-sm leading-loose">
						“MY PRE-SPRING 2025 COLLECTION IS ABOUT A NEW KIND OF LUXURIOUS
						SPORTSWEAR. IT CELEBRATES THE SPIRIT OF UTILITY WITH THE ROMANCE OF
						WATERCOLOR FLORALS AND SHINY SILKS FOR A TOUCH OF SEXY NONCHALANCE.
						THE <span className="font-semibold">WOMAN</span> I DESIGN FOR LOVES
						THE INDEPENDENCE OF DRESSING FOR WHO SHE IS FROM DAY TO NIGHT FROM
						SEASON TO SEASON.”
					</p>
					<p className="mt-4 text-lg italic">- Roy</p>
				</div>

				{/* Image Grid */}
				<div className="col-span-2 grid grid-cols-3 gap-4">
					{/* Left Images */}
					<div className="flex flex-col gap-4">
						<Image
							src={Denim}
							alt="Left Image 1"
							width={300}
							height={400}
							className="rounded-xl object-cover w-full"
						/>
						<Image
							src={Slider2}
							alt="Left Image 2"
							width={300}
							height={400}
							className="rounded-xl object-cover w-full"
						/>
					</div>

					{/* Middle Image (Spans two rows) */}
					<div className="row-span-2">
						<Image
							src={Slider3}
							alt="Middle Image"
							width={400}
							height={780}
							className="rounded-xl object-cover w-full "
							style={{ height: "98%" }}
						/>
					</div>

					{/* Right Images */}
					<div className="flex flex-col gap-4">
						<Image
							src={Slider4}
							alt="Right Image 1"
							width={300}
							height={400}
							className="rounded-xl object-cover w-full"
						/>
						<Image
							src={Slider5}
							alt="Right Image 2"
							width={300}
							height={400}
							className="rounded-xl object-cover w-full"
						/>
					</div>
				</div>
			</section>
			{/* <div className="flex items-center justify-between">
				<h2 className="text-3xl font-bold">Category</h2>
				<Link href="/products">
					<Button variant="outline" className="rounded-full">
						View All
					</Button>
				</Link>
			</div>
			<div className="grid grid-cols-6 gap-6 mt-10">
				{categories?.slice(0, 6).map((category: ICategory, idx: number) => (
					<CategoryCard key={idx} category={category} />
				))}
			</div> */}
		</EliteContainer>
	);
};

export default Category;
