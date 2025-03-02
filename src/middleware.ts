import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

// const roleBasedPrivateRoutes = {
// 	user: [/^\/user/, /^\/create-shop/], // USER WILL BE ABLE TO ACESS ROUTES THAT STARTS WITH user
// 	admin: [/^\/admin/], // ADMIN WILL BE ABLE TO ACESS ROUTES THAT STARTS WITH admin
// };
const roleBasedPrivateRoutes = {
	user: [
		/^\/dashboard\/customer/,
		/^\/profile\/customer/,
		/^\/find-meals/,
		/^\/order-meal/,
		/^\/track-orders/,
		/^\/manage-preferences/,
	],
	provider: [
		/^\/dashboard\/provider/,
		/^\/profile\/provider/,
		/^\/post-meal-menu/,
		/^\/responses/,
		/^\/view-orders/,
	],
};

// RUNS ON SERVER
export const middleware = async (request: NextRequest) => {
	const { pathname } = request.nextUrl;

	const userInfo = await getCurrentUser();

	if (!userInfo) {
		if (authRoutes.includes(pathname)) {
			return NextResponse.next(); // IF NOT USER EXITS, ALLOW TO GOTO AUTH ROUTES THAT IS "/login", "/register"
		} else {
			return NextResponse.redirect(
				new URL(
					`http://localhost:3000/login?redirectPath=${pathname}`, // REDIRECT PATH WILL REDIRECT TO THE ROUTE WHERE USER ORIGINALLY WANTED TO GO RIGHT AFTER AUTHENTICATION IS DONE
					request.url
				)
			);
		}
	}

	// CHECK IF THERE'S ROLE WHEN LOGGING IN, ALSO CHECK IF roleBasedPrivateRoutes HAS THAT ROLE, LIKE NOW, ANY ROLE OTHER THAN USER AND ADMIN IS NOT PERMISSIBLE
	if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
		const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
		if (routes.some((route) => pathname.match(route))) {
			return NextResponse.next();
		}
	}

	return NextResponse.redirect(new URL("/", request.url));
};

// MIDDLEWARE WILL ONLY GET CALLED FOR BELOW ROUTES (AUTOMATIC, NOWHERE NEEDS TO BE IMPORTED)
export const config = {
	matcher: [
		// "/login",
		// "/create-shop",
		// "/admin",
		// "/admin/:page",
		// "/user",
		// "/user/:page",
		"/login",
		"/register",
		"/dashboard/customer",
		"/dashboard/provider",
		"/profile/customer",
		"/profile/provider",
		"/find-meals",
		"/order-meal",
		"/track-orders",
		"/manage-preferences",
		"/post-meal-menu",
		"/responses",
		"/view-orders",
	],
};
