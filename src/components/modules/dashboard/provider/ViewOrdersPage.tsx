"use client";
import { Badge } from "@/components/ui/badge";
import SavorlyContainer from "@/components/ui/core/SavorlyContainer";

import { format } from "date-fns";

import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getProviderSpecificOrders } from "@/services/Order";
import React, { useEffect, useState } from "react";

const ViewOrdersPage = () => {
	const [orderList, setOrderList] = useState<
		{
			customerId: any;
			transaction: any;
			scheduledDelivery: string;
			_id: string;
			mealId: {
				cuisineType: string;
				dietaryPreferences: any;
				name: string;
				portionSize: string;
				price: number;
			};
			quantity: number;
			status: "Pending" | "In progress" | "Delivered" | "Cancelled";
		}[]
	>();

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

	const statusColors = {
		Pending: "bg-yellow-500",
		"In progress": "bg-yellow-700",
		Delivered: "bg-green-700",
		Cancelled: "bg-red-500",
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
							<TableCell className="font-medium">Cuisine</TableCell>
							<TableCell className="font-medium">Portion Size</TableCell>
							<TableCell className="font-medium">Total Price</TableCell>
							<TableCell className="font-medium">Customer Name</TableCell>
							<TableCell className="font-medium">Dietary Preference</TableCell>
							<TableCell className="font-medium">Status</TableCell>
							<TableCell className="font-medium">Payment Status</TableCell>
							<TableCell className="font-medium">Scheduled Delivery</TableCell>
						</TableRow>
					</TableHeader>

					<TableBody>
						{orderList &&
							orderList.map((order) => (
								<TableRow key={order._id}>
									<TableCell>{order._id}</TableCell>
									<TableCell>{order.mealId.name}</TableCell>
									<TableCell>{order.mealId.cuisineType}</TableCell>
									<TableCell>{order.mealId.portionSize}</TableCell>
									<TableCell>
										BDT {order.mealId.price * order.quantity}
									</TableCell>
									<TableCell>{order.customerId.name}</TableCell>
									<TableCell>
										{order.mealId.dietaryPreferences.map(
											(preference: string, index: number) => (
												<Badge key={index} variant="outline">
													{preference}
												</Badge>
											)
										)}
									</TableCell>
									<TableCell>
										<Badge
											className={`${
												statusColors[order.status]
											} text-white px-2 py-1 rounded-md`}
										>
											{order.status}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											className={`px-2 py-1 rounded-md ${
												order.transaction.sp_message === "Success"
													? "bg-green-500"
													: "bg-red-500"
											}`}
										>
											{order.transaction.sp_message}
										</Badge>
									</TableCell>
									<TableCell>
										{format(new Date(order.scheduledDelivery), "yyyy-MM-dd")}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</SavorlyContainer>
	);
};

export default ViewOrdersPage;
