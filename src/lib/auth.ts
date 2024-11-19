import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession as originalGetServerSession } from "next-auth";
import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LineProvider from "next-auth/providers/line";
import { redirect } from "next/navigation";
import { cache } from "react";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
		LineProvider({
			clientId: process.env.LINE_CLIENT_ID || "",
			clientSecret: process.env.LINE_CLIENT_SECRET || "",
			httpOptions: {
				timeout: 50000,
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				return token;
			}

			const dbUser = await prisma.user.findUnique({
				where: {
					id: token.id as string,
				},
			});

			if (!dbUser) {
				return token;
			}

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
			};
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}
			return session;
		},
	},
};

export const getServerSession = cache(async () => {
	return originalGetServerSession(authOptions);
});

export const getApplicantUserId = cache(async () => {
	const session = await getServerSession();
	if (!session) {
		return null;
	}
	const applicant = await prisma.applicant.findFirst({
		where: { userId: session.user.id },
		include: { user: true },
	});
	return applicant?.user.id;
});

export const getEmployeeUserId = cache(async () => {
	const session = await getServerSession();
	if (!session) {
		return null;
	}
	const employee = await prisma.employee.findFirst({
		where: { userId: session.user.id },
		include: { user: true },
	});
	return employee?.user.id;
});

// ユーザーがログインしているかつ、ユーザーが存在するかつ、ユーザーがバンされていないかをチェックする
export const handleUserView = async <T>({
	isApplicantPage,
}: { isApplicantPage: boolean }): Promise<{
	user: Session["user"];
}> => {
	const session = await getServerSession();
	if (!session) {
		redirect("/");
	}
	if (isApplicantPage) {
		const applicant = await prisma.applicant.findUnique({
			where: { userId: session.user.id },
			include: { user: true },
		});
		if (!applicant) {
			redirect("/applicant/create_profile");
		} else if (applicant.user.isBaned) {
			redirect("/applicant/sorry");
		}
	}
	if (!isApplicantPage) {
		const employee = await prisma.employee.findUnique({
			where: { userId: session.user.id },
			include: { user: true },
		});
		if (!employee) {
			redirect("/employee/create_profile");
		} else if (employee.user.isBaned) {
			redirect("/employee/sorry");
		}
	}
	return { user: session.user };
};
