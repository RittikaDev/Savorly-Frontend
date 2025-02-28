"use client";
import React from "react";

import Image from "next/image";

import Slider1 from "@/assets/hero_section/slider1.jpg";
import Slider2 from "@/assets/hero_section/slider2.jpg";
import Slider3 from "@/assets/hero_section/slider3.jpg";
import Slider4 from "@/assets/hero_section/slider4.jpg";
import Slider5 from "@/assets/hero_section/slider5.jpg";
import Slider6 from "@/assets/hero_section/slider6.jpg";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import { motion } from "motion/react";
import { itemVariants } from "@/lib/animation";

const ImageSliders = () => {
	const images = [Slider1, Slider2, Slider3, Slider4, Slider5, Slider6];

	return (
		<div className="absolute bottom-32 -left-10 w-full">
			<Carousel className="w-full max-w-lg">
				<CarouselContent className="-ml-1 flex">
					{images.map((image, index) => (
						<CarouselItem
							key={index}
							className="pl-1 md:basis-1/2 lg:basis-1/4 flex justify-center"
						>
							<motion.div
								key={index}
								variants={itemVariants}
								initial="hidden"
								animate="visible"
								custom={index}
							>
								<Image
									src={image}
									alt="Fashion Model"
									width={150}
									height={200}
									className="rounded-md object-cover h-[200px] w-auto"
								/>
							</motion.div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default ImageSliders;
