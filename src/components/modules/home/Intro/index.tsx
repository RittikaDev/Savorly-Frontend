import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import { getAllCategories } from "@/services/Category";
import Image from "next/image";

import Slider7 from "@/assets/hero_section/slider7.jpg";
import Slider10 from "@/assets/hero_section/slider10.jpg";
import Slider8 from "@/assets/hero_section/slider8.jpg";
import Slider12 from "@/assets/hero_section/slider12.jpg";
import Slider11 from "@/assets/hero_section/slider11.jpg";

const Intro = async () => {
	const { data: categories } = await getAllCategories();

	console.log(categories);

	return (
		<SavorlyContainer className="my-20">
			<section className="p-8 grid grid-cols-3 gap-8">
				{/* Left Text Section */}
				<div className="col-span-1 flex flex-col justify-center">
					<h2 className="text-2xl tracking-wide font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text text-center md:text-left">
						S A V O R L Y – Craft Your Crave
					</h2>
					<p className="mt-4 text-gray-600 text-sm leading-loose">
						Savorly is a premium meal provider website that offers customers the
						ability to browse, customize, and order meals tailored to their
						preferences. Whether you’re looking for a quick lunch, a healthy
						dinner, or a special dietary option, Savorly ensures a seamless and
						personalized dining experience. The platform provides a diverse menu
						with fresh, high-quality ingredients, allowing customers to build
						their perfect meal with just a few clicks.
					</p>
				</div>

				{/* Image Grid */}
				<div className="col-span-2 grid grid-cols-3 gap-4">
					{/* Left Images */}
					<div className="flex flex-col gap-4">
						<Image
							src={Slider8}
							alt="Left Image 1"
							width={300}
							height={400}
							className="rounded-xl object-cover w-full"
						/>
						<Image
							src={Slider10}
							alt="Left Image 2"
							width={300}
							height={400}
							className="rounded-xl object-cover w-full"
						/>
					</div>

					{/* Middle Image (Spans two rows) */}
					<div className="row-span-2">
						<Image
							src={Slider7}
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
							src={Slider12}
							alt="Right Image 1"
							width={300}
							height={400}
							className="rounded-xl object-cover w-full"
						/>
						<Image
							src={Slider11}
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
		</SavorlyContainer>
	);
};

export default Intro;
