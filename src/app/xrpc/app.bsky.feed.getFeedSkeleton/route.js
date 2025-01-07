import did from "../../../../did.mjs"
import escape from "escape-string-regexp"
import { AtpAgent } from "@atproto/api"

export async function GET({ nextUrl: { searchParams } }) {
	const cursor = searchParams.get("cursor")

	const agent = new AtpAgent({ service: "https://bsky.social" })

	await agent.login({
		identifier: process.env.BSKY_HANDLE,
		password: process.env.BSKY_PASSWORD
	})

	return Response.json(
		(
			await agent.getAuthorFeed({
				actor: "bsky.app",
				cursor
			})
		).data
	)
}
