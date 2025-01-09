This is a rudimentary [BlueSky feed generator](https://docs.bsky.app/docs/starter-templates/custom-feeds) to make Tumblr-style tag collections.

This isn't a fork of [bluesky-social/feed-generator](https://github.com/bluesky-social/feed-generator); this is written from scratch using [Next.js](https://nextjs.org/)! (None of that React nonsense, though.)

# getting started

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fandrew-s-bluesky-projects%2Fbluesky-collection-feed%2F&env=BSKY_HANDLE,BSKY_PASSWORD,COLLECTION_TAG,COLLECT_NSFW,FEED_NAME,FEED_DESCRIPTION,RECORD_KEY&envDescription=Feed%20configuration.&envLink=https%3A%2F%2Fgithub.com%2Fsolanto%2Fnext-atproto-feed%23readme)

1. [Deploy](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fandrew-s-bluesky-projects%2Fbluesky-collection-feed%2F&env=BSKY_HANDLE,BSKY_PASSWORD,COLLECTION_TAG,COLLECT_NSFW,FEED_NAME,FEED_DESCRIPTION,RECORD_KEY&envDescription=Feed%20configuration.&envLink=https%3A%2F%2Fgithub.com%2Fsolanto%2Fnext-atproto-feed%23readme) a fork of this project to Vercel.
2. When prompted, complete configuration:
   - `BSKY_HANDLE`: your full handle (ex: "abc.bsky.social")
   - `BSKY_PASSWORD`: an [app password](https://bsky.app/settings/app-passwords) to your account
   - `COLLECTION_TAG`: text that gets any post into the collection (ex: something hashtag-like like "!#hi" or a trigger emoji like "📌")
   - `COLLECT_NSFW`: `true` or `false` as to whether NFSW-labeled content automatically goes into the collection
   - `FEED_NAME`: a name for your collection feed
   - `FEED_DESCRIPTION`: a description for your collection feed
   - `RECORD_KEY`: an arbitrary internal identifier, which must be unique among your feeds (ex: `feed-1`)
