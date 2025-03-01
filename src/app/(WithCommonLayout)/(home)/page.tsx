import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/HeroSection";
import Intro from "@/components/modules/home/Intro";
import TopBrands from "@/components/modules/home/TopBrands";

const HomePage = () => {
	return (
		<div>
			<HeroSection />
			<Intro />
			<Category />
			<FeaturedProducts />
			<FlashSale />
			<TopBrands />
		</div>
	);
};

export default HomePage;
