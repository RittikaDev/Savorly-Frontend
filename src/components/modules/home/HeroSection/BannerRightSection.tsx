"use client";
import React from "react";

import { motion } from "motion/react";
import Image from "next/image";

import Banner from "@/assets/hero_section/banner.png";
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
				layout=""
				objectFit=""
				className="absolute inset-0"
			/>

			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 1.2 }}
				className="absolute bottom-28 right-10 flex flex-col items-center"
			>
				<Separator
					orientation="vertical"
					className="h-96 border-l-2 border-primary mb-2"
				/>
				<button className="bg-primary text-white p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
					↓
				</button>
			</motion.div>
		</motion.div>
	);
};

export default BannerRightSection;
