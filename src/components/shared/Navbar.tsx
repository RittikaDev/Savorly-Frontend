"use client";

import Brand from "@/app/assets/svgs/Brand.png";
import { Button } from "../ui/button";
import { LogOut, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { protectedRoutes } from "@/contants";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
	const { user, setIsLoading } = useUser();
	const pathname = usePathname();
	const router = useRouter();

	const dashboardPathStart = user?.role == "user" ? "customer" : "provider";

	// console.log(user);

	const handleLogOut = () => {
		logout();
		router.push("/login");
		setIsLoading(true);
		if (protectedRoutes.some((route) => pathname.match(route)))
			// CHECK IF PATHNAME MATCHES WITH ANY PROTECTED ROUTES
			router.push("/");
	};

	return (
		<header className="border-b w-full">
			<div className="container flex justify-between items-center mx-auto h-16 px-3">
				<Link href="/">
					<h1 className="text-2xl font-black flex items-center gap-1">
						{/* <Logo /> */}
						<Image src={Brand} alt="Logo" width={60} height={60} />
						Savorly
					</h1>
				</Link>

				<nav className="flex gap-2">
					{user?.role == "user" ? (
						<>
							<Link href="/find-meals">
								<Button variant="outline">Find Meals</Button>
							</Link>
							<Link href="/cart">
								<Button variant="outline" className="rounded-full p-0 size-10">
									<ShoppingBag />
								</Button>
							</Link>
						</>
					) : (
						<></>
					)}
					{user?.role == "provider" ? (
						<>
							<Link href="/post-meal-menu">
								<Button variant="outline" className="">
									Post Meal
								</Button>
							</Link>
							<Link href="/responses">
								<Button variant="outline" className="">
									Order Responses
								</Button>
							</Link>
						</>
					) : (
						<></>
					)}

					{user?.email ? (
						<>
							<Link href="/create-shop">
								<Button className="rounded-full">Create Shop</Button>
							</Link>

							<DropdownMenu>
								<DropdownMenuTrigger>
									<Avatar>
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>User</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>My Account</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link href={`/profile/${dashboardPathStart}`}>Profile</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href={`/dashboard/${dashboardPathStart}`}>
											Dashboard
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>My Shop</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className="bg-red-500 cursor-pointer"
										onClick={handleLogOut}
									>
										<LogOut />
										<span>Log Out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					) : (
						<Link href="/login">
							<Button className="rounded-full" variant="outline">
								Login
							</Button>
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
}
