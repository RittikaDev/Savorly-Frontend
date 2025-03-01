"use client";

import React from "react";

import { motion } from "motion/react";

const SiteTitle = () => {
	return (
		<div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-rose-300 text-9xl font-extrabold opacity-20 tracking-wide select-none">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, delay: 1 }}
			>
				SAVORLY
			</motion.div>
		</div>
	);
};

export default SiteTitle;
