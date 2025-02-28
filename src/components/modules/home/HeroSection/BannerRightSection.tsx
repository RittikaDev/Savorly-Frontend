"use client";
import React from "react";

import { motion } from "motion/react";
import Image from "next/image";

import Banner from "@/assets/hero_section/banner.jpg";
import { Separator } from "@/components/ui/separator";

const BannerRightSection = () => {
	return (
		<motion.div
			initial={{ opacity: 0, x: 100 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 1, delay: 0.8 }}
			className="w-1/2 relative"
		>
			<Image
				src={Banner}
				alt="Fashion Model"
				layout="fill"
				objectFit="cover"
				className="absolute inset-0"
			/>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 1 }}
				className="absolute bottom-10 text-white bg-black bg-opacity-50 p-6 rounded-sm"
			>
				<h2 className="text-3xl font-light">
					Wearing confidence, the{" "}
					<span className="font-bold text-red-300">Elite </span> way
				</h2>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 1.2 }}
				className="absolute bottom-10 right-10 flex flex-col items-center"
			>
				<Separator
					orientation="vertical"
					className="h-96 border-l-2 border-white mb-2"
				/>
				<button className="bg-white p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
					↓
				</button>
			</motion.div>
		</motion.div>
	);
};

export default BannerRightSection;
