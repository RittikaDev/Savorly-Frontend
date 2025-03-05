"use client";

import { Button } from "@/components/ui/button";
import TablePagination from "@/components/ui/core/Pagination/TablePagination";
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
import { updateOrderStatusByProvider } from "@/services/Order";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateOrderResponse = ({ orderResponseList, meta }: any) => {
	const [orderList, setOrderList] = useState<any[]>();

	//   useEffect(() => {
	//     const fetchPreferences = async () => {
	//       try {
	//         const data = await getProviderSpecificOrders();
	//         setOrderList(data.data);
	//         console.log(data);
	//       } catch (error) {
	//         console.error("Error fetching meal preferences:", error);
	//       }
	//     };

	//     fetchPreferences();
	//   }, []);

	useEffect(() => {
		setOrderList(orderResponseList);
	}, [orderResponseList]);

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
				<h2 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-primary text-transparent bg-clip-text z-10 mb-6">
					Respond To Orders
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
							orderList.map((order) =>
								order.mealId?.map((meal: any) => (
									<TableRow key={order._id}>
										<TableCell>{order._id}</TableCell>
										<TableCell>{meal.name}</TableCell>
										<TableCell>{meal.portionSize}</TableCell>
										<TableCell>{meal.price * order.quantity}</TableCell>
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
													<SelectItem value="In progress">
														In progress
													</SelectItem>
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
								))
							)}
					</TableBody>
				</Table>
				<TablePagination totalPage={meta?.totalPages} />
			</div>
		</SavorlyContainer>
	);
};

export default CreateOrderResponse;
