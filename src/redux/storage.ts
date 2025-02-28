import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// NOOP => NO OPERATION STORAGE, SERVER COMPONENTS DOES NOT HAVE ANY ACCESS TO LOCALSTORAGE,
//  DOES THREE THINGS, GET, SET, REMOVE
const createNoopStorage = () => {
	return {
		getItem() {
			return Promise.resolve();
		},
		setItem(_key: string, value: string) {
			return Promise.resolve(value);
		},
		removeItem() {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== "undefined" // RUNNING ON SERVER
		? createWebStorage("local")
		: createNoopStorage();

export default storage;
