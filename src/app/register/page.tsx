import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import LoadingPage from "@/components/shared/Loader";
import { Suspense } from "react";

const RegisterPage = () => {
	return (
		<Suspense fallback={<LoadingPage />}>
			<div className="h-screen w-screen flex justify-center items-center">
				<RegisterForm />
			</div>
		</Suspense>
	);
};

export default RegisterPage;
