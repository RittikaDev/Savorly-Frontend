export const itemVariants = {
	hidden: { opacity: 0, x: -50 },
	visible: (index: number) => ({
		opacity: 1,
		x: 0,
		transition: {
			delay: index * 0.3,
			duration: 0.6,
			ease: "easeOut",
		},
	}),
};
