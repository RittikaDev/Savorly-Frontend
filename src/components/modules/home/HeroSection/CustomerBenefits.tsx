"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Utensils } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
	{
		icon: <Utensils className="h-8 w-8 text-primary" />,
		title: "Customizable Meals",
		description:
			"Tailor your meals to your taste, preferences, and dietary needs.",
	},
	{
		icon: <Clock className="h-8 w-8 text-primary" />,
		title: "Time-Saving Convenience",
		description:
			"Order in a few clicks and enjoy freshly prepared meals without hassle.",
	},
	{
		icon: <CheckCircle className="h-8 w-8 text-primary" />,
		title: "Quality Ingredients",
		description:
			"Enjoy high-quality, chef-curated meals made with fresh ingredients.",
	},
];

export default function CustomerBenefits() {
	return (
		<section className="py-12 bg-gray-100">
			<div className="container mx-auto text-center">
				<motion.h2
					className="text-3xl font-bold mb-6 text-gray-800"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Why Choose Savorly?
				</motion.h2>
				<div className="grid md:grid-cols-3 gap-6">
					{benefits.map((benefit, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
						>
							<Card className="p-6 shadow-md bg-white rounded-2xl">
								<CardContent className="flex flex-col items-center text-center">
									{benefit.icon}
									<h3 className="text-xl font-semibold mt-4">
										{benefit.title}
									</h3>
									<p className="text-gray-600 mt-2">{benefit.description}</p>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
