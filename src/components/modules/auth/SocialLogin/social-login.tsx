"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Github } from "lucide-react";

const SocialLogin = () => {
	return (
		<div className="mb-4">
			<p className="text-center mb-2">or</p>
			<div className="flex justify-center space-x-2">
				<Button
					onClick={() => {
						signIn("google", {
							callbackUrl: "/",
						});
					}}
				>
					<Image
						src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
						width={24}
						height={24}
						alt="Google logo"
					/>
				</Button>
				<Button
					onClick={() => {
						signIn("github", {
							callbackUrl: "/",
						});
					}}
				>
					<Github size={24} />
				</Button>
			</div>
		</div>
	);
};

export default SocialLogin;
