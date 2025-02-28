import EliteContainer from "@/components/ui/core/EliteContainer";

import SiteTitle from "./SiteTitle";
import ImageSliders from "./ImageSliders";
import BannerRightSection from "./BannerRightSection";

const HeroSection = () => {
	return (
		<EliteContainer>
			<section className="flex h-screen w-full">
				{/* LEFT SECTION */}
				<div className="w-1/2 bg-red-50 flex flex-col px-12 py-8 relative">
					{/* BACKGROUND TEXT (ELITE WEAR) */}
					<SiteTitle />

					{/* CATEGORY SECTION */}
					<div className="top-1/3 relative z-10 text-base/8 right-0 text-right">
						<h3 className="text-lg text-gray-700 font-semibold">PARTY WEAR</h3>
						<ul className="mt-2 text-gray-500 space-y-2">
							<li className="hover:text-black cursor-pointer">DENIM</li>
							<li className="hover:text-black cursor-pointer">DRESS</li>
							<li className="hover:text-black cursor-pointer">CASUAL OUTFIT</li>
						</ul>
					</div>

					{/* IMAGE SLIDER (BOTTOM LEFT) */}
					<ImageSliders />
				</div>

				{/* RIGHT SECTION */}
				<BannerRightSection />
			</section>
		</EliteContainer>
	);
};

export default HeroSection;
