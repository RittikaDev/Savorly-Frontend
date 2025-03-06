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
			<div className="bg-gradient-to-r from-rose-50 to-rose-200  p-6 rounded-sm shadow-lg my-6 border border-rose-700 relative overflow-hidden">
				{/* Decorative Icons */}
				<div className="absolute top-2 right-3 opacity-20 text-6xl">🚚</div>
				<div className="absolute bottom-2 left-3 opacity-20 text-6xl">📦</div>

				{/* Content */}
				<h3 className="text-2xl font-bold flex items-center gap-2">
					📢 Delivery Information
				</h3>
				<p className="mt-3 text-base flex items-center gap-2">
					🕒 <span className="font-medium">Earliest Delivery Time:</span> Within{" "}
					<strong>2-3 hours</strong> after placing your order.
				</p>
				<p className="mt-2 text-base flex items-center gap-2">
					🚀 <span className="font-medium">Express Delivery:</span> Available
					for select areas. Additional charges may apply.
				</p>
				<p className="mt-2 text-base flex items-center gap-2">
					💡 <span className="font-medium">Pro Tip:</span> Place your order
					before <strong>8 PM</strong> for same-day delivery!
				</p>
			</div>
		</SavorlyContainer>
	);
};

export default CartPage;
