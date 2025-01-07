import Image from "next/image"

export default function Home() {
	return (
		<div>
			<main>
				<h1>
					this server hosts a{" "}
					<a
						href="https://docs.bsky.app/docs/starter-templates/custom-feeds"
						target="_blank"
						rel="noopener noreferrer"
					>
						bluesky feed
					</a>
					!
				</h1>
				<p>
					<a
						href={`https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						source
					</a>
				</p>
			</main>
		</div>
	)
}
