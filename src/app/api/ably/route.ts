import { getServerSession } from "@/lib/auth";
import Ably from "ably";
import { NextResponse } from "next/server";

// ensure Vercel doesn't cache the result of this route,
// as otherwise the token request data will eventually become outdated
// and we won't be able to authenticate on the client side
export const revalidate = 0;

export async function GET() {
	const session = await getServerSession();
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	if (!process.env.ABLY_API_KEY) {
		return NextResponse.json(
			{ error: "Ably API key not configured" },
			{ status: 500 },
		);
	}

	try {
		const client = new Ably.Rest(process.env.ABLY_API_KEY);
		const tokenRequestData = await client.auth.createTokenRequest({
			clientId: session.user.id,
		});

		return NextResponse.json(tokenRequestData);
	} catch {
		return NextResponse.json(
			{ error: "Failed to create token request" },
			{ status: 500 },
		);
	}
}
