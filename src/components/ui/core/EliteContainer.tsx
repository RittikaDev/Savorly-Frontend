import React, { ReactNode } from "react";

interface EliteContainerProps {
	children: ReactNode;
	className?: string;
}

const EliteContainer = ({ children, className = "" }: EliteContainerProps) => {
	return (
		<div className={`container mx-auto px-5 ${className}`}>{children}</div>
	);
};

export default EliteContainer;
