"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Brand from "@/assets/hero_section/Brand.png";

import Marco from "@/assets/marco.jpg";
import Elena from "@/assets/elena.jpg";
import David from "@/assets/david.jpg";

import Slider7 from "@/assets/hero_section/slider7.jpg";
import Slider10 from "@/assets/hero_section/slider10.jpg";
import Slider8 from "@/assets/hero_section/slider8.jpg";

const About = () => {
	return (
		<section className="relative min-h-screen bg-gray-50 flex flex-col items-center text-center px-6 py-20">
			{/* Brand Logo & Intro */}
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="mb-10 flex flex-col items-center"
			>
				<Image src={Brand} alt="Savorly Logo" width={100} height={100} />
				<div className="flex items-center justify-center my-6">
					<h2 className="text-5xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
						About Savorly
					</h2>
				</div>
				<p className="mt-3 text-gray-600 max-w-lg">
					Crafting flavors that tell a story. At Savorly, every meal is an
					experience, designed to tantalize your taste buds and bring people
					together.
				</p>
			</motion.div>

			{/* Our Story - Parallax Reveal */}
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut" }}
				className="max-w-4xl text-gray-700 text-lg my-12 px-6"
			>
				<div className="flex items-center justify-center my-6">
					<h2 className="text-3xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
						Our Story
					</h2>
				</div>
				<p className="leading-relaxed">
					From a small kitchen to an international culinary experience, Savorly
					has grown into a **hub of innovation, passion, and taste**. Every dish
					is a blend of tradition and modern artistry, carefully made to create
					unforgettable flavors.
				</p>
			</motion.div>

			{/* Image Gallery with Animations */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
				<motion.div
					initial={{ scale: 0.8, rotate: -10 }}
					whileInView={{ scale: 1, rotate: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="overflow-hidden rounded-xl shadow-xl"
				>
					<Image
						src={Slider7}
						alt="Delicious meal"
						className="w-full h-full object-cover"
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="overflow-hidden rounded-xl shadow-xl"
				>
					<Image
						src={Slider10}
						alt="Restaurant ambiance"
						className="w-full h-full object-cover"
					/>
				</motion.div>

				<motion.div
					initial={{ scale: 1.2, x: 50 }}
					whileInView={{ scale: 1, x: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="overflow-hidden rounded-xl shadow-xl"
				>
					<Image
						src={Slider8}
						alt="Chef crafting a dish"
						className="w-full h-full object-cover"
					/>
				</motion.div>
			</div>

			{/* Meet The Team - Floating Chefs */}
			<div className="my-16">
				<div className="flex items-center justify-center my-6">
					<h2 className="text-3xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
						Meet the Team
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
					{[Marco, Elena, David].map((chef, index) => (
						<motion.div
							key={index}
							initial={{ y: 20, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							className="overflow-hidden rounded-xl shadow-xl bg-white p-4"
						>
							<Image
								src={chef}
								alt={`Chef ${index + 1}`}
								className="rounded-lg w-full object-cover"
							/>
							<p className="mt-3 text-gray-700 font-semibold">
								{["Marco", "Elena", "David"][index]}
							</p>
						</motion.div>
					))}
				</div>
			</div>

			{/* Our Promise - Staggered Fade In */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="max-w-3xl text-gray-700 text-lg px-6 mb-12"
			>
				<div className="flex items-center justify-center my-6">
					<h2 className="text-3xl font-bold bg-gradient-to-r from-rose-300 to-primary text-transparent bg-clip-text">
						Our Promise
					</h2>
				</div>
				<p className="leading-relaxed">
					At Savorly, we don’t just cook—we create moments. Our commitment is to
					deliver **fresh, high-quality, and ethically sourced ingredients**
					while making sure every meal brings warmth and joy to your table.
				</p>
			</motion.div>

			{/* Fun Fact Card with Flip Animation */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="relative mt-12 bg-gradient-to-r from-rose-600 via-pink-700 to-primary text-white px-8 py-6 rounded-lg shadow-2xl max-w-2xl text-center"
			>
				<motion.div
					initial={{ scale: 0.95 }}
					animate={{ scale: [1, 1.03, 1] }}
					transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
					className="absolute top-[-18px] left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-900 px-5 py-2 rounded-full text-sm font-semibold shadow-lg"
				>
					🍽️ Did You Know?
				</motion.div>

				<h2 className="text-3xl font-semibold tracking-wide">
					A Taste of Innovation
				</h2>
				<p className="mt-4 text-lg leading-relaxed">
					Our expert chefs have meticulously crafted
					<span className="font-semibold text-rose-400">
						{" "}
						5,000+ signature dishes
					</span>
					, blending diverse flavors to create an unforgettable experience.
				</p>
			</motion.div>
		</section>
	);
};

export default About;
