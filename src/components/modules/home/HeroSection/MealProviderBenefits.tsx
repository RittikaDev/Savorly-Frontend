import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Settings, Users, TrendingUp } from "lucide-react";

export default function MealProviderBenefits() {
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<Card className="shadow-lg border border-gray-200">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Why Join Savorly as a Meal Provider?
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-gray-700">
						Savorly empowers meal providers with the tools to efficiently manage
						menus, handle customer orders, and grow their business effortlessly.
					</p>
				</CardContent>
			</Card>

			<div className="grid md:grid-cols-2 gap-6">
				<Card className="shadow-md border border-gray-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl font-semibold">
							<Utensils className="text-blue-500" /> Easy Menu Management
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="list-disc pl-5 text-gray-700 space-y-2">
							<li>Add, update, or remove meals in real-time.</li>
							<li>Showcase meal images, descriptions, and pricing.</li>
							<li>Offer customizable meal options for customers.</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="shadow-md border border-gray-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl font-semibold">
							<Settings className="text-green-500" /> Order & Delivery
							Management
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="list-disc pl-5 text-gray-700 space-y-2">
							<li>Receive and process customer orders seamlessly.</li>
							<li>Track order status and manage deliveries.</li>
							<li>Ensure timely meal preparation and dispatch.</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="shadow-md border border-gray-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl font-semibold">
							<Users className="text-purple-500" /> Increased Customer Reach
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="list-disc pl-5 text-gray-700 space-y-2">
							<li>Gain access to a larger customer base.</li>
							<li>Enhance brand visibility and credibility.</li>
							<li>Leverage Savorly&apos;s marketing and promotions.</li>
						</ul>
					</CardContent>
				</Card>

				<Card className="shadow-md border border-gray-200">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-xl font-semibold">
							<TrendingUp className="text-red-500" /> Business Growth & Insights
						</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="list-disc pl-5 text-gray-700 space-y-2">
							<li>Get valuable insights on customer preferences and trends.</li>
							<li>Optimize pricing and offerings for maximum profitability.</li>
							<li>
								Utilize Savorly’s analytics tools to improve your business.
							</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
