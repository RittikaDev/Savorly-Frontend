import EliteContainer from "@/components/ui/core/EliteContainer";

import SiteTitle from "./SiteTitle";
import ImageSliders from "./ImageSliders";
import BannerRightSection from "./BannerRightSection";

const HeroSection = () => {
	return (
		<EliteContainer>
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
		</EliteContainer>
	);
};

export default HeroSection;
