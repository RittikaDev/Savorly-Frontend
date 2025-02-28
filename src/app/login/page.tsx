import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description:
		"Log in to Elite Wear to stay updated with the latest fashion insights.",
	openGraph: {
		url: "http://localhost:3000/login",
		title: "Login",
		description:
			"Access your Elite Wear account to get latest fashion updates.",
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
