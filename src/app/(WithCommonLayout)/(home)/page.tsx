import Category from "@/components/modules/home/Category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection";
import RoleWiseView from "@/components/modules/home/HeroSection/RoleWiseView";
import Intro from "@/components/modules/home/Intro";

const HomePage = () => {
	return (
		<>
			<HeroSection />
			<Intro />
			<Category />
			<FeaturedProducts searchParams={Promise.resolve({})} />
			<RoleWiseView />
		</>
	);
};

export default HomePage;
