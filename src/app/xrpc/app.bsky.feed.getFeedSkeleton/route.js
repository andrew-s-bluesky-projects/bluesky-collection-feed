import did from "../../../../did.mjs"
import escape from "escape-string-regexp"
import { AtpAgent } from "@atproto/api"

export async function GET({ nextUrl: { searchParams } }) {
	const cursor = searchParams.get("cursor")
	console.log("request cursor: " + cursor)
	const limit = searchParams.get("limit")

	const agent = new AtpAgent({ service: "https://bsky.social" })

	await agent.login({
		identifier: process.env.BSKY_HANDLE,
		password: process.env.BSKY_PASSWORD
	})

	const { feed, cursor: newCursor } = (
		await agent.getAuthorFeed({
			actor: "bsky.app",
			cursor: cursor ?? "",
			limit: limit ?? 30
		})
	).data

	console.log("received feed:", feed)
	console.log("received new cursor:", newCursor)

	return Response.json({
		feed: feed.map(({ post: { uri } }) => ({ post: uri })),
		newCursor
	})
}
