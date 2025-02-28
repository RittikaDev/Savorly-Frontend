"use client";

import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: ReactNode }) {
	const storeRef = useRef<AppStore>(undefined);

	// STORE HAS TO BE INITIALIZED ONLY ONCE
	// BELOW WILL CHECK IF STORE IS ALREADY INITIALIED OR NOT
	if (!storeRef.current) storeRef.current = makeStore();

	return <Provider store={storeRef.current}>{children}</Provider>;
}
