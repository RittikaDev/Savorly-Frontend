import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/CartProducts";
import Coupon from "@/components/modules/cart/Coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import EliteContainer from "@/components/ui/core/EliteContainer";

const CartPage = () => {
	return (
		<EliteContainer>
			<ProductBanner title="Cart Page" path="Home - Cart" />
			<div className="grid grid-cols-12 gap-8 my-5">
				<CartProducts />
				<Coupon />
				<Address />
				<PaymentDetails />
			</div>
		</EliteContainer>
	);
};

export default CartPage;
