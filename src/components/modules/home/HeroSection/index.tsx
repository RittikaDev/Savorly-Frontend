import SavorlyContainer from "@/components/ui/core/SavorlyContainer";

import SiteTitle from "./SiteTitle";
import ImageSliders from "./ImageSliders";
import BannerRightSection from "./BannerRightSection";

const HeroSection = () => {
	return (
		<SavorlyContainer>
			<section className="flex h-screen w-full">
				{/* LEFT SECTION */}
				<div className="w-1/2  flex flex-col px-12 py-8 relative">
					{/* BACKGROUND TEXT (ELITE WEAR) */}
					<SiteTitle />

					{/* IMAGE SLIDER (BOTTOM LEFT) */}
					<ImageSliders />
				</div>

				{/* RIGHT SECTION */}
				<BannerRightSection />
			</section>
		</SavorlyContainer>
	);
};

export default HeroSection;
