import { AtpAgent, BlobRef } from "@atproto/api"
import did from "./DID.mjs"

async function run() {
	const agent = new AtpAgent({ service: "https://bsky.social" })

	await agent.login({
		identifier: process.env.BSKY_HANDLE,
		password: process.env.BSKY_PASSWORD
	})

	await agent.com.atproto.repo.putRecord({
		repo: agent.session?.did ?? "",
		collection: "app.bsky.feed.generator",
		rkey: "next-test",
		record: {
			did,
			displayName: "next test",
			description: "test description",
			// avatar: avatarRef,
			createdAt: new Date().toISOString()
		}
	})
}

run()
