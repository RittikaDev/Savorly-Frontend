"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { verifyOrder } from "@/services/cart";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface OrderData {
	id: number;
	order_id: string;
	currency: string;
	amount: number;
	payable_amount: number;
	discsount_amount: number | null;
	disc_percent: number;
	received_amount: string;
	usd_amt: number;
	usd_rate: number;
	is_verify: number;
	card_holder_name: string | null;
	card_number: string | null;
	phone_no: string;
	bank_trx_id: string;
	invoice_no: string;
	bank_status: string;
	customer_order_id: string;
	sp_code: string;
	sp_message: string;
	name: string;
	email: string;
	address: string;
	city: string;
	value1: string | null;
	value2: string | null;
	value3: string | null;
	value4: string | null;
	transaction_status: string | null;
	method: string;
	date_time: string;
}

const VerifyOrder = () => {
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const [orderData, setOrderData] = useState<OrderData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			console.log(searchParams, searchParams.get("order_id"));
			const result = await verifyOrder(searchParams.get("order_id")!);
			console.log(result);
			setOrderData(result.data?.[0]);
			setIsLoading(false);
		};
		fetchData();
	}, [searchParams]);

	return isLoading ? (
		// <LoadingPage />
		<p>Loading ...</p>
	) : (
		<div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-colors duration-300">
			<div className="text-center space-y-2 mb-12">
				{/* Subheader */}
				{/* <Subheader className="text-center" heading="Order Verification" /> */}
			</div>
			<div className="grid px-20 gap-6 md:grid-cols-2 lg:grid-cols-2">
				{/* Order Details Card */}
				<Card className="shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900">
					<CardHeader className="bg-gray-100 dark:bg-gray-700">
						<CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
							Order Details
						</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="grid grid-cols-2 gap-3">
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Order ID:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.order_id}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Amount:
							</dt>
							<dd className="dark:text-gray-200">
								{orderData?.currency} {orderData?.amount?.toFixed(2)}
							</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Status:
							</dt>
							<dd>
								<Badge
									variant={
										orderData?.bank_status === "Success"
											? "default"
											: "destructive"
									}
								>
									{orderData?.bank_status}
								</Badge>
							</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Date:
							</dt>
							<dd className="dark:text-gray-200">
								{orderData?.date_time
									? new Date(orderData.date_time).toLocaleString()
									: "N/A"}
							</dd>
						</dl>
					</CardContent>
				</Card>

				{/* Payment Information Card */}
				<Card className="shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900">
					<CardHeader className="bg-gray-100 dark:bg-gray-700">
						<CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
							Payment Information
						</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="grid grid-cols-2 gap-3">
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Method:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.method}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Transaction ID:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.bank_trx_id}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Invoice No:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.invoice_no}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								SP Code:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.sp_code}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								SP Message:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.sp_message}</dd>
						</dl>
					</CardContent>
				</Card>

				{/* Customer Information Card */}
				<Card className="shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900">
					<CardHeader className="bg-gray-100 dark:bg-gray-700">
						<CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
							Customer Information
						</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="grid grid-cols-2 gap-3">
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Name:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.name}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Email:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.email}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Phone:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.phone_no}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								Address:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.address}</dd>
							<dt className="font-semibold text-gray-700 dark:text-gray-300">
								City:
							</dt>
							<dd className="dark:text-gray-200">{orderData?.city}</dd>
						</dl>
					</CardContent>
				</Card>

				{/* Verification Status Card */}
				<Card className="shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-900">
					<CardHeader className="bg-gray-100 dark:bg-gray-700">
						<CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
							Verification Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-2">
							{orderData?.is_verify === 1 ? (
								<>
									<CheckCircle className="text-green-500 dark:text-green-400" />
									<span className="text-green-500 dark:text-green-400 font-semibold">
										Verified
									</span>
								</>
							) : (
								<>
									<AlertCircle className="text-yellow-500 dark:text-yellow-400 mt-4" />
									<span className="text-yellow-500 dark:text-yellow-400 font-semibold mt-4">
										Not Verified
									</span>
								</>
							)}
						</div>
					</CardContent>
					<CardFooter>
						<Link href="/cart">
							<Button className="w-full bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
								View Orders
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default VerifyOrder;
