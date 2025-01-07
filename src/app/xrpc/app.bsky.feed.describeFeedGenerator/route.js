import did from "../../../../did.mjs"

export function GET() {
	return Response.json([
		{
			did,
			feeds: [{ uri: `at://${did}/app.bsky.feed.generator/default` }]
		}
	])
}
