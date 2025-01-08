import { AtpAgent } from "@atproto/api"
import yn from "yn"

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
	} = await agent.getAuthorFeed({
		actor: process.env.BSKY_HANDLE,
		cursor: cursor ?? "",
		limit: limit ?? 30
	})

	return Response.json({
		cursor: newCursor,
		feed: (
			await Promise.all(
				feed.map(async ({ post }) => {
					const { uri } = post
					const labelValues = post.labels.map(({ val }) => val)

					const candidate = { post: uri }

					if (
						// has tag
						post.record.text
							.toLowerCase()
							.includes(process.env.COLLECTION_TAG) ||
						// or
						// is labeled (if enabled)
						(yn(process.env.COLLECT_NSFW) &&
							(labelValues.includes("porn") ||
								labelValues.includes("sexual") ||
								labelValues.includes("nudity"))) ||
						// or
						// has self-replies with tag
						(await agent.getPostThread({ uri })).data.thread.replies
							.filter(post => "post" in post)
							.filter(
								({
									post: {
										author: { handle },
										record: { text }
									}
								}) =>
									handle == process.env.BSKY_HANDLE &&
									text
										.toLowerCase()
										.includes(process.env.COLLECTION_TAG)
							).length != 0
					)
						return candidate
					else return null
				})
			)
		).filter(post => post !== null)
	})
}
