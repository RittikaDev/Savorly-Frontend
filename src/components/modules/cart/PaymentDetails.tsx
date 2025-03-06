"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

import { currencyFormatter } from "@/lib/currencyFormatter";
import {
	citySelector,
	clearCart,
	grandTotalSelector,
	orderedMealsSelector,
	orderSelector,
	phoneSelector,
	shippingAddressSelector,
	shippingCostSelector,
	subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { createOrder } from "@/services/cart";

import { toast } from "sonner";

export default function PaymentDetails() {
	const subTotal = useAppSelector(subTotalSelector);
	const shippingCost = useAppSelector(shippingCostSelector);
	const grandTotal = useAppSelector(grandTotalSelector);
	const city = useAppSelector(citySelector);
	const shippingAddress = useAppSelector(shippingAddressSelector);
	const phone = useAppSelector(phoneSelector);
	const order = useAppSelector((state) => {
		const selectedOrder = orderSelector(state, phone);
		return {
			...selectedOrder,
			meals: selectedOrder.meals.map((meal) => ({
				...meal,
				meal: meal.meal || "",
			})),
		};
	});
	const cartProducts = useAppSelector(orderedMealsSelector);

	const user = useUser();

	const router = useRouter();

	const dispatch = useAppDispatch();

	const handleOrder = async () => {
		const orderLoading = toast.loading("Order is being placed");
		try {
			if (!user.user) {
				router.push("/login");
				toast.error("Please login first.");
			}

			if (!city) toast.error("City is missing");

			if (!shippingAddress) toast.error("Shipping address is missing");

			if (cartProducts.length === 0) toast.error("Cart is empty");
			const res = await createOrder(order);
			// console.log(res);

			if (res.success) {
				toast.success(res.message, { id: orderLoading });
				dispatch(clearCart());
				router.push(res.data);
			}

			if (!res.success) toast.error(res.message, { id: orderLoading });
		} catch (error: any) {
			toast.error(error.message, { id: orderLoading });
		}
	};

	return (
		<div className="border border-gray-300 bg-white shadow-sm rounded-sm p-6 lg:col-span-4 col-span-12">
			<h2 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-primary text-transparent bg-clip-text mb-6">
				Order Summary
			</h2>

			<div className="space-y-3">
				<div className="flex justify-between text-gray-600">
					<p>Subtotal</p>
					<p className="font-medium">{currencyFormatter(subTotal)}</p>
				</div>

				<div className="flex justify-between text-gray-600">
					<p>Calculated Shipping</p>
					<p className="font-medium">{currencyFormatter(shippingCost)}</p>
				</div>

				<div className="flex justify-between border-t border-gray-300 pt-4 text-lg font-semibold text-gray-900">
					<p>Total</p>
					<p>{currencyFormatter(grandTotal)}</p>
				</div>
			</div>

			<Button
				onClick={handleOrder}
				className="w-full mt-6 py-3 text-lg font-medium bg-primary hover:bg-rose-700 rounded-lg transition"
			>
				Order With ShurjoPay
			</Button>
		</div>
	);
}
