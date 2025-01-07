import did from "../../did.mjs"

export const metadata = {
	title: did,
	description: "a bluesky feed"
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
