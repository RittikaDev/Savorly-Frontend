import LoadingPage from "@/components/shared/Loader";
import React, { Suspense } from "react";
import VerifyOrder from "./VerifyPayment";

const VerifyPaymentPage = () => {
	return (
		<Suspense fallback={<LoadingPage />}>
			<VerifyOrder />
		</Suspense>
	);
};

export default VerifyPaymentPage;
