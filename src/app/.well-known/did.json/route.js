import did from "@/../DID.mjs"

export const dynamic = "force-static"

export const GET = async () =>
	Response.json({
		"@context": ["https://www.w3.org/ns/did/v1"],
		id: did,
		service: [
			{
				id: "#bsky_fg",
				type: "BskyFeedGenerator",
				serviceEndpoint: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			}
		]
	})
