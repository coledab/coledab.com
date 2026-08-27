repo: coledab/coledab.com
branch: main
path: build

## Last sync
date: 2026-08-27T04:18:14Z

### Updated in this project
- Verified the repo's `build/index.html` matches the project root: `autopause=0`, imperative hero mount, bounded play nudges, tap-to-play overlay.
- Hero reel stays on Vimeo; the self-hosted mp4 experiment was reverted.
- Live site was serving an older build despite a current repo — diagnosed as CDN/asset cache, not the deploy path.

## Screen map
| Project screen | Repo files |
|---|---|
| Home / work grid / artists | build/index.html |
| About | build/about.html |
| Contact | build/contact.html |
| Filmed-in map iframe | build/filmed-in-map.html |
| Runtime + config | build/support.js, build/image-slot.js, build/wrangler.toml |
| Images | build/assets/** |

## Sync history
- 2026-08-25T02:06:10Z — confirmed `build/` copy carried latest index.html; flagged files sitting under `build/` rather than repo root, and `uploads/` screenshots committed in error.
