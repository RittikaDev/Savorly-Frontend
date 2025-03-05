import LoginForm from "@/components/modules/auth/login/LoginForm";
import LoadingPage from "@/components/shared/Loader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Login",
	description: "Log in to Savorly to stay updated with healthy tasty meals.",
	openGraph: {
		url: "https://savorly-two.vercel.app/login",
		title: "Login",
		description: "Access your Savorly account to get latest meal updates.",
	},
};

const LoginPage = () => {
	return (
		<Suspense fallback={<LoadingPage />}>
			<div className="h-screen w-screen flex justify-center items-center">
				<LoginForm />
			</div>
		</Suspense>
	);
};

export default LoginPage;
