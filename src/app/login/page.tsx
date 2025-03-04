import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Log in to Savorly to stay updated with healthy tasty meals.",
	openGraph: {
		url: "http://localhost:3000/login",
		title: "Login",
		description: "Access your Savorly account to get latest meal updates.",
	},
};

const LoginPage = () => {
	return (
		<div className="h-screen w-screen flex justify-center items-center">
			<LoginForm />
		</div>
	);
};

export default LoginPage;
