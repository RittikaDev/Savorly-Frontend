import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import MealCustomization from "@/components/modules/cart/MealCustomization";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import { CreditCard, Map, ShoppingCart, Utensils } from "lucide-react";

const CartPage = () => {
	const steps = [
		{ name: "Cart", icon: <ShoppingCart />, status: "completed" },
		{ name: "Address", icon: <Map />, status: "in-progress" },
		{ name: "Meal Customization", icon: <Utensils />, status: "upcoming" },
		{ name: "Payment", icon: <CreditCard />, status: "upcoming" },
	];
	return (
		<SavorlyContainer>
			{/* Progress Bar */}
			<div className="hidden lg:flex items-center justify-between mb-6 relative">
				{steps.map((step, index) => (
					<div
						key={index}
						className="flex items-center justify-center space-x-2 relative flex-1"
					>
						{/* Icon */}
						<div className="flex flex-col items-center">
							<div
								className={`w-12 h-12 rounded-full flex items-center justify-center ${"bg-primary text-white"}`}
							>
								{step.icon}
							</div>
							<div className="text-center mt-2">{step.name}</div>{" "}
							{/* Centered Name */}
						</div>

						{/* Connecting Line (continuous) */}
						{index < steps.length - 1 && (
							<div
								className={`absolute top-1/3 left-48 h-1 ${"bg-gray-300"}`}
								style={{
									width: "90%",
								}}
							></div>
						)}
					</div>
				))}
			</div>

			<div className="grid grid-cols-12 gap-8 my-5">
				<CartProducts />
				<Address />
				<MealCustomization />
				<PaymentDetails />
			</div>
		</SavorlyContainer>
	);
};

export default CartPage;
