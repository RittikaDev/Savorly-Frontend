import NextAuth, { Session, User } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { registerUser } from "@/services/AuthService";
import { JWT } from "next-auth/jwt";

interface UserWithRole extends User {
	role: string;
	access_token: string;
}

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_SECRET as string,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const user = await fetch(`${process.env.SERVER_URL}/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(credentials),
				}).then((res) => res.json());

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;
					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],

	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === "google" || account?.provider === "github") {
				try {
					// console.log("with social", user);
					await registerUser({
						email: user.email,
						name: user.name,
						provider: account.provider,
					});
				} catch (error) {
					console.error("Error registering user:", error);
					return false;
				}
			}
			return true;
		},

		// Optional: Customize session data
		// async session({ session, user }) {
		// 	session.user = user;
		// 	return session;
		// },

		async jwt({ token, user }: { token: JWT; user: User }) {
			if (user) {
				const typedUser = user as UserWithRole;
				token.role = typedUser.role;
				token.accessToken = typedUser.access_token;
			}

			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			if (session.user) {
				const typesSession = session.user as UserWithRole;
				typesSession.role = token.role as string;
			}

			return session;
		},
	},

	pages: {
		signIn: "/login",
		signOut: "/auth/signout",
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
