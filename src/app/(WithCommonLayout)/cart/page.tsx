import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import MealCustomization from "@/components/modules/cart/MealCustomization";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";

const CartPage = () => {
	return (
		<SavorlyContainer>
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
