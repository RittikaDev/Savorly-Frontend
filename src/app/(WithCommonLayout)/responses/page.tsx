import CreateOrderResponse from "@/components/modules/order-reponse/CreateOrderResponse";
import { getProviderSpecificOrders } from "@/services/Order";
import React from "react";

const OrderResponse = async ({
	searchParams,
}: {
	searchParams: Promise<{ page: string }>;
}) => {
	const { page } = await searchParams;

	const { data, paginationMetaData } = await getProviderSpecificOrders(
		page,
		"4"
	);
	return (
		<CreateOrderResponse orderResponseList={data} meta={paginationMetaData} />
	);
};
export default OrderResponse;
