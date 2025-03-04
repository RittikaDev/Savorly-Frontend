"use client";
import { useUser } from "@/context/UserContext";
import React from "react";
import CustomerBenefits from "./CustomerBenefits";
import PlatformOverview from "./MealProviderBenefits";

const RoleWiseView = () => {
	const { user } = useUser();

	return (
		<>
			{user?.role == "user" ? (
				<>
					<CustomerBenefits />
				</>
			) : (
				<PlatformOverview />
			)}
		</>
	);
};

export default RoleWiseView;
