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
// import { getProviderSpecificOrders } from "@/services/Order";
import React, { useEffect, useState } from "react";
import TablePagination from "@/components/ui/core/Pagination/TablePagination";

const ViewOrdersPage = ({ providerSpecificOrder, meta }: any) => {
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
			}[];
			quantity: number;
			status: "Pending" | "In progress" | "Delivered" | "Cancelled";
		}[]
	>();

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
		setOrderList(providerSpecificOrder);
	}, [providerSpecificOrder]);

	const statusColors = {
		Pending: "bg-yellow-500",
		"In progress": "bg-yellow-700",
		Delivered: "bg-green-700",
		Cancelled: "bg-red-500",
	};

	console.log(orderList);

	return (
		<SavorlyContainer>
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-primary text-transparent bg-clip-text z-10 mb-6">
					View Orders
				</h2>

				<Table>
					<TableHeader>
						<TableRow>
							<TableCell className="font-medium">Order ID</TableCell>
							<TableCell className="font-medium">Ordered Meal</TableCell>
							<TableCell className="font-medium">Cuisine</TableCell>
							<TableCell className="font-medium">Portion Size</TableCell>
							<TableCell className="font-medium">Total Price</TableCell>
							<TableCell className="font-medium">Dietary Preference</TableCell>
							<TableCell className="font-medium">Customer Name</TableCell>
							<TableCell className="font-medium">Status</TableCell>
							<TableCell className="font-medium">Payment Status</TableCell>
							<TableCell className="font-medium">Scheduled Delivery</TableCell>
						</TableRow>
					</TableHeader>

					<TableBody>
						{orderList &&
							orderList.map((order) =>
								// Loop through meals within the same row
								order.mealId?.map((meal: any) => (
									<TableRow key={meal._id}>
										{/* Render the data for each meal in separate columns */}
										<TableCell>{order._id}</TableCell>
										<TableCell>{meal?.name}</TableCell>
										<TableCell>{meal?.cuisineType}</TableCell>
										<TableCell>{meal?.portionSize}</TableCell>
										<TableCell>BDT {meal?.price * order.quantity}</TableCell>
										<TableCell>
											{meal?.dietaryPreferences?.map(
												(preference: string, index: number) => (
													<Badge key={index} variant="outline">
														{preference}
													</Badge>
												)
											)}
										</TableCell>
										{/* Other order details */}
										<TableCell>{order.customerId?.name}</TableCell>
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
								))
							)}
					</TableBody>
				</Table>
			</div>
			<TablePagination totalPage={meta?.totalPages} />
		</SavorlyContainer>
	);
};

export default ViewOrdersPage;
