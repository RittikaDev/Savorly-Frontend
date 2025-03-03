"use client";

import * as React from "react";
import { Bot, Briefcase, SquareTerminal } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
// import Logo from "@/app/assets/svgs/Logo";
import Brand from "@/app/assets/svgs/Brand.png";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

// const data = {
const menuItems = {
	user: [
		{
			title: "Dashboard",
			url: "/dashboard/customer",
			icon: SquareTerminal,
			isActive: true,
		},
		{
			title: "Select Meals",
			url: "/dashboard/customer/select-meals",
			icon: Bot,
		},
		{
			title: "Track Order",
			url: "/dashboard/customer/track-order",
			icon: Bot,
		},
		{
			title: "Manage Preference",
			url: "/dashboard/customer/manage-preferences",
			icon: Bot,
		},

		// {
		//   title: "Settings",
		//   url: "#",
		//   icon: Settings,
		//   items: [
		//     {
		//       title: "Profile",
		//       url: "/profile",
		//     },
		//   ],
		// },
	],
	provider: [
		{ title: "Dashboard", url: "/dashboard/provider", icon: SquareTerminal },
		{
			title: "Manage Menus",
			url: "/dashboard/provider/manage-menus",
			icon: Briefcase,
		},
		{
			title: "View Orders",
			url: "/dashboard/provider/view-orders",
			icon: Bot,
		},
		{
			title: "Respond To Orders",
			url: "/dashboard/provider/respond-orders",
			icon: Bot,
		},
	],
};
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUser();

	const navItems = user?.role ? menuItems[user.role] : [];
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<div className="flex items-center justify-center">
									<Image src={Brand} alt="Logo" width={60} height={60} />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<h2 className="font-bold text-xl">EliteWear</h2>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{/* <NavMain items={data.navMain} /> */}
				<NavMain items={navItems} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
