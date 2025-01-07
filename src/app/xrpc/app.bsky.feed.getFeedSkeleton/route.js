import did from "../../../../did.mjs"
import escape from "escape-string-regexp"
import { AtpAgent } from "@atproto/api"

export async function GET({ nextUrl: { searchParams } }) {
	const feedMatch = searchParams
		.get("feed")
		.match(
			new RegExp(
				`^(?:${escape(`at://${did}/app.bsky.feed.generator/`)})(.*)$`
			)
		)

	if (feedMatch !== null) {
		const feed = feedMatch[1]
		const cursor = searchParams.get("cursor")

		const agent = new AtpAgent({ service: "https://bsky.social" })

		await agent.login({
			identifier: process.env.BSKY_HANDLE,
			password: process.env.BSKY_PASSWORD
		})

		if (true)
			return Response.json(
				(
					await agent.getAuthorFeed({
						actor: "bsky.app",
						cursor
					})
				).data
			)
	}

	return new Response(null, {
		status: 400,
		statusText: "this feed doesn't exist"
	})
}
