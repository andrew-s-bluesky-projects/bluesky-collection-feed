import did from "../../../../did.mjs"
import escape from "escape-string-regexp"
import { AtpAgent } from "@atproto/api"

export async function GET({ nextUrl: { searchParams } }) {
	const cursor = searchParams.get("cursor")
	const limit = searchParams.get("limit")

	const agent = new AtpAgent({ service: "https://bsky.social" })

	await agent.login({
		identifier: process.env.BSKY_HANDLE,
		password: process.env.BSKY_PASSWORD
	})

	const {
		data: { feed, cursor: newCursor }
	} = (
		await agent.getAuthorFeed({
			actor: "bsky.app",
			cursor: cursor ?? "",
			limit: limit ?? 30
		})
	).data

	return Response.json({
		cursor: newCursor,
		feed: (
			await Promise.all(
				feed.map(async ({ post: { uri } }) => {
					const candidate = { post: uri }

					const qualifyingReplies = (
						await agent.getPostThread({ uri })
					).data.thread.replies.filter(
						({
							post: {
								author: { handle },
								record: { text }
							}
						}) => text == "yes" // handle == process.env.BSKY_HANDLE
					)

					if (qualifyingReplies) return candidate
					else return null
				})
			)
		).filter(post => post !== null)
	})
}
