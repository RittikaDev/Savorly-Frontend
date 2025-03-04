"use client";

import { Button } from "@/components/ui/button";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	getProviderSpecificOrders,
	updateOrderStatusByProvider,
} from "@/services/Order";
// import { IOrder } from "@/types/cart";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateOrderResponse = () => {
	const [orderList, setOrderList] = useState<any[]>();

	useEffect(() => {
		const fetchPreferences = async () => {
			try {
				const data = await getProviderSpecificOrders();
				setOrderList(data.data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching meal preferences:", error);
			}
		};

		fetchPreferences();
	}, []);

	const changeStatus = (orderId: string, newStatus: string) => {
		// Update the order status in the orders array
		const updatedOrders = orderList?.map((o) =>
			o._id === orderId ? { ...o, status: newStatus } : o
		);
		setOrderList(updatedOrders);
	};

	const handleStatusChange = async (
		order: any,
		orderId: string,
		providerId: string,
		newStatus: string,
		deliveryDate: string
	) => {
		try {
			console.log(orderId, providerId, newStatus, deliveryDate);
			// const res = await updateOrderStatusByProvider(
			// 	orderId,
			// 	providerId,
			// 	newStatus,
			// 	deliveryDate
			// );
			const res = await updateOrderStatusByProvider(order);
			console.log(res);
			// if (!res.ok) throw new Error("Failed to update order status");

			// const result = await res.json();
			// // Update local order list with the new status
			// setOrderList((prevOrders) =>
			// 	prevOrders.map((order) =>
			// 		order.orderId === orderId ? { ...order, status: newStatus } : order
			// 	)
			// );

			toast.success(`Order status updated to "${newStatus}" successfully!`);
		} catch (error) {
			console.log(error);
			toast.error(`Error updating order status: `);
		}
	};

	return (
		<SavorlyContainer>
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					Manage Orders
				</h2>

				<Table>
					<TableHeader>
						<TableRow>
							<TableCell className="font-medium">Order ID</TableCell>
							<TableCell className="font-medium">Ordered Meal</TableCell>
							<TableCell className="font-medium">Portion</TableCell>
							<TableCell className="font-medium">Total Price</TableCell>
							<TableCell className="font-medium">Status</TableCell>
							<TableCell className="font-medium">Action</TableCell>
						</TableRow>
					</TableHeader>

					<TableBody>
						{orderList &&
							orderList.map((order) => (
								<TableRow key={order._id}>
									<TableCell>{order._id}</TableCell>
									<TableCell>{order.mealId.name}</TableCell>
									<TableCell>{order.mealId.portionSize}</TableCell>
									<TableCell>{order.mealId.price * order.quantity}</TableCell>
									<TableCell>
										<Select
											value={order.status}
											onValueChange={(newStatus) =>
												changeStatus(order._id, newStatus)
											}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Pending">Pending</SelectItem>
												<SelectItem value="In progress">In progress</SelectItem>
												<SelectItem value="Delivered">Delivered</SelectItem>
												<SelectItem value="Cancelled">Cancelled</SelectItem>
											</SelectContent>
										</Select>
									</TableCell>
									<TableCell>
										<Button
											onClick={() =>
												handleStatusChange(
													order,
													order._id,
													order.providerId,
													order.status,
													order.scheduledDelivery
												)
											}
											className="bg-primary text-white hover:bg-rose-600"
										>
											Update Status
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</SavorlyContainer>
	);
};

export default CreateOrderResponse;
