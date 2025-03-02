export interface IUser {
	userId: string;
	name: string;
	email: string;
	providerId?: string;
	isActive?: boolean;
	role: "user" | "provider";
	iat?: number;
	exp?: number;
}
