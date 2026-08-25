repo: coledab/coledab.com
branch: main
path: build

## Last sync
date: 2026-08-25T02:06:10Z

### Updated in this project
- Confirmed the repo's `build/` copy already carries the latest index.html (tier 1 locked to 3/4/3, local logos, `lang="en"`).
- No Brandfetch CDN references remain in the deployed source.
- Flagged that the site files sit under `build/`, not the repo root — the likely cause of the deploy not appearing.
- `uploads/` screenshots were committed to the repo and should be removed there.

## Screen map
| Project screen | Repo files |
|---|---|
| Home / work grid / artists | build/index.html |
| About | build/about.html |
| Contact | build/contact.html |
| Filmed-in map iframe | build/filmed-in-map.html |
| Runtime + config | build/support.js, build/image-slot.js, build/wrangler.toml |
| Images | build/assets/** |
