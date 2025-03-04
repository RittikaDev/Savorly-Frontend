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
        throw new Error("Please login first.");
      }

      if (!city) throw new Error("City is missing");

      if (!shippingAddress) throw new Error("Shipping address is missing");

      if (cartProducts.length === 0)
        throw new Error("Cart is empty, what are you trying to order ??");
      const res = await createOrder(order);
      console.log(res);

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
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
        Payment Details
      </h2>
      <>
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-semibold">{currencyFormatter(subTotal)}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-500">Shipment Cost</p>
            <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
          </div>
        </div>
        <div className="flex justify-between mt-10 mb-5">
          <p className="text-gray-500">Grand Total</p>
          <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
        </div>
      </>
      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
