"use client";

import UserProvider from "@/context/UserContext";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<UserProvider>
			{/* THIS CHILDREN WILL BE RENDERED INSIDE  StoreProvider*/}
			<StoreProvider>{children}</StoreProvider>
		</UserProvider>
	);
};

export default Providers;
