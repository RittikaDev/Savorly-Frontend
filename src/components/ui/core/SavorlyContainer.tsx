import React, { ReactNode } from "react";

interface SavorlyContainerProps {
	children: ReactNode;
	className?: string;
}

const SavorlyContainer = ({
	children,
	className = "",
}: SavorlyContainerProps) => {
	return (
		<div className={`container mx-auto px-5 ${className}`}>{children}</div>
	);
};

export default SavorlyContainer;
